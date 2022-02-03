import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
    currentSongPlayingAtom,
    currentTimeAtom,
    playbackQueueAtom,
} from "../../utility"
import { useEffect, useRef, useState } from "react"
import { PausePlay } from "./PausePlay"
import { SkipButton } from "./SkipButton"
import { TrackTimeline } from "./TrackTimeline"
import { VolumeSlider } from "./Volume"
import { Shuffle } from "./Shuffle"

const Player = () => {
    const currentSongRef = useRef(null)
    const [currentSong, setCurrentSong] = useRecoilState(currentSongPlayingAtom)
    const setCurrentTime = useSetRecoilState(currentTimeAtom)
    const { allSongs } = useRecoilValue(playbackQueueAtom)

    const handleTimeUpdate = (event) => {
        setCurrentTime(event.target.currentTime)
    }

    const handleSongEnd = () => {
        if (currentSong.index === allSongs.length - 1) {
            setCurrentSong({
                ...allSongs[0],
                index: 0,
            })
        } else {
            setCurrentSong({
                ...allSongs[currentSong.index + 1],
                index: currentSong.index + 1,
            })
        }
    }

    // Wait for user to interact with the player before playing the song
    const [shouldPlay, setShouldPlay] = useState(false)

    return (
        <div className="player" onClick={() => setShouldPlay(true)}>
            <TrackTimeline currentSong={currentSongRef.current} />
            <div className="player-controls">
                <SkipButton
                    direction="backward"
                    setCurrentSong={setCurrentSong}
                    index={currentSong.index}
                />
                <PausePlay
                    currentSongRef={currentSongRef}
                    currentSong={currentSong}
                    shouldPlay={shouldPlay}
                />
                <SkipButton
                    direction="forward"
                    setCurrentSong={setCurrentSong}
                    index={currentSong.index}
                />
                <Shuffle
                    setCurrentSong={setCurrentSong}
                    index={currentSong.index}
                />
                <audio
                    src={currentSong.audio}
                    ref={currentSongRef}
                    onLoadedMetadata={handleTimeUpdate}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleSongEnd}
                />
                <VolumeSlider currentSong={currentSongRef.current} />
            </div>
        </div>
    )
}

export default Player
