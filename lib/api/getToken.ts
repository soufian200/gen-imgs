import { NextApiRequest } from "next";
import { COOKIES_NAMES } from "../../constants/cookiesNames";

const getToken = (req: NextApiRequest) => {
    const token = req.cookies[COOKIES_NAMES.token]
    return token
}
export default getToken;