import config from "../../config/index.js"

const cookieConfig = {
    accessToken: {
        httpOnly: config.cookie.secure,
        secure: config.app.isProduction,
        sameSite: config.cookie.sameSite,
        maxAge: config.cookie.accessMaxAge
    },
    refreshToken: {
        httpOnly:  config.cookie.secure,
        secure: config.app.isProduction,
        sameSite: config.cookie.sameSite,
        maxAge:config.cookie.refreshMaxAge
    }
}

export default cookieConfig;