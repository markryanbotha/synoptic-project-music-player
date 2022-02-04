import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
    allPlaylistsAtom,
    currentSongPlayingAtom,
    currentTabAtom,
    playbackQueueAtom,
    selectedPlaylistData,
} from "../../utility"
import Image from "next/image"
import { useLazyQuery } from "@apollo/client"
import { GET_PLAYLIST_BY_ID } from "../../graphql"
import { useEffect, useState } from "react"
import { CircularProgress, TextField, Button } from "@mui/material"
import DeletePlaylist from "./DeletePlaylist"

const Playlist = ({ _id, name, cover }) => {
    const [getPlaylistData, { loading, error, data, refetch }] =
        useLazyQuery(GET_PLAYLIST_BY_ID)
    const [playbackData, setPlaybackData] = useRecoilState(playbackQueueAtom)
    const setCurrentTabAtom = useSetRecoilState(currentTabAtom)
    const setCurrentSong = useSetRecoilState(currentSongPlayingAtom)
    const setSelectedPlaylistAtom = useSetRecoilState(selectedPlaylistData)

    useEffect(() => {
        if (data) {
            setSelectedPlaylistAtom({
                playlistID: _id,
                playlistName: name,
                loading,
                error,
                refetch,
                allSongs: data.getPlaylistByID.songs,
            })

            setPlaybackData({
                playlistID: _id,
                playlistName: name,
                loading,
                error,
                refetch,
                allSongs: data.getPlaylistByID.songs,
            })

            setCurrentSong({
                ...data.getPlaylistByID.songs[0],
                audio: data.getPlaylistByID.songs[0]?.audio,
                index: 0,
            })
        }
    }, [data])

    const handleOnClick = async () => {
        await getPlaylistData({ variables: { id: _id } })
        setCurrentTabAtom("playback")
    }

    const active = _id === playbackData?.playlistID

    return (
        <div className={`library-item ${active ? "active" : ""}`}>
            <div className="image" onClick={handleOnClick}>
                <Image
                    src={cover}
                    alt={`${name} cover image`}
                    layout="responsive"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    priority={true}
                />
            </div>
            <div className="item-info" onClick={handleOnClick}>
                <h3>{name}</h3>
            </div>
            <DeletePlaylist id={_id || ""} name={name || ""} />
        </div>
    )
}

export const PlaylistList = () => {
    const { loading, allPlaylists } = useRecoilValue(allPlaylistsAtom)
    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("")

    if (!allPlaylists) {
        null
    }

    if (allPlaylists.length === 0) {
        return (
            <h3 style={{ paddingTop: "2rem" }}>
                Create a playlist to start listening to a playlist
            </h3>
        )
    }

    if (loading) {
        return <CircularProgress />
    }

    const getSearch = (e) => {
        e.preventDefault()
        setQuery(search)
    }

    const playlistsAfterSearch = allPlaylists.filter((obj) =>
        obj["name"].toLowerCase().includes(query.toLowerCase()),
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
            {playlistsAfterSearch.map((playlistData, index) => (
                <Playlist
                    key={playlistData?._id}
                    index={index}
                    {...playlistData}
                />
            ))}
        </>
    )
}
