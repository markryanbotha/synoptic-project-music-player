import { gql } from "@apollo/client"

export const GET_ALL_PLAYLISTS = gql`
    query getAllPlaylist {
        getAllPlaylists {
            _id
            name
            cover
        }
    }
`
