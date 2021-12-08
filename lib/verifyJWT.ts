import { NextRequest, NextResponse } from 'next/server'
import { COOKIES_NAMES } from '../constants/cookiesNames'
import jwt from 'jsonwebtoken'
import routes from '../constants/routes'

export default async function verifyJWT(
    request: NextRequest,
    response: NextResponse
) {
    const pathname = request.nextUrl.pathname;
    // Get JWT Token Cookie
    const token = request.cookies[COOKIES_NAMES.token]
    // If No User Logged In
    if (!token && pathname.includes(routes.CONTENT)) return NextResponse.redirect(routes.LOGIN)

    if (token && pathname.includes(routes.LOGIN)) {
        // Get User And Redirect To Home
        try {
            // Get Decode JWT Token
            let { exp }: any = jwt.verify(token, String(process.env.JWT_SECRET));
            //If Token Expired Yer Go To Home
            if (Date.now() < exp * 1000) return NextResponse.redirect(routes.CONTENT + routes.HOME)
        } catch (err: any) {
            // If Token Valid Clear JWT Token Cookie
            return response.clearCookie(COOKIES_NAMES.token)
        }

    }

    return response
}