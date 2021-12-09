import { jwtVerify } from 'jose'
/**
 * Get JWT Payload
 * @param _token 
 * @returns 
 */
const getPayload = async (_token: string) => {

    const { payload } = await jwtVerify(_token, new TextEncoder().encode(String(process.env.JWT_SECRET)))
    return payload
}

export default getPayload;