import { useState } from 'react'

function FileLoader({ setPlaceID, setPlaceID_UI, setLotteryGroupID, setGround, setPlace, setWaves, setWaves_UI }) {
    const [file, setFile] = useState<File | null>(null)
    let fReader: FileReader;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const startUpload = async () => {
        fReader = new FileReader();
        fReader.onload = finishUpload;
        if(file != null)
            fReader.readAsText(file);
    };

    const finishUpload = async () => {
        if (fReader.result == null) return;
        let fileResult = JSON.parse(fReader.result);
        if (fileResult.PlaceID != undefined) setPlaceID(fileResult.PlaceID);
        if (fileResult.PlaceID_UI != undefined) setPlaceID_UI(fileResult.PlaceID_UI);
        if (fileResult.LotteryGroupID != undefined) setLotteryGroupID(fileResult.LotteryGroupID);
        if (fileResult.Ground != undefined) setGround(fileResult.Ground);
        if (fileResult.Place != undefined) setPlace(fileResult.Place);
        for (let i = 1; ; i++) {
            const waveName = "Wave" + i;
            if (fileResult[waveName] != undefined) {
                setWaves({ index: i - 1, wave: fileResult[waveName] })
                setWaves_UI({ index: i - 1, wave: fileResult[waveName + "_UI"] })
            } else {
                break;
            }
        }
    }

    return (
        <>
            <div className="input-group">
                <input id="file" type="file" onChange={handleFileChange} />
            </div>
            {file && (
                <section>
                    File details:
                    <ul>
                        <li>Name: {file.name}</li>
                        <li>Type: {file.type}</li>
                        <li>Size: {file.size} bytes</li>
                    </ul>
                </section>
            )}

            {file && (
                <button
                    onClick={startUpload}
                    className="submit"
                >Upload a file</button>
            )}
        </>
    )
}

export default FileLoader