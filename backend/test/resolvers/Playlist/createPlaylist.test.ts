import { mockDatabaseConnection } from "../../mockDatabase"
import { gCall } from "../../test-utils"
import * as upload from "../../../utility/upload"
import { SongModel } from "../../../models/Song"

const source = `    
mutation createPlaylist($playlistData: PlaylistInput!) {
    createPlaylist(playlistData: $playlistData) {
      _id
      name
      cover
      songs {
        _id
      }
    }
  }
`

jest.mock("../../../utility/upload")

const mockedUpload = upload.uploadPhoto as jest.Mock

const mockFileLocations: Promise<string> = new Promise((resolve) =>
    resolve("https://test.com/images/testPlaylist.jpeg"),
)

describe("Song Resolver Test", () => {
    let conn: any
    beforeAll(async () => {
        conn = await mockDatabaseConnection()
    })

    afterAll(async () => {
        await conn.stop()
    })

    it("createPlaylist Resolver Test", async () => {
        mockedUpload.mockReturnValue(mockFileLocations)
        const { _id } = await new SongModel({
            title: "title",
            audio: "https://test.com/audio/test.mp3",
            image: "https://test.com/images/test.jpeg",
            artist: "album",
            album: "artist",
        }).save()

        const response = await gCall({
            source,
            variableValues: {
                playlistData: {
                    name: "Test Playlist",
                    coverSource: "cover",
                    songs: [`${_id}`],
                },
            },
        })

        expect(response).toMatchObject({
            data: {
                createPlaylist: {
                    name: "Test Playlist",
                    cover: "https://test.com/images/testPlaylist.jpeg",
                    songs: [{ _id: `${_id}` }],
                },
            },
        })
    })
})
