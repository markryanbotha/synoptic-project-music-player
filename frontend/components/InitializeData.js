import { useEffect } from "react"
import {
    useGetAllSongs,
    uploadIsLoadingAtom,
    currentSongPlayingAtom,
    useGetAllPlaylists,
    deleteIsLoadingAtom,
} from "../utility"
import { useRecoilValue, useSetRecoilState } from "recoil"

const InitializeData = () => {
    const uploadIsLoading = useRecoilValue(uploadIsLoadingAtom)
    const deleteIsLoading = useRecoilValue(deleteIsLoadingAtom)

    const { songData, loading } = useGetAllSongs({
        uploadIsLoading,
        deleteIsLoading,
    })
    const setCurrentSong = useSetRecoilState(currentSongPlayingAtom)

    useGetAllPlaylists({ uploadIsLoading })

    useEffect(() => {
        if (songData?.getAllSongs && songData?.getAllSongs.length !== 0) {
            const { _id, title, audio, image, artist, album } =
                songData.getAllSongs[0]
            setCurrentSong({
                _id,
                title,
                audio,
                image,
                artist,
                album,
                index: 0,
            })
        }
    }, [loading])

    return null
}

export default InitializeData
