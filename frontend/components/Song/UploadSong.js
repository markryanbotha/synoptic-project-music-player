import { useRef, useState } from "react"
import { getSongMetaData } from "../../utility"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { uploadIsLoadingAtom, uploadModalIsOpenAtom } from "../../utility"
import UploadModal from "./UploadModal"
import Button3D from "../Shared/Button3D"
import { TemporaryAlert } from ".."

const UploadSong = ({ open }) => {
    const inputRef = useRef(null)

    const loading = useRecoilValue(uploadIsLoadingAtom)
    const setIsModalOpen = useSetRecoilState(uploadModalIsOpenAtom)
    const [songDetails, setSongDetails] = useState({})
    const [alertOpen, setAlertOpen] = useState(false)

    const handleFileUpload = async (file) => {
        if (!file) {
            return
        }

        //Check if it's a valid audio file
        if (!file?.type.includes("audio")) {
            setAlertOpen(true)
            setTimeout(() => {
                setAlertOpen(false)
            }, 2000)
            return
        }

        setSongDetails(await getSongMetaData(file))

        setIsModalOpen(true)
    }

    return (
        <div className={`modal-button-container drawer ${open ? "open" : ""}`}>
            <Button3D
                className="modal-button"
                onClick={() => inputRef.current.click()}
            >
                {loading ? "Uploading..." : "Upload Song"}
                <input
                    data-testid="file-input"
                    type="file"
                    ref={inputRef}
                    hidden
                    onChange={async ({ target: { files } }) => {
                        await handleFileUpload(files[0])
                    }}
                />
            </Button3D>
            <UploadModal
                songDetails={songDetails}
                audioFile={inputRef.current?.files[0]}
            />
            <TemporaryAlert open={alertOpen}>
                Please upload an audio file
            </TemporaryAlert>
        </div>
    )
}

export default UploadSong
