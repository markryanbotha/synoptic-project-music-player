import { render, act, fireEvent } from "../test-utils"
import { UploadSong } from "../../components"
import { waitFor } from "@testing-library/react"

describe("Song Integration Test", () => {
    const promise = Promise.resolve()

    let file

    beforeEach(() => {
        file = new File(["(⌐□_□)"], "test.jpeg", { type: "image/jpeg" })
    })

    it("opens modal when button is clicked and verifies it's an audio file", async () => {
        const { getByText, getByRole, getByTestId } = render(
            <UploadSong open={true} />,
        )
        await act(() => promise)

        const uploadSongButton = getByRole("button", {
            name: /Upload Song/i,
        })
        fireEvent.click(uploadSongButton)
        const fileInput = getByTestId("file-input")
        await waitFor(() => {
            fireEvent.change(fileInput, {
                target: { files: [file] },
            })
        })

        getByText(/Please upload an audio file/i)
    })
})
