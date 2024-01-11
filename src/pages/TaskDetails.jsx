import { useParams } from "react-router";
import { DynamicSidePanelHeader } from "../cmps/DynamicSidePanelHeader";
import { getTask } from "../store/actions/board.actions";
import { useEffect, useState } from "react";
import { PanelUpdate } from "../cmps/Panel/PanelUpdate";
import { PanelFile } from "../cmps/Panel/PanelFile";
import { PanelActivity } from "../cmps/Panel/PanelActivity";
import { useSelector } from "react-redux";

export function TaskDetails() {
    const { boardId, taskId } = useParams()
    const [currTask, setCurrTask] = useState(null)
    const [currSubject, setCurrSubject] = useState('Updates')
    const isSidePanelOpen = useSelector((storeState) => storeState.systemModule.isSidePanelOpen)

    useEffect(() => {
        _getTaskById()
    }, [boardId, taskId, currSubject])

    async function _getTaskById() {
        try {
            const task = await getTask(boardId, taskId)
            setCurrTask(task)
        } catch (err) {
            console.error("Error getting task:", err)
        }
    }

    function onSwitchToSubject(subject) {
        setCurrSubject(subject)
    }

    if (!currTask) return

    const { title, members, file, updates } = currTask

    console.log('members:', members)
    const headerProps = {
        type: 'taskDetails',
        title,
        members,
        file,
        updates,
        subjects: ['Updates', 'Files', 'Activity Log'],
        onSwitchToSubject,
    }

    const bodyProps = {
        updates,
        file,
        activity: []
    }

    return (
        <section className={`task-details ${isSidePanelOpen ? 'open' : ''}`}>
            <DynamicSidePanelHeader boardId={boardId} headerProps={{ ...headerProps }} currSubject={currSubject} />
            <DynamicSidePanelRouter type={currSubject} bodyProps={bodyProps} />
        </section>
    )
}

function DynamicSidePanelRouter(props) {
    const { type, bodyProps } = props
    switch (type) {
        case 'Updates':
            return (
                <PanelUpdate
                    updates={bodyProps.updates}
                />)
        case 'Files':
            return (
                <PanelFile
                    file={bodyProps.file}
                />)
        case 'Activity Log':
            return (
                <PanelActivity
                    activity={bodyProps.activity}
                />)
    }
}
