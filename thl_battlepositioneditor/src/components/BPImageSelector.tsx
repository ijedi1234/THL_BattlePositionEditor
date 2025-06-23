import { Button, ButtonGroup } from 'reactstrap'

interface BPImageParams {
    ground: object,
    place: object,
    waves: object,
    selectedOption: string
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>
}

function BPImageSelector(props: BPImageParams) {
    const options = [];
    if (props.ground != null) options.push("Ground");
    if (props.place != null) options.push("Place");
    for (let i = 0; i < props.waves.length; i++) {
        options.push("Wave" + (i + 1));
        options.push("Wave" + (i + 1) + "_UI");
    }

    return (
        <ButtonGroup>
            {options.map((item) => {
                return <Button color="primary" outline key={item} onClick={() => props.setSelectedOption(item)} active={props.selectedOption === item}>{item}</Button>
            })}
            
        </ButtonGroup>
    )
}

export default BPImageSelector