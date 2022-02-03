import { gql } from "@apollo/client"

export const GET_ALL_SONGS = gql`
    query getAllSongs {
        getAllSongs {
            _id
            audio
            image
            artist
            album
            title
        }
    }
`
