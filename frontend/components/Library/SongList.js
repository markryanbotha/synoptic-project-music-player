import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
    allSongsAtom,
    currentSongPlayingAtom,
    playbackQueueAtom,
    shouldShuffleAtom,
} from "../../utility"
import Image from "next/image"
import { Button, CircularProgress, TextField } from "@mui/material"
import { useState } from "react"
import DeleteSong from "./DeleteSong"

const Song = ({
    _id,
    title,
    audio,
    image,
    artist,
    album,
    index,
    ...playback
}) => {
    const [currentSong, setCurrentSong] = useRecoilState(currentSongPlayingAtom)
    const allSongsData = useRecoilValue(allSongsAtom)
    const [playbackQueue, setPlaybackQueue] = useRecoilState(playbackQueueAtom)
    const setShouldShuffle = useSetRecoilState(shouldShuffleAtom)

    const handleOnClick = () => {
        if (!playback.isPlaybackTab && playbackQueue?.playlistName) {
            setPlaybackQueue(allSongsData)
        }
        setCurrentSong({ _id, title, audio, image, artist, album, index })
        setShouldShuffle(false)
    }

    const isCurrentPlayingSong = _id === currentSong?._id

    return (
        <div className={`library-item ${isCurrentPlayingSong ? "active" : ""}`}>
            <div className="image" onClick={handleOnClick}>
                <Image
                    src={image}
                    alt={`${title} cover image`}
                    layout="responsive"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    priority={true}
                />
            </div>
            <div className="item-info" onClick={handleOnClick}>
                <h3>{title}</h3>
                <h4>{artist}</h4>
            </div>
            <DeleteSong id={_id || ""} title={title || ""} />
        </div>
    )
}

export const SongList = () => {
    const { loading, allSongs } = useRecoilValue(allSongsAtom)
    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("")

    if (!allSongs) {
        return null
    }

    if (loading) {
        return <CircularProgress />
    }

    const getSearch = (e) => {
        e.preventDefault()
        setQuery(search)
    }

    const songsAfterSearch = allSongs.filter(
        (obj) =>
            obj["title"].toLowerCase().includes(query.toLowerCase()) ||
            obj["artist"].toLowerCase().includes(query.toLowerCase()),
    )

    return (
        <>
            <form onSubmit={(e) => getSearch(e)} className="search">
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                    variant="standard"
                />
                <Button type="submit" className="search-button">
                    Search
                </Button>
            </form>
            {songsAfterSearch.map((songData, index) => (
                <Song key={songData._id} index={index} {...songData} />
            ))}
        </>
    )
}

export const PlaybackList = () => {
    const { loading, allSongs } = useRecoilValue(playbackQueueAtom)
    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("")

    if (!allSongs) {
        return null
    }

    if (loading) {
        return <CircularProgress />
    }

    const getSearch = (e) => {
        e.preventDefault()
        setQuery(search)
    }

    const songsAfterSearch = allSongs.filter(
        (obj) =>
            obj["title"].toLowerCase().includes(query.toLowerCase()) ||
            obj["artist"].toLowerCase().includes(query.toLowerCase()),
    )
    return (
        <>
            <form onSubmit={(e) => getSearch(e)} className="search">
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                    variant="standard"
                />
                <Button type="submit" className="search-button">
                    Search
                </Button>
            </form>
            {songsAfterSearch.map((songData, index) => (
                <Song
                    key={songData._id}
                    index={index}
                    {...songData}
                    isPlaybackTab
                />
            ))}
        </>
    )
}
