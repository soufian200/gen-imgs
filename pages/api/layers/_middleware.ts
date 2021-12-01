import type { NextRequest } from 'next/server'
import jsonResponse from '../../../lib/api/jsonResponse'


export async function middleware(req: NextRequest,) {


    const token = req.cookies


    if (!token)
        return jsonResponse(401, { error: { status: 401, message: 'Missing user token' }, })


    // FIXME:  activate check if there is a token

    // const resOrDecode = verifyToken(token)
    // if (resOrDecode instanceof Response) return resOrDecode




}

