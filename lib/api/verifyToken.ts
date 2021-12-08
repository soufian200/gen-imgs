import jsonResponse from "./jsonResponse";
import jwt from "jsonwebtoken";


export interface UserJwtPayload {
    sub: string
}

const verifyToken = (token: string) => {

    try {
        var decoded = jwt.verify(token, String(process.env.JWT_SECRET));
        return decoded as UserJwtPayload

    } catch (err: any) {

        return jsonResponse(401, { error: { message: 'Your token has expired.' } })
    }

}

export default verifyToken;