import type { NextApiRequest, NextApiResponse } from 'next'
import AppRes, { AppResData } from '../../../../lib/api/AppRes'
import getPayload from '../../../../lib/api/getPayload'
import getToken from '../../../../lib/api/getToken'
import apiHandler from '../../../../lib/api/middlewares/apiHandler'
import Layer from '../../../../services/firebase/classes/Layer'
import * as _ from 'lodash';
/**
 * 
 * Handler get all layers
 * @param req Request
 * @param res Response
 * @returns AppRes
 */
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {
    /** Allow Only GET Method */
    if (req.method !== 'GET') return AppRes(res, 405, "Method not allowed")
    /** Get Current User */
    const token = getToken(req)
    const { sub } = await getPayload(token)
    /** Instantiate new Layer */
    const layer = new Layer(sub as string);
    /** Retrieve All Layers Of Current User */
    const layers = await layer.getFolders()
    const sortedLayers = _.sortBy(layers, [(i) => i.folderName]);
    return AppRes(res, 200, 'get all layers', { layers: sortedLayers })
}
export default apiHandler(handler)