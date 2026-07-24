import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import config from '../../config/index.js'


class JwtService {
    generateAccessToken({ userId, sessionId, role }) {
        return jwt.sign(
            { sub: userId, sid: sessionId, jti: crypto.randomUUID(), role, type: 'access' },
            config.auth.accessToken,
            { expiresIn: config.auth.accessExpires },{algorithm:"HS256"}
        )
    }
    generateRefreshToken({ userId, sessionId }) {

        return jwt.sign(
            { sub: userId, sid: sessionId, jti: crypto.randomUUID(), type: "refresh" },
            config.auth.refreshToken,
            { expiresIn: config.auth.refreshExpires }

        );
    }
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, config.auth.refreshToken);
        }
        catch {
            console.log('"Invalid refresh token."')///
        }
    }
    decodeToken(token) {
        return jwt.decode(token);
    }
    getRefreshTokenExpiry(){
        return config.auth.refreshExpires 
    }
}
export const jwtService =new JwtService();