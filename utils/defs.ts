import { loadImage } from "canvas";
import {
    format,
    baseUri,
    description,
    background,
    uniqueDnaTorrance,
    layerConfigurations,
    rarityDelimiter,
    preview,
    shuffleLayerConfigurations,
    debugLogs,
    extraMetadata,
    pixelFormat,
    text,
    namePrefix,
    network,
    solanaMetadata,
    gif,
} from "../lib/config";
import { canvas, ctx } from "../lib/ctx";
import { AttributeListInterface, ConstructLayerInterface, ElementInterface, LayerInterface, LayersInterface, RenderObjectInterface, TempMetadataInterface } from "./interfaces";
// import fs from "fs"
import sha1 from "sha1"
import { NETWORK } from "../constants/network";

let hashlipsGiffer = null;
export var metadataList: any = [];
export var attributesList: AttributeListInterface[] = [];
var dnaList = new Set();
const DNA_DELIMITER = "-";
const buildDir = "public/build";
const layersDir = "public/layers";
/**
 * getElements
 * */

const getElements = (imgs: any) => {

    return imgs.map((i: any, index: number) => {
        return {
            id: index,
            name: cleanName(i.filename),
            filename: i.filename,
            path: i.path,
            weight: getRarityWeight(i.filename),
        };
    });


};


/**
 * layersSetup
 * */


const layersSetup = (layersOrder: LayerInterface[]) => {

    const layers = layersOrder.map((layerObj, index: number) => ({
        id: index,
        elements: getElements(layerObj.imgs),
        name:
            layerObj.options?.["displayName"] != undefined
                ? layerObj.options?.["displayName"]
                : layerObj.folderName,
        blend:
            layerObj.options?.["blend"] != undefined
                ? layerObj.options?.["blend"]
                : "source-over",
        opacity:
            layerObj.options?.["opacity"] != undefined
                ? layerObj.options?.["opacity"]
                : 1,
    }));
    return layers;
};


/**
 * suffle array
 * */
function shuffle(array: number[]) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}


/**
 * get filename without extension
 * */
const cleanName = (_str: string) => {
    let nameWithoutExtension = _str.slice(0, -4);
    var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
    return nameWithoutWeight;
};


/**
 * Get Rarity Weight
 * */
const getRarityWeight = (_str: string) => {
    let nameWithoutExtension = _str.slice(0, -4);
    var nameWithoutWeight = Number(
        nameWithoutExtension.split(rarityDelimiter).pop()
    );
    if (isNaN(nameWithoutWeight)) {
        nameWithoutWeight = 1;
    }
    return nameWithoutWeight;
};


/**
 * Create Dna
 * */

const createDna = (_layers: LayersInterface[]): string => {

    let randNum: string[] = [];

    _layers.forEach((layer) => {

        var totalWeight = 0;
        layer.elements.forEach((element) => {
            totalWeight += element.weight;
        });
        // number between 0 - totalWeight
        let random = Math.floor(Math.random() * totalWeight);



        for (var i = 0; i < layer.elements.length; i++) {
            // subtract the current weight from the random weight until we reach a sub zero value.
            random -= layer.elements[i].weight;

            if (random < 0)
                return randNum.push(`${layer.elements[i].id}:${layer.elements[i].filename}`);

        }

    });
    return randNum.join(DNA_DELIMITER);
};


/**
 * is Dna Unique
 * */
const isDnaUnique = (_DnaList = new Set(), _dna = "") => !_DnaList.has(_dna);


/**
 * draw Background
 * */
const drawBackground = () => {
    ctx.fillStyle = background.static ? background.default : genColor();
    ctx.fillRect(0, 0, format.width, format.height);
};

const genColor = () => {
    let hue = Math.floor(Math.random() * 360);
    let pastel = `hsl(${hue}, 100%, ${background.brightness})`;
    return pastel;
};


/**
* cleanDna
* */

const cleanDna = (_str: string) => Number(_str.split(":").shift());

const loadLayerImg = async (_layer: ConstructLayerInterface) => {
    return new Promise(async (resolve) => {
        const image = await loadImage(`${_layer.selectedElement?.path}`);
        resolve({ layer: _layer, loadedImage: image });
    });
};


/**
* Write MetaData
* */
// const writeMetaData = (_data: string) => fs.writeFileSync(`${buildDir}/json/_metadata.json`, _data);

