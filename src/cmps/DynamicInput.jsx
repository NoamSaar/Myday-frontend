import { useEffect, useRef, useState } from 'react'
import { SearchIcon } from "../services/svg.service"

export function DynamicInput({ inputProps }) {
    const inputRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false)


    const {
        name,
        inputValue,
        placeholder,
        type,
        isSearchInput,
        additionalBtns,
        handleChange
    } = inputProps

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
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleChange}
            />

            {additionalBtns && additionalBtns.length &&
                additionalBtns.map((additionalBtn, index) => (
                    <div
                        key={index}
                        className={`btn input-${additionalBtn.name}-icon`}
                        onClick={() => additionalBtn.func()}
                    >
                        {additionalBtn.icon}
                    </div>
                ))}
        </div>
    )
}

// props example:

// const inputProps = {

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