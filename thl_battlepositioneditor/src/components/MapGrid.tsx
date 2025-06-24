import { useState } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import './MapGridCell.css'

interface MapGridParams {
    groundRecords: object,
    gridType: string,
    layer: object,
    setLayer: object,
    waveNumber: number,
    paint: number
}

function MapGrid(props: MapGridParams) {
    const layer = props.layer;
    const waveNumber = props.waveNumber;

    const byte2Color = new Map();
    byte2Color.set(0, 'cellEnemyOnly');
    byte2Color.set(1, 'cellWalkable');
    byte2Color.set(9, 'cellCameraCenterPassable');
    byte2Color.set(10, 'cellCameraPassthroughOther');
    byte2Color.set(98, 'cellCameraPassthroughSchool');
    byte2Color.set(99, 'cellCameraCenterNotPassable');

    const ConvertByteGround = (byte: number) => {
        const colorClass = byte2Color.get(byte);
        if (colorClass != undefined) {
            return <div className={colorClass}></div>
        }
        else {
            console.log('Missing byte: ' + byte.toString(16))
            return <div className="cellUnknown">{byte.toString(16)}</div>
        }
    }

    const ConvertByte = (rIndex:number, cIndex: number, byte: number) => {
        if (byte === 0) {
            const groundByte = props.groundRecords[rIndex].Tiles[cIndex];
            return ConvertByteGround(groundByte);
        }
        if (props.gridType === "ground") return ConvertByteGround(byte);
        return<div className = "cellUnknown">{ byte.toString(16) }</div>
    }

    const ClickPixel = (rIndex: number, cIndex: number) => {
        const clone = { ...layer };
        clone.records[rIndex].Tiles[cIndex] = props.paint;
        if (waveNumber == 0) {
            props.setLayer(clone);
        }
        else {
            props.setLayer({ index: waveNumber - 1, wave: clone });
        }
    }

    let pixels = [];
    if (layer != null) {
        pixels = layer.records;
    }

    return (
        <table cellSpacing="0" cellPadding="0" className="displayTable">
            <tbody>
                {pixels.map((row, rIndex) => {
                    return <tr key={rIndex}>
                        {row.Tiles.map((item, cIndex) => {
                            return <td key={'' + rIndex + '-' + cIndex} className="cellAll" onClick={() => ClickPixel(rIndex, cIndex)}>{ConvertByte(rIndex, cIndex, item)}</td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default MapGrid