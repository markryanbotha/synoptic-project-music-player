import { gql } from "@apollo/client"

export const CREATE_SONG = gql`
    mutation createSong($songData: SongInput!) {
        createSong(songData: $songData) {
            title
            audio
            image
            artist
            album
        }
    }
`