import { gql } from "@apollo/client"

export const DELETE_PLAYLIST = gql`
    mutation ($id: String!) {
        deletePlaylist(id: $id) {
            name
        }
    }
`
