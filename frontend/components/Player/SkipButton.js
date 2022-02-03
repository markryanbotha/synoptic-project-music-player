import { useRecoilValue } from "recoil"
import { playbackQueueAtom } from "../../utility"
import { BsSkipStartFill, BsFillSkipEndFill } from "react-icons/bs"

export const SkipButton = ({ direction, setCurrentSong, index }) => {
    const { allSongs } = useRecoilValue(playbackQueueAtom)
    let nextIndex = index

    const handleSkip = () => {
        // Play the next song in the list, if it's the last song, then reset index to beginning of the list
        if (direction === "forward") {
            if (index !== allSongs.length - 1) {
                ++nextIndex
            } else {
                nextIndex = 0
            }
            // Play the previous song in the list, if you are at the start, then reset index to end of the list
        } else {
            if (index !== 0) {
                --nextIndex
            } else {
                nextIndex = allSongs.length - 1
            }
        }

        setCurrentSong({
            ...allSongs[nextIndex],
            index: nextIndex,
        })
    }

    return direction === "forward" ? (
        <BsFillSkipEndFill onClick={handleSkip} />
    ) : (
        <BsSkipStartFill onClick={handleSkip} />
    )
}
