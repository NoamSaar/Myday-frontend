import { useSelector } from "react-redux"
import { ClockIcon } from "../../services/svg.service"
import { utilService } from "../../services/util.service"
import { UserImg } from "../UserImg"
import { ActivityStatus } from "./ActivityStatus"

export function ActivityPreview({ activity }) {
    // console.log('ActivityPreview ~ activity:', activity)
    const currBoard = useSelector(state => state.boardModule.currBoard)
    const statuses = currBoard.status
    const priorities = currBoard.priority
    const members = currBoard.members
    const activityTitle = activity.task?.title || activity.group?.title || currBoard.title

    const { byMember, createdAt, entity, group, txt, type, _id } = activity


    function getStatusColor(statusTitle) {
        if (statusTitle === '-') return '#c4c4c4'
        const ActivityStatus = statuses.find(status => status.title === statusTitle)
        if (!ActivityStatus) return null
        return ActivityStatus.color
    }

    function getPriorityColor(priorityTitle) {
        if (priorityTitle === '-') return '#c4c4c4'
        const priority = priorities.find(priority => priority.title === priorityTitle)
        if (!priority) return null
        return priority.color
    }

    function getMemberName(memberId) {
        const member = members.find(member => member._id === memberId)
        if (!member) return null
        return member
    }

    function getTitle(prevTitle) {
        if (type === 'person' && prevTitle !== 'Added') return getMemberName(prevTitle)
        else return prevTitle
    }

    function getColor(type, title) {
        if (type === 'status') return getStatusColor(title)
        else if (type === 'priority') return getPriorityColor(title)
        else return null
    }

    return (
        <li className="activity-preview grid">

            <div className="created-at">
                <ClockIcon />
                <span>{utilService.timeSince(createdAt)}</span>
            </div>

            <div className="created-by">
                <UserImg user={byMember} />
            </div>

            <div className="title">
                {activity.task?.title || activity.group?.title || currBoard.title}
            </div>

            <div className="activity-type">
                <div className="title">
                    {type}
                </div>
            </div>

            <div className="action-description">
                <ActivityStatus
                    type={type}
                    fromStatus={{
                        title: activity.from ? getTitle(activity.from) : '-',
                        color: getColor(type, activity.from),
                    }}
                    toStatus={{
                        title: activity.from ? getTitle(activity.to) : '-',
                        color: getColor(type, activity.to),
                    }}
                    activityTitle={activityTitle}
                />
            </div>

        </li>
    )
}

