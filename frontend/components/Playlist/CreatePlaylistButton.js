import { useRef, useState } from "react"
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil"
import { createPlaylistModalIsOpenAtom } from "../../utility"
import Button3D from "../Shared/Button3D"
import CreatePlaylistModal from "./CreatePlaylistModal"

const CreatePlaylist = ({ open }) => {
    const setIsModalOpen = useSetRecoilState(createPlaylistModalIsOpenAtom)

    return (
        <div className={`modal-button-container drawer ${open ? "open" : ""}`}>
            <Button3D
                className="modal-button"
                onClick={() => setIsModalOpen(true)}
            >
                Create Playlist
            </Button3D>
            <CreatePlaylistModal />
        </div>
    )
}

export default CreatePlaylist
