
import { ActivityPreview } from "./ActivityPreview.jsx";

export function ActivityList({ activities }) {
    return (
        <ul className="activity-list clean-list" key={"activity-list"}>
            {activities.map(activity =>
                <ActivityPreview key={activity.id} activity={activity} />
            )}
        </ul>
    )
}