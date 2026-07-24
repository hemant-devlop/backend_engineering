// cookie.config.js

export const createCookieConfig = (env) => {

    return Object.freeze({

        accessCookie:env.COOKIE_ACCESS_NAME,

        refreshCookie:env.COOKIE_REFRESH_NAME,

        secure:env.COOKIE_SECURE,

        httpOnly:env.COOKIE_HTTP_ONLY,

        sameSite:env.COOKIE_SAME_SITE,

        accessMaxAge:15*60*1000,

        refreshMaxAge:30*24*60*60*1000
    });

};