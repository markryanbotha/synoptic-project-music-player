import { mockDatabaseConnection } from "../../mockDatabase"
import { gCall } from "../../test-utils"
import * as upload from "../../../utility/upload"

const source = `    
mutation createSong($songData: SongInput!) {
    createSong(songData: $songData) {
        title
        audio
        image
        artist
        album
    }
}
`

jest.mock("../../../utility/upload")

const mockedUpload = upload.uploadSong as jest.Mock

const mockFileLocations: Promise<upload.FileLocations> = new Promise(
    (resolve) =>
        resolve({
            audio: "https://test.com/audio/test.mp3",
            image: "https://test.com/images/test.jpeg",
        }),
)

describe("Song Resolver Test", () => {
    let conn: any
    beforeAll(async () => {
        conn = await mockDatabaseConnection()
    })

    afterAll(async () => {
        await conn.stop()
    })

    it("createSong Resolver Test", async () => {
        mockedUpload.mockReturnValue(mockFileLocations)
        const response = await gCall({
            source,
            variableValues: {
                songData: {
                    title: "title",
                    audioSource: "source",
                    imageSource: "cover",
                    artist: "album",
                    album: "artist",
                },
            },
        })

        expect(response).toEqual({
            data: {
                createSong: {
                    title: "title",
                    audio: "https://test.com/audio/test.mp3",
                    image: "https://test.com/images/test.jpeg",
                    artist: "album",
                    album: "artist",
                },
            },
        })
    })
})
