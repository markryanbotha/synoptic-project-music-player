import { atom } from "recoil"

export const uploadModalIsOpenAtom = atom({
    key: "uploadModalIsOpen",
    default: false,
})

export const createPlaylistModalIsOpenAtom = atom({
    key: "createPlaylistModalIsOpen",
    default: false,
})

export const addSongsModalIsOpenAtom = atom({
    key: "addSongsModalIsOpen",
    default: false,
})
