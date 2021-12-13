import type { NextApiRequest, NextApiResponse } from 'next'
import AppRes, { AppResData } from '../../../../../lib/api/AppRes';
import getPayload from '../../../../../lib/api/getPayload';
import getToken from '../../../../../lib/api/getToken';
import apiHandler from "../../../../../lib/api/middlewares/apiHandler";
import requireJWT from "../../../../../lib/api/middlewares/requireJWT";
import Layer from '../../../../../services/firebase/classes/Layer';
/**
 * 
 * Handler get imgs or a layer
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
    /** Get layerId & imgs From Client */
    const { layerId } = req.body;
    /** Chech Layer is Exists */
    const layerDoc = await layer.getLayerDoc(layerId).get();
    if (!layerDoc.exists) return AppRes(res, 400, "Layer Doesn't Exists")
    const imgs = await layer.getLayerImgs(layerId);
    return AppRes(res, 200,
        `get images of '${layerDoc.data()?.folderName}' `,
        { layerId, layerName: layerDoc.data()?.folderName, imgs })
}
export default apiHandler(handler)