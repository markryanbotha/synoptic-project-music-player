import { S3 } from "aws-sdk"
import { v4 } from "uuid"
import "dotenv/config"

const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

const BUCKET_NAME = process.env.BUCKET_NAME || ""

export interface FileLocations {
    audio: string
    image: string
}

export const uploadSong = async (
    audioBase64: string,
    imageBase64: string,
): Promise<FileLocations> => {
    return new Promise(async (resolve, reject) => {
        const id = v4()
        const audio = await uploadAudio(audioBase64, id)
        const image = await uploadPhoto(imageBase64, id)
        resolve({
            audio,
            image,
        })
    })
}

const uploadAudio = async (base64: string, id: string): Promise<string> => {
    const buffer = Buffer.from(
        base64.replace(/^data:audio\/\w+;base64,/, ""),
        "base64",
    )

    const fileType = base64.split(";")[0].split("/")[1]

    const params = {
        Key: `audio/${id}.${fileType}`,
        Bucket: BUCKET_NAME,
        Body: buffer,
        ContentEncoding: "base64",
        ContentType: `audio/${fileType}`,
        ACL: "public-read",
    }

    return (await s3.upload(params).promise()).Location
}

export const uploadPhoto = async (
    base64: string,
    id: string = "",
): Promise<string> => {
    if (id === "") {
        id = v4()
    }
    
    const file = Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64",
    )
    const fileType = base64.split(";")[0].split("/")[1]

    const params = {
        Key: `images/${id}.${fileType}`,
        Bucket: BUCKET_NAME,
        Body: file,
        ContentEncoding: "base64",
        ContentType: `image/${fileType}`,
        ACL: "public-read",
    }

    return (await s3.upload(params).promise()).Location
}
