import { useState, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileLoader from './components/FileLoader'
import MapGridContainer from './components/MapGridContainer'
import FileSaver from './components/FileSaver'
import BPImageSelector from './components/BPImageSelector'

interface WaveReducerAction {
    wave: object,
    index: number
}

function App() {
    const [activeImage, setActiveImage] = useState<string>("")

    const ReducerWaves = (state, action: WaveReducerAction) => {
        let clone = [...state];
        while (action.index >= clone.length) {
            clone.push([]);
        }
        clone[action.index] = action.wave;
        clone = clone.filter((x) => x.length !== 0);
        return clone;
    }

    //file pieces
    const [placeID, setPlaceID] = useState<object | null>(null);
    const [placeID_UI, setPlaceID_UI] = useState<object | null>(null);
    const [lotteryGroupID, setLotteryGroupID] = useState<object | null>(null);
    const [ground, setGround] = useState<object | null>(null);
    const [place, setPlace] = useState<object | null>(null);
    const [waves, setWaves] = useReducer(ReducerWaves, []);
    const [waves_UI, setWaves_UI] = useReducer(ReducerWaves, []);

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <FileLoader
                    setPlaceID={setPlaceID}
                    setPlaceID_UI={setPlaceID_UI}
                    setLotteryGroupID={setLotteryGroupID}
                    setGround={setGround}
                    setPlace={setPlace}
                    setWaves={setWaves}
                    setWaves_UI={setWaves_UI}
                />
                <FileSaver
                    placeID={placeID}
                    placeID_UI={placeID_UI}
                    lotteryGroupID={lotteryGroupID}
                    ground={ground}
                    place={place}
                    waves={waves}
                    waves_UI={waves_UI}
                />
                <hr />
                <BPImageSelector
                    ground={ground}
                    place={place}
                    waves={waves}
                    selectedOption={activeImage} setSelectedOption={setActiveImage} />
                <hr />
                <MapGridContainer
                    ground={ground} setGround={setGround}
                    place={place} setPlace={setPlace}
                    waves={waves} setWaves={setWaves}
                    waves_UI={waves_UI} setWaves_UI={setWaves_UI}
                    activeImage={activeImage} />
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
