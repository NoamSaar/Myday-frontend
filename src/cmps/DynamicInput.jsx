import { useRef } from 'react'
import { SearchIcon } from "../services/svg.service"

export function DynamicInput(props) {
    const inputRef = useRef(null)

    const handleFocus = () => {
        props.inputProps.onSetIsFocused(true)
    }

    const handleBlur = () => {
        props.inputProps.onSetIsFocused(false)
    }

    const {
        name,
        inputValue,
        placeholder,
        type,
        isFocused,
        isSearchInput,
        additionalBtns
    } = props.inputProps

    return (
        <div
            className={`dynamic-input ${type}-input flex align-center ${isFocused ? 'focused' : ''}`}
            onClick={() => inputRef.current.focus()}
        >
            {isSearchInput &&
                <div className="search-icon grid place-center">
                    <SearchIcon />
                </div>
            }

            <input
                name={name}
                ref={inputRef}
                value={inputValue}
                type={type}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={props.inputProps.handleChange}
            />

            {additionalBtns && additionalBtns.length &&
                additionalBtns.map((additionalBtn, index) => (
                    <div
                        key={index}
                        className={`btn input-${additionalBtn.name}-icon`}
                        onClick={() => additionalBtn.func}
                    >
                        {additionalBtn.icon}
                    </div>
                ))}
        </div>
    )
}

// props example:

// const props = {
//     name: 'title',
//     inputValue: filterByToEdit.title,
//     placeholder: 'Search',
//     type: 'search',
//     isFocused: isFocus,
//     onSetIsFocused: onToggleIsFocus,
//     handleChange: handleChange,
//     isSearchInput: true,
//     additionalBtns: [
//         {
//             name: 'filter',
//             icon: < SearchIcon />,
//             func: console.log('hi'),
//         }
//     ]
// }