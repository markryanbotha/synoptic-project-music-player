import { atom } from "recoil"

export const isSongPlayingAtom = atom({
    key: "isSongPlaying",
    default: false,
})

export const currentSongPlayingAtom = atom({
    key: "currentSongPlaying",
    default: { index: 0 },
})

export const currentTimeAtom = atom({
    key: "currentTimeOfSong",
    default: 0,
})

export const currentTabAtom = atom({
    key: "currentTab",
    default: "songs",
})

export const uploadIsLoadingAtom = atom({
    key: "uploadIsLoading",
    default: false,
})

export const shouldShuffleAtom = atom({
    key: "shouldShuffle",
    default: false,
})

export const deleteIsLoadingAtom = atom({
    key: "deleteIsLoading",
    default: false,
})
