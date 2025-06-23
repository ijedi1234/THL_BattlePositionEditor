interface PaintParams {
    selectedOption: string,
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>
}

function EntitySelector(props: PaintParams) {
    const changeID = (event: object) => {
        const newValue = event.target.value
        const newValues = newValue.match(/[0-9a-fA-F]/g);
        if (newValues == null) {
            props.setSelectedOption(""); return;
        }
        if (newValues.length == 1) newValues.push("");
        props.setSelectedOption(newValues[0] + newValues[1]);
    }

    return (
        <input type="text" name="ID" onChange={changeID} value={props.selectedOption} />
    )
}

export default EntitySelector