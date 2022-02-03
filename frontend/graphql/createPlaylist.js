import { gql } from "@apollo/client"

export const CREATE_PLAYLIST = gql`
    mutation createPlaylist($playlistData: PlaylistInput!) {
        createPlaylist(playlistData: $playlistData) {
            _id
        }
    }
`
