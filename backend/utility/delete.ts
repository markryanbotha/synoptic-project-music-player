import { S3 } from "aws-sdk"
import { DeleteObjectOutput } from "aws-sdk/clients/s3"
import "dotenv/config"

const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

const BUCKET_NAME = process.env.BUCKET_NAME || ""

export const deleteSong = async (
    audio: string,
    image: string,
): Promise<string> => {
    return new Promise(async (resolve) => {
        await deleteAudio(audio)
        await deleteImage(image)

        resolve(`Successfully deleted 
        audio:${audio}
        image:${image}`)
    })
}

const deleteAudio = async (
    audioSource: string,
): Promise<DeleteObjectOutput> => {
    const splitArray: Array<string> = audioSource.split("/")
    const key = splitArray[splitArray.length - 1]

    const params = {
        Key: `audio/${key}`,
        Bucket: BUCKET_NAME,
    }

    return await s3.deleteObject(params).promise()
}

export const deleteImage = async (
    imageSource: string,
): Promise<DeleteObjectOutput> => {
    const splitArray: Array<string> = imageSource.split("/")
    const key = splitArray[splitArray.length - 1]

    const params = {
        Key: `images/${key}`,
        Bucket: BUCKET_NAME,
    }

    return await s3.deleteObject(params).promise()
}
