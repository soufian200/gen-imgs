import { NextRequest, NextResponse } from 'next/server'
import { COOKIES_NAMES } from '../../constants/cookiesNames'
import jwt from 'jsonwebtoken'
import routes from '../../constants/routes'
export function middleware(req: NextRequest) {
    // Check If User Already Loged In
    return verifyJwt(req, NextResponse.next())
}

export async function verifyJwt(
    request: NextRequest,
    response: NextResponse
) {
    // Get JWT Token Cookie
    const token = request.cookies[COOKIES_NAMES.token]
    if (token) {
        try {
            // Get Decode JWT Token
            let { exp, iat }: any = jwt.verify(token, String(process.env.JWT_SECRET));
            //If Token Expired Yer Go To Home
            if (exp > iat) return NextResponse.redirect(routes.CONTENT + routes.HOME)
        } catch (err: any) {
            // If Token Valid Clear JWT Token Cookie
            return response.clearCookie(COOKIES_NAMES.token)
        }
    }
    return response
}


