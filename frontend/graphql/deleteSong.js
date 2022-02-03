import { gql } from "@apollo/client"

export const DELETE_SONG = gql`
    mutation ($id: String!) {
        deleteSong(id: $id) {
            title
        }
    }
`
