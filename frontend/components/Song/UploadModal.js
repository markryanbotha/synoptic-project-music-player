import { useEffect, useRef, useState } from "react"
import {
    Modal,
    Button,
    Typography,
    Box,
    IconButton,
    CircularProgress,
} from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import { useRecoilState, useSetRecoilState } from "recoil"
import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { uploadModalIsOpenAtom, uploadIsLoadingAtom } from "../../utility"
import { CREATE_SONG } from "../../graphql/createSong.js"
import { toJpegBase64, toMp3Base64 } from "../../utility"
import TextField from "../Shared/TextField"
import TemporaryAlert from "../Shared/TemporaryAlert"

const UploadModal = ({ audioFile, songDetails }) => {
    const [isModalOpen, setIsModalOpen] = useRecoilState(uploadModalIsOpenAtom)
    const setUploadIsLoading = useSetRecoilState(uploadIsLoadingAtom)
    const imageInputRef = useRef(null)
    const [image, setImage] = useState(songDetails?.cover?.image)
    const [alertOpen, setAlertOpen] = useState(false)

    const [uploadSongData, { loading }] = useMutation(CREATE_SONG)

    useEffect(() => {
        setImage(songDetails?.cover?.image)
    }, [songDetails?.cover])

    useEffect(() => {
        setUploadIsLoading(loading)
    }, [loading])

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
        setImage(base64)
    }

    const handleSongUpload = async ({ title, artist, album }) => {
        const buffer = await audioFile.arrayBuffer()
        const mp3Base64 = toMp3Base64(buffer)
        const songData = {
            title,
            audioSource: mp3Base64,
            imageSource: image,
            artist,
            album,
        }

        await uploadSongData({
            variables: { songData },
        })
        setIsModalOpen(false)
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={() => {
                reset()
                setIsModalOpen(false)
            }}
            aria-labelledby="modal-song-details"
            aria-describedby="modal-fill-in-song-details"
        >
            <Box className="modal-details">
                <TemporaryAlert open={alertOpen}>
                    Please upload an image
                </TemporaryAlert>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Song Details
                </Typography>
                <form onSubmit={handleSubmit(handleSongUpload)}>
                    <img src={image} />
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
                        id="title"
                        name="Title"
                        initialValue={songDetails.title}
                        errors={errors.title}
                        register={register}
                        setValue={setValue}
                    />

                    <TextField
                        id="artist"
                        name="Artist"
                        initialValue={songDetails.artist}
                        errors={errors.artist}
                        register={register}
                        setValue={setValue}
                    />

                    <TextField
                        id="album"
                        name="Album"
                        initialValue={songDetails.album}
                        errors={errors.album}
                        register={register}
                        setValue={setValue}
                    />

                    <Button type="submit">
                        {loading ? (
                            <CircularProgress size={30}></CircularProgress>
                        ) : (
                            "Upload"
                        )}
                    </Button>
                </form>
            </Box>
        </Modal>
    )
}

export default UploadModal
