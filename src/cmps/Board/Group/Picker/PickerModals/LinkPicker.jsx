import { useState } from "react"
import { DynamicInput } from "../../../../DynamicInput"

export function LinkPicker({ url, displayTxt, changeLink }) {
    const [newUrl, setNewUrl] = useState(url)
    const [newDisplayTxt, setNewDisplayTxt] = useState(displayTxt)

    function onChangeLink(ev) {
        if (ev) ev.preventDefault()
        changeLink('link', { url: newUrl, displayTxt: newDisplayTxt })
    }

    function onSetUrl({ target }) {
        setNewUrl(target.value)
    }

    function onSetDisplayTxt({ target }) {
        setNewDisplayTxt(target.value)
    }

    const urlInputProps = {
        name: 'url',
        inputValue: newUrl,
        placeholder: 'www.example.com',
        handleChange: onSetUrl,
        isSearchInput: false,
        onBlur: onChangeLink
    }

    const displayInputProps = {
        name: 'displayTxt',
        inputValue: newDisplayTxt,
        placeholder: 'Example text',
        handleChange: onSetDisplayTxt,
        isSearchInput: false,
        onBlur: onChangeLink
    }

    return (
        <form onSubmit={onChangeLink} className="general-modal link-picker-modal">
            <h4>Link</h4>

            <label>Write or paste a link</label>
            <DynamicInput inputProps={urlInputProps} />

            <label>Text to display</label>
            <DynamicInput inputProps={displayInputProps} />

        </form>
    )
}
