import type { NextRequest } from 'next/server'
import { COOKIES_NAMES } from '../../../constants/cookiesNames'
import jsonResponse from '../../../lib/api/jsonResponse'
import verifyToken from '../../../lib/api/verifyToken'
import jwt from 'jsonwebtoken'

export async function middleware(req: NextRequest,) {


    const token = req.cookies[COOKIES_NAMES.token]


    // console.log(token)
    if (!token) {

        return jsonResponse(401, { error: { status: 401, message: 'Missing user token' }, })
    }




    // FIXME:  activate check if there is a token

    // const resOrDecode = verifyToken(token)
    // console.log("resOrDecode: ", resOrDecode)
    // if (resOrDecode instanceof Response) return resOrDecode

}

