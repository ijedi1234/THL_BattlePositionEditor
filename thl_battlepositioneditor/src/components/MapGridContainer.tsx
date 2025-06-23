import { useState } from 'react'
import MapGrid from './MapGrid'
import PaintSelector from './PaintSelector';
import EntitySelector from './EntitySelector';

interface MapGridProps {
    ground: object,
    setGround: object,
    place: object,
    setPlace: object,
    waves: object[],
    setWaves: object,
    waves_UI: object[],
    setWaves_UI: object,
    activeImage: string
}

const hexString2Byte = (str: string) => {
    if (str == "") return 0;
    return parseInt(str, 16);
}

function MapGridContainer(props: MapGridProps) {
    const [paintGround, setPaintGround] = useState<number>(0);
    const [entityID, setEntityID] = useState<string>("");

    const activeImage = props.activeImage;
    let image = <div></div>;
    let paintOptions = <div></div>;
    const waveNumStr = activeImage.replace(/\D/g, '');
    if (activeImage == "Ground") {
        paintOptions = <PaintSelector selectedOption={paintGround} setSelectedOption={setPaintGround} />
        image = <MapGrid groundRecords={props.ground.records} gridType={"ground"} layer={props.ground} setLayer={props.setGround} waveNumber={0} paint={paintGround} />;
    }
    else if (activeImage == "Place") {
        paintOptions = <EntitySelector selectedOption={entityID} setSelectedOption={setEntityID} />
        image = <MapGrid groundRecords={props.ground.records} gridType={"place"} layer={props.place} setLayer={props.setPlace} waveNumber={0} paint={hexString2Byte(entityID)} />;
    }
    else if (waveNumStr != "") {
        const waveNum = parseInt(waveNumStr);
        paintOptions = <EntitySelector selectedOption={entityID} setSelectedOption={setEntityID} />
        if (activeImage.endsWith("UI")) image = <MapGrid groundRecords={props.ground.records} gridType={"wave"} layer={props.waves_UI[waveNum - 1]} setLayer={props.setWaves_UI} waveNumber={waveNum} paint={hexString2Byte(entityID)} />;
        else image = <MapGrid groundRecords={props.ground.records} gridType={"wave_UI"} layer={props.waves[waveNum - 1]} setLayer={props.setWaves} waveNumber={waveNum} paint={hexString2Byte(entityID)} />;
    }

    return (
        <div>
            {paintOptions}
            {image}
        </div>
    )
}

export default MapGridContainer