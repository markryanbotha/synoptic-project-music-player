import { render, act, fireEvent } from "../test-utils"
import { SideDrawer } from "../../components"

describe("Library Integration Test", () => {
    const promise = Promise.resolve()

    it("renders title", async () => {
        const { getByText } = render(<SideDrawer open={true} />)
        await act(() => promise)

        getByText(/Currently Playing/i)
    })

    it("renders tabs", async () => {
        const { getByText } = render(<SideDrawer open={true} />)
        await act(() => promise)

        getByText(/All Songs/i)
        getByText(/All Playlists/i)
    })

    it("renders song list", async () => {
        const { getByText } = render(<SideDrawer open={true} />)
        await act(() => promise)

        getByText(/Test Song Title/i)
        getByText(/Test Song Artist/i)
        getByText(/Mock Song Title/i)
        getByText(/Mock Song Artist/i)
    })

    it("renders playlist list after clicking playlist tab", async () => {
        const { getByText } = render(<SideDrawer open={true} />)
        await act(() => promise)

        const playlistTab = getByText(/All Playlists/i)
        fireEvent.click(playlistTab)

        getByText(/Test Playlist/i)
    })

    it("filters playlist list after searching", async () => {
        const { getByText, getByRole, queryByText } = render(
            <SideDrawer open={true} />,
        )
        await act(() => promise)

        getByText(/Test Song Title/i)
        getByText(/Mock Song Title/i)

        const searchBox = getByRole("textbox")
        fireEvent.change(searchBox, { target: { value: "Test" } })
        const searchButton = getByRole("button", {
            name: /search/i,
        })
        fireEvent.click(searchButton)

        getByText(/Test Song Title/i)
        expect(queryByText(/Mock Song Title/i)).not.toBeInTheDocument()
    })
})
