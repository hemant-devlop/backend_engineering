import cookieConfig from "./cookie.confing.js";

class CookieService{
    setAccessToken(res,token){
        res.cookie("accessToken",token,cookieConfig.accessToken)
    }
    setRefreshToken(res,token){
        res.cookie("refreshToken",token,cookieConfig.refreshToken)
    }
    clearAccessToken(res){
        res.clearCookie("accessToken",cookieConfig.accessToken)
    }
    clearRefreshToken(res){
        res.clearCookie("refreshToken",cookieConfig.refreshToken)
    }
}

export const cookieService=new CookieService()