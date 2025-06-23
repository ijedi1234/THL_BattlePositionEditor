import { Button, ButtonGroup } from 'reactstrap'

interface PaintParams {
    selectedOption: number,
    setSelectedOption: React.Dispatch<React.SetStateAction<number>>
}

function PaintSelector(props: PaintParams) {
    const options = [
        { paint: 0 },
        { paint: 1 },
        { paint: 9 },
        { paint: 10 },
        { paint: 98 },
        { paint: 99 }];

    return (
        <ButtonGroup>
            {options.map((item) => {
                return <Button color="primary" outline key={item.paint} onClick={() => props.setSelectedOption(item.paint)} active={props.selectedOption === item.paint}>{'0x' + item.paint.toString(16)}</Button>
            })}
        </ButtonGroup>
    )
}

export default PaintSelector