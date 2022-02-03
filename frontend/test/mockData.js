import { GET_ALL_PLAYLISTS, GET_ALL_SONGS } from "../graphql"

const getAllSongsData = {
    getAllSongs: [
        {
            __typename: "Song",
            _id: "61f913680b570ee233f99392",
            audio: "https://test/audio/test.mp3",
            image: "https://test.com/images/test.jpeg",
            artist: "Test Song Artist",
            album: "Test Song Album",
            title: "Test Song Title",
        },
        {
            __typename: "Song",
            _id: "61f915ad0b570ee233f993a6",
            audio: "https://mock/audio/mock.mp3",
            image: "https://mock.com/images/mock.jpeg",
            artist: "Mock Song Artist",
            album: "Mock Song Album",
            title: "Mock Song Title",
        },
    ],
}

const getALlPlaylistData = {
    getAllPlaylists: [
        {
            __typename: "Playlist",
            _id: "61fa6c110f30720a8d215a24",
            name: "Test Playlist",
            cover: "https://test.com/images/test.jpeg",
        },
        {
            __typename: "Playlist",
            _id: "61fa6df1453b645712a752cb",
            name: "Mock Playlist",
            cover: "https://mock.com/images/mock.jpeg",
        },
    ],
}

export default [
    {
        request: {
            query: GET_ALL_SONGS,
        },
        result: {
            data: getAllSongsData,
        },
    },
    {
        request: {
            query: GET_ALL_PLAYLISTS,
        },
        result: {
            data: getALlPlaylistData,
        },
    },
]
