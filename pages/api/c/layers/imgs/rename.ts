import type { NextApiRequest, NextApiResponse } from 'next'
import AppRes, { AppResData } from '../../../../../lib/api/AppRes';
import getPayload from '../../../../../lib/api/getPayload';
import getToken from '../../../../../lib/api/getToken';
import apiHandler from "../../../../../lib/api/middlewares/apiHandler";
import Layer from '../../../../../services/firebase/classes/Layer';
/**
 * 
 * Handler rename img's name
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
    const { layerId, imgId, newImgName } = req.body;
    // Check layerId & imgs exists
    if (!layerId) return AppRes(res, 400, "Please provide layerId")
    if (!imgId) return AppRes(res, 400, "Please provide imgId")
    if (!newImgName) return AppRes(res, 400, "Please provide newImgName")
    /** Check Layer is Exists */
    /** Get Layer Doc */
    const layerData = await layer.getLayerDoc(layerId).get();
    if (!layerData.exists) return AppRes(res, 400, "Layer Doesn't Exists")
    const imgDoc = layer.getImgDoc(layerId, imgId);
    const imgData = await imgDoc.get()
    if (!imgData.exists) return AppRes(res, 400, "Img Doesn't Exists")
    imgDoc.update({
        filename: newImgName
    })
    return AppRes(res, 200, `rename '${imgData.data()?.filename}' to '${newImgName}'`)
}
export default apiHandler(handler)