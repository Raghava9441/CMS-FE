// import Child from "@components/palyground/Child"
import  {  useState } from "react"

// const initialSate = {
//     count: 0
// }
// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'increment':
//             return { count: state.count + 1 };
//         case 'decrement':
//             return { count: state.count - 1 };

//         default:
//             return state;
//     }
// }

function SettingsPage() {

    // const [state, setState] = useReducer(reducer, initialSate)
    const [checkBox, setCheckBox] = useState([
        { id: 1, name: "option1", checked: false },
        { id: 2, name: "option2", checked: false },
        { id: 3, name: "option3", checked: false },
        { id: 4, name: "option4", checked: false },
    ])
    const [selectAllDisabled, setSelectAllDisabled] = useState(false)
    
    // const handleChange = (id: number) => {
    //     const updatedCheckboxes = checkBox.map((checkbox) =>
    //         checkbox.id === id
    //             ? { ...checkbox, checked: !checkbox.checked }
    //             : checkbox
    //     );
    //     setCheckBox(updatedCheckboxes)
    //     const allchecked = updatedCheckboxes.every(checkbox => checkbox.checked === true)
    //     setSelectAllDisabled(allchecked)
    //     console.log(selectAllDisabled)
    // }
    const handleSelectDeselect = () => {
        const updatedCheckboxes = checkBox.map((checkbox) => ({ ...checkbox, checked: !selectAllDisabled }))
        setCheckBox(updatedCheckboxes)
        setSelectAllDisabled(!selectAllDisabled)
    }

    const selectedCheckBoxes = checkBox.filter(checkbox => checkbox.checked === true)

    return (
        <div>
            {/* <Child valueRef={valueRef} />
            <button onClick={handleChnage}>hey</button>
            <button onClick={() => console.log(valueRef.current)}>click me </button> */}

            {/* <p>count : {state.count}</p>
            <button onClick={() => setState({ type: 'increment' })}>+</button>
            <button onClick={() => setState({ type: 'decrement' })}>-</button> */}
            <div>{selectedCheckBoxes.length}</div>
            {
                checkBox.map((item) =>
                    <div key={item.id}>
                        {/* <input type="checkbox" checked={item.checked} onChange={() => handleChange(item.id)} /> */}
                        <label htmlFor="checkbox">{item.name}</label>

                    </div>
                )
            }
            <button onClick={handleSelectDeselect}>handleSelect/deselect</button>

        </div>
    )
}

export default SettingsPage