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
            <input value={newUrl} onChange={ev => setNewUrl(ev.target.value)} onBlur={onChangeLink} className="reset" type="text" placeholder="www.example.com" />

            <label>Text to display</label>
            <input value={newDisplayTxt} onChange={ev => setNewDisplayTxt(ev.target.value)} onBlur={onChangeLink} className="reset" type="text" placeholder="Example text" />

        </form>
    )
}
