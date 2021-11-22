import { MODE } from '../constants/blend_mode';
import { NETWORK } from '../constants/network';



// const isLocal = typeof process.pkg === "undefined";
// const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Your Collection";
const description = "Remember to replace this description";
const baseUri = "ipfs://NewUriToReplace";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 3,
    layersOrder: [
      {
        folderName: "bgs",
        imgs: [
          {
            filename: 'pink#2.png',
            path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbg%2Fpink%232.png?alt=media&token=83fee278-440b-4281-b6e7-5ebfe5c0581f",
          },
          {
            filename: 'purple#3.png',
            path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbg%2Fpurple%233.png?alt=media&token=0e5505e3-a938-4d2e-a900-e50ff261bf5d",
          },
          {
            filename: 'yellow#1.png',
            path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbg%2Fyellow%231.png?alt=media&token=a13c7ac6-88b7-4235-b4fb-bbd82886ea30"

          },

        ]
      },
      {
        folderName: "body",
        imgs: [
          {
            filename: 'Untitled#1.png',
            path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FGreen%231.png?alt=media&token=6042142c-9c4f-4d03-8907-973414366dc9"
          },
          {
            filename: 'Untitled#2.png',
            path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FPink%231.png?alt=media&token=73c41f95-0e85-4908-a597-646561292309"
          },
          {
            filename: 'Untitled#3.png',
            path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FPurple%231.png?alt=media&token=a8d42354-b190-4741-803a-9614321ec9ff"

          },
        ]
      },]
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = true;

const format = {
  width: 512,
  height: 512,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

export {
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
};
