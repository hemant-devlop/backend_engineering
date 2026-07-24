import { jwtService } from "../lib/jwt/jwt.service.js";
import { sessionRepository } from "../repositories/session.repository.js";
import { userRepository } from "../repositories/user.repository.js";

const protect = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized access denied',
            error: 'null'
        })
    }
    const payload = jwtService.verifyAccessToken(accessToken)

    const user = await userRepository.findById(payload.sub)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'unauthorized user',
            error: 'null'
        })
    }
    const session = await sessionRepository.findByNonPassId(payload.sid)

    if (!session) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized access deniedqq',
            error: 'null'
        })
    }

    if (session.revokedAt || session.expiresAt < new Date()) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized access denied',
            error: 'null'
        })
    }

    void sessionRepository.touchLastActivity(
        session._id
    );

    req.user = user;
    req.auth = payload;
    req.session = session
    next();
}
export default protect;