// import { sendSuccessResponse } from "../errors/errorHelper.js";
import { cookieService } from "../lib/cookie/cookie.service.js";
import { authService } from "../services/auth.service.js";



class AuthController {
    register = async (req, res) => {

        const result = await authService.register({

            ...req.validated.body,

            userAgent: req.headers["user-agent"],

            ipAddress: req.ip,

        })

        cookieService.setAccessToken(res, result.accessToken);

        cookieService.setRefreshToken(res, result.refreshToken);

        res.status(200).json({
            statusCode: 201,
            message: "User registered successfully.",
            data: {
                user: result.user,
            },
        });

    };
}
export const authController = new AuthController();