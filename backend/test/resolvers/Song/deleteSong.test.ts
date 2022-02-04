import { mockDatabaseConnection } from "../../mockDatabase"
import { gCall } from "../../test-utils"
import * as deleteUtility from "../../../utility/delete"
import { SongModel } from "../../../models/Song"

const source = `    
mutation ($id: String!) {
    deleteSong(id: $id) {
        title
    }
}
`

jest.mock("../../../utility/delete")

const mockedDelete = deleteUtility.deleteSong as jest.Mock

describe("Song Resolver Test", () => {
    let conn: any
    beforeAll(async () => {
        conn = await mockDatabaseConnection()
    })

    afterAll(async () => {
        await conn.stop()
    })

    it("deleteSong Resolver Test", async () => {
        mockedDelete.mockReturnValue("https://test.com/images/test.jpeg")
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
                id: `${_id}`,
            },
        })

        expect(response).toEqual({
            data: {
                deleteSong: {
                    title: "title",
                },
            },
        })
    })
})
