// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import app from 'next/app';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import storage from "../../services/firebase/storage";
import {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
} from "../../lib/config"
import { NETWORK } from "../../constants/network"
import HashlipsGiffer from "../../lib/HashlipsGiffer"

import sha1 from "sha1"
import {
  addMetadata,
  constructLayerToDna,
  createDna,
  drawBackground,
  drawElement,
  isDnaUnique,
  layersSetup,
  loadLayerImg,
  metadataList,
  saveImage,
  saveMetaDataSingleFile,
  shuffle,
  writeMetaData
} from '../../utils/defs';
import { ConstructLayerInterface } from '../../utils/interfaces';
import { canvas, ctx } from '../../lib/ctx';


let hashlipsGiffer: any = null;


var dnaList = new Set();


const buildDir = "public/build";
const layersDir = "public/layers";

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const startCreating = async () => {

    // init values
    let layerConfigIndex = 0;
    let editionCount = 1;
    let failedCount = 0;
    let abstractedIndexes: number[] = [];


    for (
      let i = network == NETWORK.sol ? 0 : 1;
      i <= layerConfigurations[layerConfigurations.length - 1].growEditionSizeTo;
      i++
    ) {
      abstractedIndexes.push(i);
    }

    // shuffle indexes
    if (shuffleLayerConfigurations)
      abstractedIndexes = shuffle(abstractedIndexes);


    while (layerConfigIndex < layerConfigurations.length) {

      const layers = layersSetup(layerConfigurations[layerConfigIndex].layersOrder);


      while (
        editionCount <= layerConfigurations[layerConfigIndex].growEditionSizeTo
      ) {

        let newDna: string = createDna(layers);

        if (isDnaUnique(dnaList, newDna)) {

          let results: ConstructLayerInterface[] = constructLayerToDna(newDna, layers);
          let loadedElements: Promise<any>[] = [];


          results.forEach((layer) => {
            loadedElements.push(loadLayerImg(layer));
          });


          await Promise.all(loadedElements).then((renderObjectArray) => {

            //for debuging
            debugLogs ? console.log("Clearing canvas") : null;

            // clean rectangle
            ctx.clearRect(0, 0, format.width, format.height);

            if (gif.export) {
              hashlipsGiffer = new HashlipsGiffer(
                canvas,
                ctx,
                `${buildDir}/gifs/${abstractedIndexes[0]}.gif`,
                gif.repeat,
                gif.quality,
                gif.delay
              );
              hashlipsGiffer.start();
            }

            if (background.generate)
              drawBackground();


            renderObjectArray.forEach((renderObject, index) => {
              drawElement(
                renderObject,
                index,
                layerConfigurations[layerConfigIndex].layersOrder.length
              );

              if (gif.export)
                hashlipsGiffer.add();

            });

            if (gif.export) hashlipsGiffer.stop();


            debugLogs
              ? console.log("Editions left to create: ", abstractedIndexes)
              : null;

            saveImage(abstractedIndexes[0]);
            addMetadata(newDna, abstractedIndexes[0]);
            saveMetaDataSingleFile(abstractedIndexes[0]);

            console.log(`Created edition: ${abstractedIndexes[0]}, with DNA: ${sha1(newDna)}`);
          });

          dnaList.add(newDna);
          editionCount++;
          abstractedIndexes.shift();

        }
        else {
          console.log("DNA exists!");
          failedCount++;
          if (failedCount >= uniqueDnaTorrance) {
            console.log(
              `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].growEditionSizeTo} artworks!`
            );
            break;
          }
        }
      }

      layerConfigIndex++;
    }

    writeMetaData(JSON.stringify(metadataList, null, 2));


    console.log("############################")
    console.log("Done!!.....")
    console.log("############################")

  }

  // startCreating()

  // uploadFileToFirebase()

  // const analytics = getAnalytics(app);


  // await dbConnect();

  const user = new User({
    name: 'bob',
    email: "boblms@gmail.com",
    layers: [
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
            filename: 'yellow#1.png',
            path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbody%2FUntitled%231.png?alt=media&token=2a103dba-49c5-4111-aa4e-ddc834b83d9a"
          },
          {
            filename: 'yellow#1.png',
            path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbody%2FUntitled%231.png?alt=media&token=2a103dba-49c5-4111-aa4e-ddc834b83d9a",
          },
          {
            filename: 'yellow#1.png',
            path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbody%2FUntitled%231.png?alt=media&token=2a103dba-49c5-4111-aa4e-ddc834b83d9a",

          },
        ]
      },
      // {
      //   folderName: "eye",
      //   imgs: [
      //     "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FGreen%231.png?alt=media&token=6042142c-9c4f-4d03-8907-973414366dc9",
      //     "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FPink%231.png?alt=media&token=73c41f95-0e85-4908-a597-646561292309",
      //     "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FPurple%231.png?alt=media&token=a8d42354-b190-4741-803a-9614321ec9ff"
      //   ]
      // },
      // {
      //   folderName: "head",
      //   imgs: [
      //     "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fhead%2Fhead%231.png?alt=media&token=f73bd228-a41d-499b-a62f-255f16a8c297",
      //     "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fhead%2Fhead%232.png?alt=media&token=9c7f6f28-f977-42d6-b5b0-0462e09806bb",
      //     "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fhead%2Fhead%233.png?alt=media&token=79277e43-b839-4f0a-a148-5acc71280be4"
      //   ]
      // },
    ]
  });
  // const r = await user.save();









  res.status(200).json({ name: "hello" })
}







/**
 * uploadFileToFirebase
 * */

// TODO: 
//        - write each file has been create to firebase storeage and it's path to database

function uploadFileToFirebase(file: File) {

  // Create the file metadata
  const metadata = { contentType: 'image/jpeg' };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'build/');

  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          // console.log('Upload is paused');
          break;
        case 'running':
          // console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

        console.log('File available at', downloadURL);
      });
    }
  );

}



