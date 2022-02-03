import { mockDatabaseConnection } from "../../mockDatabase"
import { gCall } from "../../test-utils"
import { SongModel } from "../../../models/Song"

const source = `
query getAllSongs {
    getAllSongs {
        _id
        audio
        image
        artist
        album
        title
    }
}
`

describe("Song Resolver Test", () => {
    let conn: any
    beforeAll(async () => {
        conn = await mockDatabaseConnection()
    })

    beforeEach(() => {})

    afterAll(async () => {
        await conn.stop()
    })

    it("getAllSongs Resolver Test", async () => {
        await new SongModel({
            title: "title",
            audio: "https://test.com/audio/test.mp3",
            image: "https://test.com/images/test.jpeg",
            artist: "album",
            album: "artist",
        }).save()

        const response = await gCall({
            source,
        })

        expect(response).toMatchObject({
            data: {
                getAllSongs: [
                    {
                        _id: expect.stringMatching(".*"),
                        title: "title",
                        audio: "https://test.com/audio/test.mp3",
                        image: "https://test.com/images/test.jpeg",
                        artist: "album",
                        album: "artist",
                    },
                ],
            },
        })
    })
})
