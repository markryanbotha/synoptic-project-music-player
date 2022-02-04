import { render, act, fireEvent } from "../test-utils"
import { Player } from "../../components"

describe("Player Integration Test", () => {
    const promise = Promise.resolve()

    it("renders volume input", async () => {
        const { getByLabelText } = render(<Player />)
        await act(() => promise)

        getByLabelText("volume-indicator")
    })

    it("renders timeline", async () => {
        const { getByLabelText } = render(<Player />)
        await act(() => promise)

        getByLabelText("time-indicator")
    })

    it("renders song title", async () => {
        const { findByText } = render(<Player />)
        await act(() => promise)

        await findByText(/Test Song Title/i)
    })

    it("goes to correct song when skip buttons are pressed", async () => {
        const { findByText, getByTestId } = render(<Player />)
        await act(() => promise)

        await findByText(/Test Song Title/i)

        const forwardSkipButton = getByTestId("forward-skip")
        const backwardSkipButton = getByTestId("backward-skip")
        fireEvent.click(forwardSkipButton)

        await findByText(/Mock Song Title/i)

        fireEvent.click(backwardSkipButton)

        await findByText(/Test Song Title/i)
    })
})
