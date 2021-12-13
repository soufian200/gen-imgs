import { serialize } from "cookie";
import { jwtVerify } from "jose";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES_NAMES } from "../../../constants/cookiesNames";
import AppRes from "../AppRes";
/**
 * 
 * Handle Authorization and 500 Error
 */
const apiHandler = (handler: any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {

        try {
            /** Check if there is a token */
            const token = req.cookies[COOKIES_NAMES.token]
            if (!token) return AppRes(res, 401, 'please log in')
            /** Verify Coming Token */
            await jwtVerify(
                token,
                new TextEncoder().encode(String(process.env.JWT_SECRET))
            )
            /** Handle 500 Error */
            try {
                return await handler(req, res)
            } catch (err) {
                console.log('========== from apiHandler ==========')
                console.log((err as Error).message)
                return AppRes(res, 500, (err as Error).message)
            }
        } catch (err) {
            console.log('========== Require JWT ==========')
            console.log((err as Error).message)
            /** Token Expired Or Corrupted */
            res.setHeader("Set-Cookie", serialize(COOKIES_NAMES.token, 'none', { maxAge: -1, path: '/' }))
            return AppRes(res, 401, 'Your token has expired.')
        }
    }
}
export default apiHandler;