import { Slider } from "@mui/material"
import { useRecoilState } from "recoil"
import { currentTimeAtom } from "../../utility"

export const TrackTimeline = ({ currentSong }) => {
    const [currentTime, setCurrentTime] = useRecoilState(currentTimeAtom)

    const timelineHandler = (event) => {
        setCurrentTime(event.target.value)
        currentSong.currentTime = event.target.value
    }

    return (
        <div className="timeline">
            <Slider
                aria-label="time-indicator"
                className="time-slider"
                value={currentTime}
                min={0}
                max={currentSong?.duration || 0}
                onChange={timelineHandler}
            />
        </div>
    )
}
