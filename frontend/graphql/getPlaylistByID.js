import { gql } from "@apollo/client"

export const GET_PLAYLIST_BY_ID = gql`
    query getPlaylistByID($id: String!) {
        getPlaylistByID(id: $id) {
            _id
            cover
            name
            songs {
                _id
                title
                audio
                image
                artist
                album
            }
        }
    }
`
