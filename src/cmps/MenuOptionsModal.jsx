
export function MenuOptionsModal({ pos, options }) {
    let style = { top: '20px' }

    if (pos === 'top') style = { bottom: '20px' }

    return (
        <div style={style} className="menu-option-modal">
            {options.map((option, idx) => {
                return <div key={idx} className="btn" onClick={option.onOptionClick}>
                    <button>{option.icon}</button>
                    <p>{option.title}</p>
                </div>
            })}
        </div>
    )
}

// options = [
//     {
//         icon: '.../../...',
//         title: 'Delete',
//         onOptionClick: func()
//     }
// ]