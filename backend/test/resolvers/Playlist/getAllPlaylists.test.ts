import { mockDatabaseConnection } from "../../mockDatabase"
import { gCall } from "../../test-utils"
// import * as upload from "../../../utility/upload"
import { SongModel } from "../../../models/Song"
import { PlaylistModel } from "../../../models/Playlist"

const source = `    
query getAllPlaylist {
    getAllPlaylists {
      _id
      name
      cover
      songs {
        title
      }
    }
  }
`



describe("Playlist Resolver Test", () => {
    let conn: any
    beforeAll(async () => {
        conn = await mockDatabaseConnection()
    })

    afterAll(async () => {
        await conn.stop()
    })

    it("getAllPlaylists Resolver Test", async () => {
        const { _id } = await new SongModel({
            title: "title",
            audio: "https://test.com/audio/test.mp3",
            image: "https://test.com/images/test.jpeg",
            artist: "album",
            album: "artist",
        }).save()

        await new PlaylistModel({
            name: "Test Playlist",
            cover: "https://test.com/images/testPlaylist.jpeg",
            songs: [`${_id}`],
        }).save()

        const response = await gCall({
            source,
        })

        expect(response).toMatchObject({
            data: {
                getAllPlaylists: [
                    {
                        _id: expect.stringMatching(".*"),
                        name: "Test Playlist",
                        cover: "https://test.com/images/testPlaylist.jpeg",
                        songs: [
                            {
                                title: "title",
                            },
                        ],
                    },
                ],
            },
        })
    })
})
