import { render } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { MockedProvider } from "@apollo/client/testing"
import mocks from "./mockData"
import { InitializeData } from "../components"

const wrapper = ({ children }) => {
    return (
        <MockedProvider mocks={mocks} addTypename={false}>
            <RecoilRoot>
                <InitializeData />
                {children}
            </RecoilRoot>
        </MockedProvider>
    )
}

const customRender = (ui, options) => render(ui, { wrapper, ...options })

export * from "@testing-library/react"
export { customRender as render }
