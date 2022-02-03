const { Slider } = require("@mui/material")
const { useState } = require("react")
import {
    IoVolumeHigh,
    IoVolumeMedium,
    IoVolumeLow,
    IoVolumeMute,
} from "react-icons/io5"

const VolumeIcons = ({ volume, ...props }) => {
    if (volume === 0) {
        return <IoVolumeMute {...props} />
    } else if (volume < 0.3) {
        return <IoVolumeLow {...props} />
    } else if (volume < 0.6) {
        return <IoVolumeMedium {...props} />
    } else {
        return <IoVolumeHigh {...props} />
    }
}

export const VolumeSlider = ({ currentSong }) => {
    const [currentVolume, setCurrentVolume] = useState(0.5)
    const [isMuted, setIsMuted] = useState(false)

    if (currentSong) {
        if (isMuted) {
            currentSong.volume = 0
        } else {
            currentSong.volume = currentVolume
        }
    }

    const volumeHandler = (event) => {
        setCurrentVolume(event.target.value)
        if (!isMuted) {
            currentSong.volume = event.target.value
        }
    }

    return (
        <div className="volume">
            <VolumeIcons
                volume={currentSong?.volume || 0}
                onClick={() => setIsMuted(!isMuted)}
            />
            <Slider
                aria-label="volume-indicator"
                className="volume-slider"
                value={currentVolume}
                defaultValue={0.5}
                min={0}
                step={0.01}
                max={1}
                onChange={volumeHandler}
            />
        </div>
    )
}
