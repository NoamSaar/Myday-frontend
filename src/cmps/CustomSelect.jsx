import { useState } from "react"
import { AngleDownIcon } from "../services/svg.service"

export function CustomSelect({ options, onSelect, name }) {
    const [selectedOption, setSelectedOption] = useState(options[0])
    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = option => {
        setSelectedOption(option)
        setIsOpen(false)
        onSelect({ target: { name, value: option.value } })
    }

    return (
        <div className="custom-select">
            <div className="select-display" onClick={() => setIsOpen(!isOpen)}>
                <img src={selectedOption.img} alt={selectedOption.title} />
                <span>{selectedOption.title}</span>
                <span className={`btn arrow ${isOpen ? 'up' : ''}`}><AngleDownIcon /></span>
            </div>

            {isOpen && (
                <div className="options-dropdown">
                    {options.map(option => (
                        <div key={option.value} className="option btn" onClick={() => handleSelect(option)}>
                            <img src={option.img} alt={option.title} />
                            <span>{option.title}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
