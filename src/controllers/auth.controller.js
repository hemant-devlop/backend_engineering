// import { sendSuccessResponse } from "../errors/errorHelper.js";
import { success } from "zod";
import ApiError from "../errors/errorHelper.js";
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

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: {
                user: result.user,
            },
        });

    };
    login = async (req, res) => {
        const result = await authService.login({
            ...req.validated.body,

            userAgent: req.headers["user-agent"],

            ipAddress: req.ip,
        })

        cookieService.setAccessToken(res, result.accessToken)
        cookieService.setRefreshToken(res, result.refreshToken)

        res.status(200).json({
            success: true,
            message: "Login successfully.",
            data: {
                user: result.user,
            },
        });

    }

    refresh = async (req, res) => {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            res.status(401).json({
                success: false,
                message: "Refresh token Required",
                error: ''
            })
        }

        const result = await authService.refresh(refreshToken)


        cookieService.setAccessToken(res, result.accessToken)
        cookieService.setRefreshToken(res, result.refreshToken)

        res.status(200).json({
            success: true,
            message: "refresh successfully.",
            data: null,
        });

    }

    user = (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'user found',
            data: {
                 id:req.user._id,

                email:req.user.email,

                role:req.user.role,

                browser:req.session.browser,

                ip:req.session.ipAddress
            }
        })
    }
}
export const authController = new AuthController();