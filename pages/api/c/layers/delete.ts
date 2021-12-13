import type { NextApiRequest, NextApiResponse } from 'next'
import AppRes, { AppResData } from '../../../../lib/api/AppRes'
import getPayload from '../../../../lib/api/getPayload'
import getToken from '../../../../lib/api/getToken'
import apiHandler from '../../../../lib/api/middlewares/apiHandler'
import requireJWT from '../../../../lib/api/middlewares/requireJWT'
import Layer from '../../../../services/firebase/classes/Layer'
/**
 * 
 * Handler rename layer's name
 * @param req Request
 * @param res Response
 * @returns AppRes
 */
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {
    /** Prevent GET Method */
    if (req.method === 'GET') return AppRes(res, 405, "Method not allowed")
    /** Get Current User */
    const token = getToken(req)
    const { sub } = await getPayload(token)
    /** Instantiate new Layer */
    const layer = new Layer(sub as string);
    /** Get LayerName From Client */
    const { layerIds } = req.body;
    const deletedCount = await layer.delete(layerIds)

    return AppRes(res, 200, `${deletedCount} layers deleted`)

}
export default apiHandler(handler)