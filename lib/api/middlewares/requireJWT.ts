import { jwtVerify } from "jose";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES_NAMES } from "../../../constants/cookiesNames";
import AppRes from "../AppRes";


const requireJWT = (handler: any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {

        const token = req.cookies[COOKIES_NAMES.token]
        if (!token) {
            // token is missing
            return AppRes(res, 401, 'please log in')
        }
        try {

            await jwtVerify(
                token,
                new TextEncoder().encode(String(process.env.JWT_SECRET))
            )


            return await handler(req, res)

        } catch (err) {
            console.log('========== Require JWT ==========')
            console.log((err as Error).message)
            return AppRes(res, 401, 'Your token has expired.')
        }
    }
}

export default requireJWT;