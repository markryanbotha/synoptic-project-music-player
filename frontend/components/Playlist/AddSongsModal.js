import { useEffect } from "react"
import { Modal, Typography, CircularProgress, Button } from "@mui/material"
import { Button3D } from ".."
import { ModalSongList } from "./AddSongsModalSongsList"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
    addSongsModalIsOpenAtom,
    allPlaylistsAtom,
    selectedSongsToAddToPlaylistAtom,
    uploadIsLoadingAtom,
} from "../../utility"
import { CREATE_PLAYLIST } from "../../graphql"
import { useMutation } from "@apollo/client"
import { Box } from "@mui/system"

export const AddSongsModal = ({
    playlistName,
    playlistImage,
    setPlaylistImage,
}) => {
    const [isModalOpen, setIsModalOpen] = useRecoilState(
        addSongsModalIsOpenAtom,
    )
    const selectedSongs = useRecoilValue(selectedSongsToAddToPlaylistAtom)
    const { refetch } = useRecoilValue(allPlaylistsAtom)
    const setUploadIsLoading = useSetRecoilState(uploadIsLoadingAtom)

    const [createPlaylist, { loading, error, data }] =
        useMutation(CREATE_PLAYLIST)

    useEffect(() => {
        setUploadIsLoading(loading)
    }, [loading])

    const handlePlaylistCreation = async () => {
        const playlistData = {
            name: playlistName,
            coverSource: playlistImage,
            songs: [...selectedSongs],
        }

        await createPlaylist({
            variables: { playlistData },
        })

        selectedSongs.clear()
        setPlaylistImage(null)
        refetch()
        setIsModalOpen(false)
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={() => {
                setPlaylistImage(null)
                setIsModalOpen(false)
            }}
            aria-labelledby="modal-playlist-details"
            aria-describedby="modal-fill-in-playlist-details"
        >
            <Box className="modal-details full-page">
                <div className="add-songs-modal-header">
                    <Typography
                        id="modal-modal-title"
                        variant="h4"
                        component="h2"
                    >
                        Add Songs
                    </Typography>
                    <div className="create-playlist-button">
                        <Button
                            onClick={handlePlaylistCreation}
                            disabled={selectedSongs.length === 0}
                        >
                            {loading ? (
                                <CircularProgress size={30}></CircularProgress>
                            ) : (
                                "Create Playlist"
                            )}
                        </Button>
                    </div>
                </div>
                <ModalSongList />
            </Box>
        </Modal>
    )
}
