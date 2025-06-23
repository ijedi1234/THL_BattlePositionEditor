import { useState } from 'react'

function FileSaver({ placeID, placeID_UI,lotteryGroupID, ground, place, waves, waves_UI }) {
    const [downloadLink, setDownloadLink] = useState<string>('#')

    const filename = "output.json";

    const setDownload = async () => {
        const fullFile = { PlaceID: placeID, PlaceID_UI: placeID_UI, LotteryGroupID: lotteryGroupID, Ground: ground, Place: place };
        for (let i = 0; i < waves.length; i++) {
            fullFile["Wave" + (i + 1)] = waves[i];
        }
        for (let i = 0; i < waves.length; i++) {
            fullFile["Wave" + (i + 1) + "_UI"] = waves_UI[i];
        }
        const fileStr = JSON.stringify(fullFile);
        const blob = new Blob([fileStr], { type: "application/json" });
        setDownloadLink(URL.createObjectURL(blob));
    }

    return (
        <>
            <div>
                <a href={downloadLink} download={filename} onClick={setDownload}>Download File</a>
            </div>
        </>
    )
}

export default FileSaver