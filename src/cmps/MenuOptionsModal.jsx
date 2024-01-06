// import { useEffect, useState } from "react"
// import { useModal } from "../services/modalConext"

export function MenuOptionsModal({ pos, options, relative }) {
    let style = { top: '30px' }

    if (pos === 'top') style = { bottom: '30px' }

    if (relative) {
        const { left, right, top, bottom } = relative
        style = left ? { ...style, left: left } : { ...style, right: right }
        style = top ? { ...style, top: top } : { ...style, bottom: bottom }
    }

    return (
        <div style={style} className="menu-option-modal">
            {options.map((option, idx) => {
                return (
                    <div key={idx} className="btn" onClick={option.onOptionClick}>
                        {option.icon}
                        <p>{option.title}</p>
                    </div>
                )
            })}
        </div>
    )
}
// export function MenuOptionsModal({ id, pos, options, relative }) {
//     const { openModal, open, close } = useModal()
//     console.log('openModal:', openModal)

//     useEffect(() => {
//         open(id)
//         if (openModal && openModal !== id) {
//             close()
//             open(id)
//         }
//     }, [id, openModal])

//     useEffect(() => {

//     }, [])

//     let style = { top: '30px' }

//     if (pos === 'top') style = { bottom: '30px' }

//     if (relative) {
//         const { left, right, top, bottom } = relative
//         style = left ? { ...style, left: left } : { ...style, right: right }
//         style = top ? { ...style, top: top } : { ...style, bottom: bottom }
//     }

//     return (
//         <div style={style} className="menu-option-modal">
//             {options.map((option, idx) => {
//                 return (
//                     <div key={idx} className="btn" onClick={option.onOptionClick}>
//                         {option.icon}
//                         <p>{option.title}</p>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

// options = [
//     {
//         icon: '.../../...',
//         title: 'Delete',
//         onOptionClick: func()
//     }
// ]