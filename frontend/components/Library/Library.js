import { Tab, Tabs } from "@mui/material"
import { useRecoilState, useRecoilValue } from "recoil"
import { currentTabAtom, playbackQueueAtom } from "../../utility"
import { PlaylistList } from "./PlaylistList"
import { SongList, PlaybackList } from "./SongList"

const SideDrawer = ({ open }) => {
    const [currentTab, setCurrentTab] = useRecoilState(currentTabAtom)
    const playbackQueue = useRecoilValue(playbackQueueAtom)

    const handleTabChange = (e, tab) => {
        setCurrentTab(tab)
    }

    return (
        <div className={`drawer ${open ? "open" : ""}`}>
            <h2>Currently Playing</h2>

            <Tabs
                value={currentTab}
                onChange={handleTabChange}
                className="drawer-tabs"
            >
                <Tab
                    value="songs"
                    label="All Songs"
                    wrapped
                    className="drawer-tab"
                />
                <Tab
                    value="playlists"
                    label="All Playlists"
                    wrapped
                    className="drawer-tab"
                />

                <Tab
                    value="playback"
                    label={playbackQueue?.playlistName}
                    className={`drawer-tab ${
                        !playbackQueue?.playlistName ? "hidden" : ""
                    }`}
                />
            </Tabs>

            {currentTab === "songs" ? <SongList /> : null}
            {currentTab === "playlists" ? <PlaylistList /> : null}
            {currentTab === "playback" ? <PlaybackList /> : null}
        </div>
    )
}

export default SideDrawer
