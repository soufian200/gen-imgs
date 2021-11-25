import { NextApiRequest, NextApiResponse } from "next";
import ArtGenerator from "../../lib/classes/ArtGenerator";
import generateFormSchema from "../../lib/schemas/generateFormSchema";


type Data = {
    msg?: string
    images?: Buffer[]
    metadataList?: string
    jsonFiles?: string[]
    error?: string

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {


    const {
        layers,
        width,
        height,
        size,
        description,
        collectionName,
        isShuffle
    } = req.body;



    generateFormSchema.validate({
        width,
        height,
        size,
        collectionName,
        description,
        isShuffle
    })
        .then(async (value) => {

            const {
                description,
                collectionName,
                size,
                height,
                width,
                isShuffle
            } = value;

            try {


                const artGenerator = new ArtGenerator(height, width, collectionName, description, layers, isShuffle)
                const { images, metadataList, jsonFiles } = await artGenerator.generate(size)
                const msg = images.length < size
                    ? `You need more layers or elements to grow your edition to ${size} artworks!`
                    : `Generating ${size} artworks  Successfully `;


                return res.json({ msg, images, metadataList, jsonFiles })
            } catch (err) {

                return res.json({ error: "Something went wrong!." })
            }

        })
        .catch(function (err) {

            res.status(400).json({
                error: (err.errors[0]) as string,
            })
        });



}