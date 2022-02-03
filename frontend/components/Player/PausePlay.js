const { useRecoilState } = require("recoil")
const { isSongPlayingAtom } = require("../../utility")
import { useEffect } from "react"
import { FaPlay, FaPause } from "react-icons/fa"

export const PausePlay = ({ currentSongRef, currentSong, shouldPlay }) => {
    const [isPlaying, setIsPlaying] = useRecoilState(isSongPlayingAtom)

    // This starts playing the song whenever the current song is updated
    useEffect(() => {
        if (shouldPlay && isPlaying) {
            currentSongRef.current.play()
        }
    }, [currentSong])

    const songPlayerHandler = () => {
        setIsPlaying(!isPlaying)
        if (isPlaying) {
            currentSongRef.current.pause()
        } else {
            currentSongRef.current.play()
        }
    }

    return isPlaying ? (
        <FaPause onClick={songPlayerHandler} />
    ) : (
        <FaPlay onClick={songPlayerHandler} />
    )
}
