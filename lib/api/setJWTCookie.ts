import { serialize } from "cookie"
import { COOKIES_NAMES } from "../../constants/cookiesNames"
/**
 * 
 * @param token 
 * @returns Serialized Cookie
 */
const setJWTCookie = (token: string) => {
    const cookieOptions = {
        path: "/",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * Number(process.env.JWT_COOKIE_EXPIRES_IN)) // 24h | 1day
    }
    return serialize(COOKIES_NAMES.token, token, cookieOptions)
}
export default setJWTCookie