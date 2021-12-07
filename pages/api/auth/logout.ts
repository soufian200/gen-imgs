import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES_NAMES } from "../../../constants/cookiesNames";
import AppRes, { AppResData } from "../../../lib/api/AppRes";

/**
 * 
 * Logout handler
 * @param req Request
 * @param res Response
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {
    // Clear Cookie
    res.setHeader("Set-Cookie", serialize(COOKIES_NAMES.token, 'none', { maxAge: -1, path: '/' }))
    return AppRes(res, 200, 'logout success')
}