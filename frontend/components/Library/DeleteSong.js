import { AiOutlineDelete } from "react-icons/ai"
import { useMutation } from "@apollo/client"
import { DELETE_SONG } from "../../graphql"
import { useEffect, useState } from "react"
import { allSongsAtom, deleteIsLoadingAtom } from "../../utility"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Button, CircularProgress, Modal } from "@mui/material"
import { Box } from "@mui/system"

const DeleteSong = ({ id, title }) => {
    const [deleteSong, { loading }] = useMutation(DELETE_SONG)
    const setDeleteIsLoading = useSetRecoilState(deleteIsLoadingAtom)
    const { refetch } = useRecoilValue(allSongsAtom)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    useEffect(() => {
        setDeleteIsLoading(loading)
    }, [loading])

    const handleOnClick = () => {
        setModalIsOpen(true)
    }

    const handleDeleteSong = async () => {
        await deleteSong({ variables: { id } })
        refetch()
        setModalIsOpen(false)
    }

    return (
        <>
            <div onClick={handleOnClick}>
                <AiOutlineDelete />
            </div>
            <Modal
                open={modalIsOpen}
                onClose={() => {
                    setModalIsOpen(false)
                }}
                aria-labelledby="modal-delete-song"
            >
                <Box className="modal-details">
                    <h3>
                        Are you sure you want to delete <b>{title}</b>
                    </h3>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Button
                            onClick={handleDeleteSong}
                            style={{ width: "30%", left: "35%" }}
                        >
                            Delete
                        </Button>
                    )}
                </Box>
            </Modal>
        </>
    )
}

export default DeleteSong
