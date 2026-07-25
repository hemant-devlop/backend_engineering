import mongoose from "mongoose";
import crypto from "crypto";
import { userRepository } from "../repositories/user.repository.js";
import { passwordService } from "../lib/password/password.service.js";
import { jwtService } from "../lib/jwt/jwt.service.js";
import { sessionRepository } from "../repositories/session.repository.js";
import ApiError from "../errors/errorHelper.js";
import { date, jwt } from "zod";
import config from "../config/index.js";
import { hashService } from "../lib/utils/hash.service.js";
import { SessionRevocationReason } from "../constants/user.constants.js";

class AuthService {

    async register(payload) {
        const mongoSession = await mongoose.startSession();

        try {

            mongoSession.startTransaction();

            const existingUser = await userRepository.findByEmail(payload.email);

            if (existingUser) {
                throw new ApiError(400, "Email already exists.")
            }

            const passwordHash = await passwordService.hash(payload.password);

            const user = await userRepository.create(
                {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    passwordHash,
                },
                { session: mongoSession, }

            );

            const sessionId = new mongoose.Types.ObjectId();

            const accessToken = jwtService.generateAccessToken({
                userId: user._id.toString(),
                sessionId: sessionId.toString(),
                role: user.role,
            });

            const refreshToken = jwtService.generateRefreshToken({
                userId: user._id.toString(),
                sessionId: sessionId.toString(),
            });

            const refreshTokenHash = hashService.hashSha256(refreshToken)

            const decode = jwtService.decodeToken(accessToken)

            await sessionRepository.create(
                {
                    _id: sessionId,
                    userId: user._id,
                    refreshToken: refreshTokenHash,
                    jti: decode.jti,
                    browser: payload.browser,
                    operatingSystem: payload.operatingSystem,
                    platform: payload.platform,
                    userAgent: payload.userAgent,
                    ipAddress: payload.ipAddress,
                    expiresAt: new Date(Date.now() + parseInt(config.auth.refreshExpires) * 24 * 60 * 60 * 1000),
                },
                { session: mongoSession }
            );


            await mongoSession.commitTransaction();

            return { user, accessToken, refreshToken };

        } catch (error) {
            await mongoSession.abortTransaction();
            throw error;
        }
        finally {
            mongoSession.endSession();
        }

    }

    async login(payload) {

        const user = await userRepository.findByEmailWithPassword(payload.email);
        if (!user) {
            throw new ApiError(400, "Invalid credentials.");
        }

        const passwordMatched = await passwordService.compare(payload.password, user.passwordHash);

        if (!passwordMatched) {
            throw new ApiError(400, "Invalid credentials.");

        }

        const mongoSession = await mongoose.startSession();
        try {
            await mongoSession.startTransaction();
            const sessionId = new mongoose.Types.ObjectId()
            const accessToken = jwtService.generateAccessToken({ userId: user._id.toString(), sessionId, role: user.role })

            const refreshToken = jwtService.generateRefreshToken({ userId: user._id.toString(), sessionId })
            const refreshTokenHash = hashService.hashSha256(refreshToken)
            const decode = jwtService.decodeToken(refreshToken)

            await sessionRepository.create(
                {
                    _id: sessionId,
                    userId: user._id,
                    refreshToken: refreshTokenHash,
                    jti: decode.jti,
                    deviceId: payload.deviceId,
                    browser: payload.browser,
                    operatingSystem: payload.operatingSystem,
                    platform: payload.platform,

                    userAgent: payload.userAgent,
                    ipAddress: payload.ipAddress,

                    expiresAt: new Date(Date.now() + parseInt(config.auth.refreshExpires) * 24 * 60 * 60 * 1000),
                },
                {
                    session: mongoSession,
                }
            );
            await mongoSession.commitTransaction()

            return {

                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                },
                accessToken,
                refreshToken,

            };
        } catch (error) {
            await mongoSession.abortTransaction()
            throw error
        } finally {
            await mongoSession.endSession()
        }

    }

    async refresh(refreshToken) {
        const payload = jwtService.verifyRefreshToken(refreshToken)

        const { sub, sid, jti } = payload;
        const user = await userRepository.findById(sub);

        const mongoSession = await mongoose.startSession();
        try {
            await mongoSession.startTransaction();
            const session = await sessionRepository.findById(sid)
            if (!session) {
                throw new ApiError(400, 'session not found')
            }
            
            const incomingRTHash = hashService.hashSha256(refreshToken)

            if (incomingRTHash !== session.refreshToken) {
                throw new ApiError(400, "Refresh token reuse detected.")
            }

            const accessToken = jwtService.generateAccessToken({ userId: sub, sessionId: sid, role: user.role })
            const newRefreshToken = jwtService.generateRefreshToken({ userId: sub, sessionId: sid })

            const decode = jwtService.decodeToken(newRefreshToken)
            const newRThash = hashService.hashSha256(newRefreshToken)

            await sessionRepository.updateRefreshToken({ sessionId: sid, refreshTokenHash: newRThash, jti: decode.jti, expiresAt: new Date(Date.now() + parseInt(config.auth.refreshExpires) * 24 * 60 * 60 * 1000), }, {
                session: mongoSession,
            })

            await mongoSession.commitTransaction()

            return {
                accessToken,
                refreshToken: newRefreshToken
            }

        } catch (error) {
            await mongoSession.abortTransaction()
            throw error
        } finally {
            await mongoSession.endSession()
        }
    }

    async logout(sessionId){
        await sessionRepository.revoke(sessionId,SessionRevocationReason.USER_LOGOUT)

        return ;
    }

}

export const authService =
    new AuthService();