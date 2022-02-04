import { mockDatabaseConnection } from "../../mockDatabase"
import { gCall } from "../../test-utils"
import * as deleteUtility from "../../../utility/delete"
import { SongModel } from "../../../models/Song"
import { Playlist, PlaylistModel } from "../../../models/Playlist"

const source = `    
mutation ($id: String!) {
    deletePlaylist(id: $id) {
        name
    }
}
`

jest.mock("../../../utility/delete")

const mockedDelete = deleteUtility.deleteImage as jest.Mock

describe("Song Resolver Test", () => {
    let conn: any
    beforeAll(async () => {
        conn = await mockDatabaseConnection()
    })

    afterAll(async () => {
        await conn.stop()
    })

    it("deletePlaylist Resolver Test", async () => {
        mockedDelete.mockReturnValue("https://test.com/images/test.jpeg")
        const { _id } = await new PlaylistModel({
            name: "Test Playlist",
            cover: "https://test.com/images/test.jpeg",
            songs: ["61f913680b570ee233f99392"],
        }).save()

        const response = await gCall({
            source,
            variableValues: {
                id: `${_id}`,
            },
        })

        expect(response).toEqual({
            data: {
                deletePlaylist: {
                    name: "Test Playlist",
                },
            },
        })
    })
})
