import Image from "next/image"
import { useRecoilValue } from "recoil"
import { currentSongPlayingAtom, isSongPlayingAtom } from "../utility"

const Record = () => {
    const { image } = useRecoilValue(currentSongPlayingAtom)
    const isPlaying = useRecoilValue(isSongPlayingAtom)
    return (
        <div className="record">
            <Image
                src={image ? image : "/favicon.ico"}
                alt="Record"
                layout="responsive"
                width="100%"
                height="100%"
                objectFit="cover"
                className={isPlaying ? "rotate-song" : "rotate-song paused"}
            ></Image>
        </div>
    )
}

export default Record
