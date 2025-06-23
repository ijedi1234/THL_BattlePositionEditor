import { useState } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import './MapGridCell.css'
import chr01 from '../../public/images/chr01.png'
import chr02 from '../../public/images/chr02.png'
import chr03 from '../../public/images/chr03.png'
import chr04 from '../../public/images/chr04.png'
import chr05 from '../../public/images/chr05.png'
import chr06 from '../../public/images/chr06.png'
import chr07 from '../../public/images/chr07.png'
import chr08 from '../../public/images/chr08.png'
import chr09 from '../../public/images/chr09.png'
import chr10 from '../../public/images/chr10.png'
import chr11 from '../../public/images/chr11.png'
import chr12 from '../../public/images/chr12.png'
import chr13 from '../../public/images/chr13.png'
import chr14 from '../../public/images/chr14.png'
import chr15 from '../../public/images/chr15.png'
import chr16 from '../../public/images/chr16.png'

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

    const byte2Image = new Map();
    byte2Image.set(101, chr01)
    byte2Image.set(102, chr02)
    byte2Image.set(103, chr03)
    byte2Image.set(104, chr04)
    byte2Image.set(105, chr05)
    byte2Image.set(106, chr06)
    byte2Image.set(107, chr07)
    byte2Image.set(108, chr08)
    byte2Image.set(109, chr09)
    byte2Image.set(110, chr10)
    byte2Image.set(111, chr11)
    byte2Image.set(112, chr12)
    byte2Image.set(113, chr13)
    byte2Image.set(114, chr14)
    byte2Image.set(115, chr15)
    byte2Image.set(116, chr16)

    const byte2Color = new Map();
    byte2Color.set(0, 'cellEnemyOnly');
    byte2Color.set(1, 'cellWalkable');
    byte2Color.set(9, 'cellCameraCenterPassable');
    byte2Color.set(10, 'cellCameraPassthroughOther');
    byte2Color.set(98, 'cellCameraPassthroughSchool');
    byte2Color.set(99, 'cellCameraCenterNotPassable');

    const ConvertByteGround = (byte: number) => {
        const image = byte2Image.get(byte)
        if (image != undefined) {
            return <img className="cellImage" src={image} />
        }
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