
import { ActivityPreview } from "./ActivityPreview.jsx";

export function ActivityList({ activities }) {
    return (
        <ul className="activity-list clean-list" >
            {
                activities.map(activity =>
                    <li className="activity-preview subgrid full-grid-column align-center" key={activity._id} >
                        <ActivityPreview activity={activity} />
                    </li>
                )
            }
        </ul >
    )
}