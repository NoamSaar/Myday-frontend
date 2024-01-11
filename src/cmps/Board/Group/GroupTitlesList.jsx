import { utilService } from "../../../services/util.service"

export function GroupTitlesList({ titles }) {
    return (
        <ul className="clean-list flex subgrid group-titles-list">
            {titles.map((title, idx) => {
                return <li key={idx} className={`${title}-col`}>
                    {title === 'member' ? 'Person' : utilService.capitalizeFirstLetter(title)}
                </li>
            })}
        </ul>
    )
}
