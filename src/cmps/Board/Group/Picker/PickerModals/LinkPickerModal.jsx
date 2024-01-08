import { useState } from "react"

export function LinkPickerModal({ url, displayTxt, changeLink }) {
    const [newUrl, setNewUrl] = useState(url)
    const [newDisplayTxt, setNewDisplayTxt] = useState(displayTxt)

    function onChangeLink(ev) {
        ev.preventDefault()
        changeLink('link', { url: newUrl, displayTxt: newDisplayTxt })
    }

    return (
        <form onSubmit={onChangeLink} className="general-modal link-picker-modal">
            <h4>Link</h4>

            <label>Write or paste a link</label>
            <input
                className="reset black-blue-input"
                type="text"
                value={newUrl}
                placeholder="www.example.com"
                onBlur={onChangeLink}
                onChange={ev => setNewUrl(ev.target.value)}
            />

            <label>Text to display</label>
            <input
                className="reset black-blue-input"
                type="text"
                value={newDisplayTxt}
                placeholder="Example text"
                onBlur={onChangeLink}
                onChange={ev => setNewDisplayTxt(ev.target.value)}
            />

        </form>
    )
}
