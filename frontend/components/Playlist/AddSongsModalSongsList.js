import { useRecoilState, useRecoilValue } from "recoil"
import { allSongsAtom, selectedSongsToAddToPlaylistAtom } from "../../utility"
import Image from "next/image"
import { useState } from "react"

const ModalSong = ({ _id, title, image, artist }) => {
    const [active, setActive] = useState(false)
    const selectedSongs = useRecoilValue(selectedSongsToAddToPlaylistAtom)

    const handleOnClick = () => {
        setActive(!active)
        if (!selectedSongs.has(_id)) {
            selectedSongs.add(_id)
        } else {
            selectedSongs.delete(_id)
        }
    }

    return (
        <div
            className={`add-songs-item ${active ? "active" : ""}`}
            onClick={handleOnClick}
        >
            <div className="add-song-image">
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
            <div className="add-song-item-info">
                <h3>{title}</h3>
                <h4>{artist}</h4>
            </div>
        </div>
    )
}

export const ModalSongList = () => {
    const { loading, allSongs } = useRecoilValue(allSongsAtom)

    return !loading && allSongs
        ? allSongs.map((songData, index) => (
              <ModalSong key={songData._id} index={index} {...songData} />
          ))
        : null
}
