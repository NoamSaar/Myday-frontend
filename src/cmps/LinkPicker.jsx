export function LinkPicker({ info, onUpdate }) {
    return (
        <li className="link-picker">
            <a target="_blank" href={info && info.url}>
                {info && info.displayTxt ? info.displayTxt : info && info.url}
            </a>
        </li>
    )
}
