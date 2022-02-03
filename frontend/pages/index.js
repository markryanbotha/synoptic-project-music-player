import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    ApolloLink,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import {
    Record,
    SideDrawer,
    Button3D,
    Player,
    ModalButtons,
    InitializeData,
} from "../components"
import { RecoilRoot } from "recoil"
import { useState } from "react"

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        )
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
})

const link = ApolloLink.from([errorLink, httpLink])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})

export default function Home() {
    const [open, setOpen] = useState(false)

    return (
        <ApolloProvider client={client}>
            <RecoilRoot>
                <InitializeData />
                <div className="home-container">
                    <h1 className="title">Music Player</h1>
                    <Button3D
                        className="open-drawer-button"
                        onClick={() => setOpen(!open)}
                    >
                        Open
                    </Button3D>
                    <Record />
                    <Player />
                </div>
                <SideDrawer open={open} />
                <ModalButtons open={open} />
            </RecoilRoot>
        </ApolloProvider>
    )
}
