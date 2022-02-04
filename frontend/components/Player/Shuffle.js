import { useRecoilState, useRecoilValue } from "recoil"
import {
    allPlaylistsAtom,
    allSongsAtom,
    playbackQueueAtom,
    selectedPlaylistData,
    shouldShuffleAtom,
} from "../../utility"
import { BsShuffle } from "react-icons/bs"

Array.prototype.swapItems = function (a, b) {
    this[a] = this.splice(b, 1, this[a])[0]
    return this
}

const shuffleAlgorithm = (songList) => {
    // Need this intermediate array due to strict mode
    const randomIndexArray = []
    for (let i = 0; i < songList.length; i++) {
        randomIndexArray.push(i)
    }

    for (let i = songList.length - 1; i--; i > 0) {
        const randomNumber = Math.round(Math.random() * i)
        randomIndexArray.swapItems(i, randomNumber)
    }

    const shuffledList = []
    for (const i of randomIndexArray) {
        shuffledList.push(songList[i])
    }

    return shuffledList
}

export const Shuffle = ({ setCurrentSong, index }) => {
    const [playbackQueue, setPlaybackQueue] = useRecoilState(playbackQueueAtom)
    const [shouldShuffle, setShouldShuffle] = useRecoilState(shouldShuffleAtom)
    const originalQueueData = useRecoilValue(allSongsAtom)
    const originalPlaylistData = useRecoilValue(selectedPlaylistData)

    const handleShuffle = () => {
        setShouldShuffle(!shouldShuffle)
        if (!shouldShuffle) {
            const shuffledQueue = shuffleAlgorithm(playbackQueue.allSongs)
            setPlaybackQueue({ ...playbackQueue, allSongs: shuffledQueue })
        } else {
            if (playbackQueue?.playlistName) {
                setPlaybackQueue(originalPlaylistData)
            } else {
                setPlaybackQueue(originalQueueData)
            }
        }
        setCurrentSong({ ...playbackQueue.allSongs[0], index: 0 })
    }

    return (
        <BsShuffle
            onClick={handleShuffle}
            className={`${shouldShuffle ? "shuffle" : ""}`}
        />
    )
}
