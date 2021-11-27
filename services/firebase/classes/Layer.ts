import { ImgInterface, LayerInterface } from "../../../utils/interfaces";
import User from "./User";
import { nanoid } from "nanoid"


type LayerData = {
    /**
     * Layer Name
     * */
    folderName: string
}


class Layer extends User {


    private layersCollection;

    constructor(userId: string) {

        super();
        /**
         * Layers Collection For A User
         * */
        this.layersCollection = this.getUserDoc(userId).collection("layers")

    }

    /**
    * Get Layer Doc
    * */
    getLayerDoc(_layerId: string) {

        return this.layersCollection.doc(_layerId)
    }

    /**
    * Add A Layer
    * */
    async add(_layerName: string) {

        /** Generate A Layer ID */
        const layerId = nanoid();

        /** Get Layer Doc */
        const layerDoc = this.getLayerDoc(layerId);

        /** Check If layerId Exists With _layerName */
        const isLayerExists = (await layerDoc.get()).exists || (await this.getLayersNames()).includes(_layerName)

        if (isLayerExists)
            throw new Error("Layer Already Exists")


        /** Add Layer To User's Layers */
        layerDoc.set({ folderName: _layerName })

        /** Return Layer Id */
        return layerDoc.id;

    }

    /**
     * Get A Layer
     * */
    async get(_layerId: string) {

        /** Get Layer Doc */
        const layerDoc = await this.getLayerDoc(_layerId).get();



        if (!layerDoc.exists)
            throw new Error("Layer Doesn't Exists")


        return {
            id: _layerId,
            ...layerDoc.data()
        }

    }

    /**
     * Get Img Document
     * */
    getImgDoc(_layerId: string, _imgId: string) {

        return this.getLayerDoc(_layerId).collection("imgs").doc(_imgId)
    }

    /**
    * Add A Image To Layer
    * */
    async addImages(_layerId: string, _imgs: ImgInterface[]) {

        /** Get Layer Doc */
        const layerDoc = await this.getLayerDoc(_layerId).get();



        if (!layerDoc.exists)
            throw new Error("Layer Doesn't Exists")


        /** iterate over imgs and set img */

        _imgs.forEach((img) => {

            /** Generate A Layer ID */
            const imgId = nanoid();

            /** Create New Img Doc */
            const imgDoc = this.getImgDoc(_layerId, imgId);

            imgDoc.set(img)

        })

        return _imgs.length

    }

    /**
    * Add All Image Of A Layer
    * */
    async getLayerImgs(_layerId: string) {

        /** Collect Img To Arr */
        const imgs: any[] = [];

        /** Get Imgs Of A Layer */
        const imgsOfLayer = await this.getLayerDoc(_layerId).collection("imgs").get();

        imgsOfLayer.forEach(imgOfLayer => {

            if (imgOfLayer.exists)
                imgs.push({ id: imgOfLayer.id, ...imgOfLayer.data(), })

        })

        /** Return Layer With It's Images */
        return imgs

    }

    /**
    * Get Layers's IDs
    * */
    async getLayersIds() {


        const layersIds = await this.layersCollection.get();

        const ids: string[] = [];

        layersIds.forEach(layerId => {
            ids.push(layerId.id as string);
        })

        return ids

    }

    /**
    * Get Layers's Names
    * */
    async getLayersNames() {

        /** Get Layers IDs */
        const layersIds = await this.getLayersIds();

        /** Pending Promises */
        const pendingNames: Promise<LayerInterface>[] = []


        layersIds.forEach((layerId) => {

            /** Get Each Layer With By Its ID */
            const layerData = this.get(layerId);

            /** Push Promise To Pending Promise */
            pendingNames.push(layerData as Promise<LayerInterface>)
        })

        /** Fulfill Pending Promises Names */
        let names: LayerInterface[] = await Promise.all(pendingNames)

        /** Return Names Array */
        return names.map(name => name.folderName);

    }

    /**
    * Get 
    * */
    async getAll() {

        /** Get All Layers Of A User */
        const layersIds = await this.layersCollection.get();

        const pendingLayers: Promise<LayerInterface>[] = [];
        const pendingImgs: Promise<any>[] = [];

        layersIds.forEach((layerId) => {

            const layer = this.get(layerId.id)
            const imgs = this.getLayerImgs(layerId.id)
            pendingLayers.push(layer as Promise<LayerInterface>)
            pendingImgs.push(imgs)
        })



        const layers = await Promise.all(pendingLayers)
        const imgs = await Promise.all(pendingImgs)

        const layersOfUser = layers.map((layer, index) => {
            return {
                ...layer,
                imgs: imgs[0]
            }
        })





        return layersOfUser;
    }

    /**
     * Add A Image To Layer
     * @param _layerId Id Of Layer That's Gonna Be Changed
     * @param _newName New Layer Name
     * */
    async rename(_layerId: string, _newName: string) {

        const layer = await this.get(_layerId)

        if (!layer.id) return;

        /** Get Layer Doc With Name That's Gonna Be Changed */
        const oldLayer = this.getLayerDoc(_layerId)

        /** Update Layer Name */
        oldLayer.update({ folderName: _newName })

        /** Return The New Name */
        return _newName

    }

    /**
     * Add A Image To Layer
     * @param _layerId Id Of Layer That's Gonna Be Changed
     * @param _imgsIds Array Of IDs Of Imgs 
     * */
    async deleteImgs(_layerId: string, _imgsIds: string[]) {

        const deletedPending = _imgsIds.map(async (_imgId) => {
            await this.getImgDoc(_layerId, _imgId).delete();
        })

        const deletedImgs = await Promise.all(deletedPending);
        return deletedImgs.length

    }

    private async _getImgsIdsOfLayer(_layerId: string) {

        const imgsOfLayer = await this.getLayerDoc(_layerId).collection("imgs").get();
        const imgsIds: string[] = [];

        imgsOfLayer.forEach((imgOfLayer) => {

            if (imgOfLayer.exists)
                imgsIds.push(imgOfLayer.id)

        })

        return imgsIds

    }

    /**
    * Delete One Layer Or More
    * 
    * @param _layersIds Array Of IDs of A Layer
    * @return Count Of Deleted Layers
    * 
    * */
    async delete(_layersIds: string[]) {


        const deletedPending = _layersIds.map(async (_layerId, index) => {

            /** Get Of Ids Of Images Of Layer Thas's Gonna Be Deleted */
            const imgsIds = await this._getImgsIdsOfLayer(_layerId)

            /** Delete Imgs Of Layer (imgs is subCollection of layer) */
            await this.deleteImgs(_layerId, imgsIds)

            /** Delete Layer */
            await this.layersCollection.doc(_layerId).delete();

            /** Return Index In Each Deletion */
            return index;
        })

        const deletedLayers = await Promise.all(deletedPending);


        return deletedLayers.length




        /** Get Imgs Of A Layer */
        //  const imgsOfLayer = await this.getLayerDoc(_layerId).collection("imgs").get();




        //     // const deleted = await this.getLayerDoc(_layerId).collection("imgs").
        //     // const deleted = await this.getLayerDoc(_layerId).delete();
        //     const res = await this.layersCollection.doc(_layerId).delete();
        //     console.log(res)
    }



}

export default Layer;