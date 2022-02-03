import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { GET_ALL_PLAYLISTS } from "../../graphql"
import { allPlaylistsAtom } from "../"

const useGetAllPlaylists = ({ ...shouldRefetch }) => {
    const { loading, error, data, refetch } = useQuery(GET_ALL_PLAYLISTS)
    const setPlaylistData = useSetRecoilState(allPlaylistsAtom)

    useEffect(() => {
        if (data) {
            setPlaylistData({
                loading,
                error,
                refetch,
                allPlaylists: data.getAllPlaylists,
            })
        }
    }, [data])

    useEffect(() => {
        refetch()
    }, [shouldRefetch])

    return { loading, error, playlistData: data, refetch }
}

export default useGetAllPlaylists
