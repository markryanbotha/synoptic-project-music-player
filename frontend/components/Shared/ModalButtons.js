import { useRecoilValue } from "recoil"
import { currentTabAtom } from "../../utility"
import { UploadSong, CreatePlaylistButton } from ".."

const ModalButtons = (props) => {
    const currentTab = useRecoilValue(currentTabAtom)

    return currentTab === "songs" ? (
        <UploadSong {...props} />
    ) : (
        <CreatePlaylistButton {...props} />
    )
}

export default ModalButtons
