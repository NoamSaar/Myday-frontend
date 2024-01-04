
export function StatusPicker({ title, info, onUpdate, priorities, statuses }) {
    let color

    if (priorities) {
        color = priorities.find(priority => priority.title === info.chosenOption).color
    }

    if (statuses) {
        color = statuses.find(status => status.title === info.chosenOption).color
    }

    var style = { backgroundColor: color }


    return (
        <li style={style} className="status-picker" >
            {info.chosenOption}
        </li >
    )
}
