import { read } from "jsmediatags-web"
import { toJpegBase64 } from "./toBase64"

export const getSongMetaData = (file) => {
    return new Promise((resolve) => {
        read(file, {
            onSuccess: async ({ tags }) => {
                if (!tags.album) {
                    tags.album = tags.title
                }

                const imageBase64 = toJpegBase64(tags.picture.data)

                resolve({
                    title: tags.title,
                    cover: {
                        image: imageBase64,
                        imageFormat: tags.picture.format,
                    },
                    artist: tags.artist,
                    album: tags.album,
                })
            },

            onError: (err) => {
                resolve({})
            },
        })
    })
}
