import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { GET_ALL_SONGS } from "../../graphql"
import { allSongsAtom, playbackQueueAtom } from ".."

const useGetAllSongs = (...shouldRefetch) => {
    const { loading, error, data, refetch } = useQuery(GET_ALL_SONGS)
    const setSongData = useSetRecoilState(allSongsAtom)
    const setPlaybackQueue = useSetRecoilState(playbackQueueAtom)

    useEffect(() => {
        if (data) {
            setSongData({
                loading,
                error,
                refetch,
                allSongs: data.getAllSongs,
            })

            setPlaybackQueue({
                loading,
                error,
                refetch,
                allSongs: data.getAllSongs,
            })
        }
    }, [data])

    useEffect(() => {
        refetch()
    }, [...shouldRefetch])

    return { loading, error, songData: data, refetch }
}

export default useGetAllSongs
