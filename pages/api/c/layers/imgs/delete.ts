import type { NextApiRequest, NextApiResponse } from 'next'
import AppRes, { AppResData } from '../../../../../lib/api/AppRes'
import getPayload from '../../../../../lib/api/getPayload'
import getToken from '../../../../../lib/api/getToken'
import apiHandler from '../../../../../lib/api/middlewares/apiHandler'
import Layer from '../../../../../services/firebase/classes/Layer'
/**
 * 
 * Handler delete one image of a layer or more images
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
    const { layerId, imgsIds } = req.body;
    if (!layerId) return AppRes(res, 400, "Please provide layerId")
    if (imgsIds.length === 0) return AppRes(res, 400, "Please provide imgsIds")
    const size = await layer.deleteImgs(layerId, imgsIds)
    return AppRes(res, 200, `${size} images deleted`)
}
export default apiHandler(handler)
