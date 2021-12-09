import { NextRequest } from "next/server"
import { COOKIES_NAMES } from "../../constants/cookiesNames"
import jsonResponse from "./jsonResponse"
import { jwtVerify } from 'jose'

interface UserJwtPayload {
    jti: string
    iat: number
}

export async function verifyAuth(request: NextRequest) {

    const token = request.cookies[COOKIES_NAMES.token]

    if (!token) {
        // token is missing
        return jsonResponse(401, { error: { message: 'Please Log in' } })
    }

    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(String(process.env.JWT_SECRET))
        )
        return verified.payload as UserJwtPayload
    } catch (err) {
        return jsonResponse(401, { error: { message: 'Your token has expired.' } })
    }
}

export default verifyAuth;