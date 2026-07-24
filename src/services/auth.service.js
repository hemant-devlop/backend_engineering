import mongoose from "mongoose";
import crypto from "crypto";
import { userRepository } from "../repositories/user.repository.js";
import { passwordService } from "../lib/password/password.service.js";
import { jwtService } from "../lib/jwt/jwt.service.js";
import { sessionRepository } from "../repositories/session.repository.js";
import ApiError from "../errors/errorHelper.js";
import { date, jwt } from "zod";
import config from "../config/index.js";





class AuthService {

    async register(payload) {
        const mongoSession = await mongoose.startSession();

        try {

            mongoSession.startTransaction();

            // Check Existing User

            const existingUser = await userRepository.findByEmail(payload.email);

            if (existingUser) {
                throw new ApiError(400, "Email already exists.")
            }

            // Hash Password

            const passwordHash = await passwordService.hash(payload.password);

            // Create User

            const user = await userRepository.create(
                {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    passwordHash,
                },
                { session: mongoSession, }

            );

            // -----------------------------
            // Generate Session Id


            const sessionId = new mongoose.Types.ObjectId();

            // -----------------------------
            // Generate Tokens
            // -----------------------------

            const accessToken =
                jwtService.generateAccessToken({

                    userId: user._id.toString(),

                    sessionId:
                        sessionId.toString(),

                    role: user.role,

                });

            const refreshToken =
                jwtService.generateRefreshToken({

                    userId: user._id.toString(),

                    sessionId:
                        sessionId.toString(),

                });

            // -----------------------------
            // Hash Refresh Token
            // -----------------------------

            const refreshTokenHash =
                crypto

                    .createHash("sha256")

                    .update(refreshToken)

                    .digest("hex");

            // -----------------------------
            // Create Session
            // -----------------------------
            const decode = jwtService.decodeToken(accessToken)

            // const expireDate = new Date(
            //     Date.now() + parseInt(config.auth.refreshExpires) * 24 * 60 * 60 * 1000
            // );

            await sessionRepository.create(

                {

                    _id: sessionId,

                    userId: user._id,

                    refreshToken: refreshTokenHash,

                    jti: decode.jti,

                    browser:
                        payload.browser,

                    operatingSystem:
                        payload.operatingSystem,

                    platform:
                        payload.platform,

                    userAgent:
                        payload.userAgent,

                    ipAddress:
                        payload.ipAddress,

                    expiresAt: new Date( Date.now() + parseInt(config.auth.refreshExpires) * 24 * 60 * 60 * 1000),
                },

                {

                    session:
                        mongoSession,

                }

            );

            // -----------------------------
            // Commit Transaction
            // -----------------------------

            await mongoSession.commitTransaction();

            return {

                user,

                accessToken,

                refreshToken,

            };

        }

        catch (error) {

            await mongoSession.abortTransaction();

            throw error;

        }

        finally {

            mongoSession.endSession();

        }

    }

    async login(payload) {

        const user =
            await userRepository.findByEmailWithPassword(
                payload.email
            );

        if (!user) {

            throw new ApiError(
                400,
                "Invalid credentials."
            );

        }

        const passwordMatched =
            await passwordService.compare(

                payload.password,

                user.passwordHash

            );

        if (!passwordMatched) {

            throw new ApiError(
                400,
                "Invalid credentials."
            );

        }

        // Login flow continues...
    }

}

export const authService =
    new AuthService();