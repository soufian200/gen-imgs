import type { NextRequest } from 'next/server'
import { COOKIES_NAMES } from '../../../constants/cookiesNames'
import jsonResponse from '../../../lib/api/jsonResponse'
import verifyAuth from '../../../lib/api/verifyAuth'

export async function middleware(req: NextRequest,) {

    // console.log("middleware server triggerd======")
    const resOrPayload = await verifyAuth(req)

    if (resOrPayload instanceof Response)
        return resOrPayload


}

