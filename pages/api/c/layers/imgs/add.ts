import type { NextApiRequest, NextApiResponse } from 'next'
import AppRes, { AppResData } from '../../../../../lib/api/AppRes';
import getPayload from '../../../../../lib/api/getPayload';
import getToken from '../../../../../lib/api/getToken';
import apiHandler from "../../../../../lib/api/middlewares/apiHandler";
import Layer from '../../../../../services/firebase/classes/Layer';
/**
 * 
 * Handler add new img or imgs
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
    const { layerId, imgs } = req.body;
    /** Chech Layer is Exists */
    /** Get Layer Doc */
    const layerDoc = await layer.getLayerDoc(layerId).get();
    if (!layerDoc.exists) return AppRes(res, 400, "Layer Doesn't Exists")
    // Check layerId & imgs exists
    if (!layerId) return AppRes(res, 400, "Please provide layerId")
    if (!imgs || imgs.length === 0) return AppRes(res, 400, "Please provide imgs")
    const imgsLength = await layer.addImages(layerId, imgs);
    return AppRes(res, 200, `${imgsLength} images added`)
}
export default apiHandler(handler)