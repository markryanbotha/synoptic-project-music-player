import { atom } from "recoil"

export const allPlaylistsAtom = atom({
    key: "allPlaylists",
    default: {},
})

export const allSongsAtom = atom({
    key: "allSongs",
    default: {},
})

export const playbackQueueAtom = atom({
    key: "playbackQueue",
    default: {},
})

export const selectedSongsToAddToPlaylistAtom = atom({
    key: "selectedSongsToAddToPlaylist",
    default: new Set(),
})

export const selectedPlaylistData = atom({
    key: "selectedPlaylist",
    default: {},
})