/**
 * Save Image
 * */
const saveImage = (_editionCount: number) => {

    // fs.writeFileSync(
    //     `${buildDir}/images/${_editionCount}.png`,
    //     canvas.toBuffer("image/png")
    // );
    return canvas.toBuffer("image/png")
};


/**
 * Save Image
 * */


const addMetadata = (_dna: string, _edition: number, namePrefix: string, description: string) => {

    // time
    let dateTime = Date.now();

    // meta data
    let tempMetadata: TempMetadataInterface = {
        name: `${namePrefix} #${_edition}`,
        description,
        image: `${baseUri}/${_edition}.png`,
        dna: sha1(_dna),
        edition: _edition,
        date: dateTime,
        ...extraMetadata,
        attributes: attributesList,
        compiler: "NFTs Generator",
    };

    if (network == NETWORK.sol) {

        tempMetadata = {
            //Added metadata for solana
            name: tempMetadata.name,
            symbol: solanaMetadata.symbol,
            description: tempMetadata.description,
            //Added metadata for solana
            seller_fee_basis_points: solanaMetadata.seller_fee_basis_points,
            image: `image.png`,
            //Added metadata for solana
            external_url: solanaMetadata.external_url,
            edition: _edition,
            ...extraMetadata,
            attributes: tempMetadata.attributes,
            properties: {
                category: "image",
                creators: solanaMetadata.creators,
                files: [
                    {
                        uri: "image.png",
                        type: "image/png",
                    }
                ],

            },
        };
    }

    metadataList.push(tempMetadata);
    attributesList = [];
};


/**
 * save MetaData Single File
 * */
const saveMetaDataSingleFile = (_editionCount: number) => {

    let metadata = metadataList.find((meta: any) => meta.edition == _editionCount);

    debugLogs
        ? console.log(`Writing metadata for ${_editionCount}: ${JSON.stringify(metadata)}`)
        : null;

    // fs.writeFileSync(
    //     `${buildDir}/json/${_editionCount}.json`,
    //     JSON.stringify(metadata, null, 2)
    // );

    return JSON.stringify(metadata, null, 2)
};

/**
 * Draw Element
 * */

const addText = (_sig: string, x: number, y: number, size: number) => {

    const { color, baseline, align, weight } = text;

    const bs: any = baseline;
    const alg: any = align;

    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}pt ${text.family}`;
    ctx.textBaseline = bs;
    ctx.textAlign = alg;
    ctx.fillText(_sig, x, y);
};


const drawElement = (_renderObject: RenderObjectInterface, _index: number, _layersLen: number) => {

    const { xGap, yGap, size, spacer } = text;

    ctx.globalAlpha = _renderObject.layer.opacity;
    ctx.globalCompositeOperation = _renderObject.layer.blend;
    text.only
        ? addText(
            `${_renderObject.layer.name}${spacer}${_renderObject.layer.selectedElement.name}`,
            xGap,
            yGap * (_index + 1),
            size
        )
        : ctx.drawImage(
            _renderObject.loadedImage,
            0,
            0,
            format.width,
            format.height
        );

    addAttributes(_renderObject);
};


/**
 * Add Attributes
 * */
const addAttributes = (_element: any) => {

    let selectedElement = _element.layer.selectedElement;

    attributesList.push({
        trait_type: _element.layer.name,
        value: selectedElement.name,
    });
};

/**
 * construct Layer To Dna
 * */

const constructLayerToDna = (_dna: string = "", _layers: LayersInterface[] = []): ConstructLayerInterface[] => {
    let mappedDnaToLayers = _layers.map((layer, index) => {
        let selectedElement = layer.elements.find((e) => e.id == cleanDna(_dna.split(DNA_DELIMITER)[index]));
        return {
            name: layer.name,
            blend: layer.blend,
            opacity: layer.opacity,
            selectedElement,
        };
    });
    return mappedDnaToLayers;
};


export {
    drawBackground,
    isDnaUnique,
    createDna,
    getElements,
    layersSetup,
    shuffle,
    cleanDna,
    loadLayerImg,
    addText,
    drawElement,
    constructLayerToDna,
    // writeMetaData,
    saveImage,
    addMetadata,
    saveMetaDataSingleFile
}