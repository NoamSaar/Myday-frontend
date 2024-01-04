
export function MenuOptionsModal({ pos, options }) {
    let style = { bottom: '-20px' }

    if (pos === 'top') style = { top: '20px' }

    return (
        <div style={style} className="menu-option-modal">
            {options.map((option, idx) => {
                return <div key={idx} className="btn" onClick={option.onOptionClick}>
                    <img src={option.icon} />
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