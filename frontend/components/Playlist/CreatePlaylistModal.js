import { useEffect, useRef, useState } from "react"
import { Modal, Button, Typography, Box, IconButton } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import { useRecoilState, useSetRecoilState } from "recoil"
import { useForm } from "react-hook-form"
import {
    addSongsModalIsOpenAtom,
    createPlaylistModalIsOpenAtom,
    defaultImageToBase64,
} from "../../utility"
import { toJpegBase64 } from "../../utility"
import TextField from "../Shared/TextField"
import { AddSongsModal } from "./AddSongsModal"
import TemporaryAlert from "../Shared/TemporaryAlert"

const CreatePlaylistModal = () => {
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useRecoilState(
        createPlaylistModalIsOpenAtom,
    )
    const [alertOpen, setAlertOpen] = useState(false)
    const [playlistImage, setPlaylistImage] = useState(null)
    const setIsAddSongsModalOpen = useSetRecoilState(addSongsModalIsOpenAtom)
    const [playlistName, setPlaylistName] = useState(
        `Playlist ${Math.floor(Math.random() * 1000)}`,
    )

    const imageInputRef = useRef(null)
    const defaultImageRef = useRef(null)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm()

    const handleImageUpload = async (file) => {
        if (!file) {
            return
        }

        //Check if it's an image
        if (!file?.type.includes("image")) {
            setAlertOpen(true)
            setTimeout(() => {
                setAlertOpen(false)
            }, 2000)
            return
        }
        const buffer = await file.arrayBuffer()
        const base64 = toJpegBase64(buffer)
        setPlaylistImage(base64)
    }

    const handlePlaylistCreation = async ({ name }) => {
        if (!playlistImage) {
            setPlaylistImage(defaultImageToBase64(defaultImageRef.current))
        }

        setPlaylistName(name)

        setIsAddSongsModalOpen(true)
        setIsPlaylistModalOpen(false)
    }

    return (
        <>
            <TemporaryAlert open={alertOpen}>
                Please upload an image
            </TemporaryAlert>
            <Modal
                open={isPlaylistModalOpen}
                onClose={() => {
                    reset()
                    setPlaylistImage(null)
                    setIsPlaylistModalOpen(false)
                }}
                aria-labelledby="modal-playlist-details"
                aria-describedby="modal-fill-in-playlist-details"
            >
                <Box className="modal-details">
                    <Typography
                        id="modal-modal-title"
                        variant="h4"
                        component="h2"
                    >
                        Playlist Details
                    </Typography>
                    <form onSubmit={handleSubmit(handlePlaylistCreation)}>
                        {playlistImage ? (
                            <img src={playlistImage} />
                        ) : (
                            <img
                                src="/defaultPlaylist.png"
                                ref={defaultImageRef}
                            />
                        )}

                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => imageInputRef.current.click()}
                        >
                            <input
                                type="file"
                                ref={imageInputRef}
                                hidden
                                onChange={async () => {
                                    await handleImageUpload(
                                        imageInputRef.current.files[0],
                                    )
                                }}
                            />
                            <PhotoCamera />
                        </IconButton>
                        <TextField
                            id="name"
                            name="Playlist Name"
                            initialValue={playlistName}
                            errors={errors.name}
                            register={register}
                            setValue={setValue}
                        />

                        <Button type="submit" data-testid="create-playlist-modal-button">Create Playlist</Button>
                    </form>
                </Box>
            </Modal>
            <AddSongsModal
                playlistName={playlistName}
                playlistImage={playlistImage}
                setPlaylistImage={setPlaylistImage}
            />
        </>
    )
}

export default CreatePlaylistModal
