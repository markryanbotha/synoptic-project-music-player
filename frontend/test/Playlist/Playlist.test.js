import { render, act, fireEvent } from "../test-utils"
import { CreatePlaylistButton } from "../../components"

describe("Playlist Integration Test", () => {
    const promise = Promise.resolve()

    it("opens modal when button is clicked", async () => {
        const { getByText, getByRole, getByTestId } = render(
            <CreatePlaylistButton open={true} />,
        )
        await act(() => promise)

        const createPlaylistButton = getByRole("button", {
            name: /Create Playlist/i,
        })
        fireEvent.click(createPlaylistButton)

        getByText(/Playlist Details/i)
    })
})
