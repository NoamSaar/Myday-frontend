
export function MenuOptionsModal({ pos, options, relative }) {
    // console.log('relative:', relative)
    let style = { top: '30px' }

    if (pos === 'top') style = { bottom: '30px' }

    if (relative) {
        const { dirInline, dirBlock, diffInline, diffBlock } = relative
        console.log('dirline:', dirInline)
        style = dirInline === 'left' ? { ...style, left: +diffInline } : { ...style, right: +diffInline }
        style = dirBlock === 'top' ? { ...style, top: +diffBlock } : { ...style, right: +diffBlock }
    }

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