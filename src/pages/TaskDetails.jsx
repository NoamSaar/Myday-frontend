import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { boardService } from "../services/board.service";
import { getTask, updateTask } from "../store/actions/board.actions";

import { DynamicSidePanelHeader } from "../cmps/DynamicSidePanelHeader";
import { DynamicSidePanelRouter } from "../cmps/DynamicSidePanelRouter";

export function TaskDetails() {
    const { boardId, taskId } = useParams()
    const [currTask, setCurrTask] = useState(null)
    const [currSubject, setCurrSubject] = useState('Updates')

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

    function onAddUpdate(update) {
        const updatedTask = { ...currTask, msgs: [update, ...currTask.msgs] }
        setCurrTask(updatedTask)
        const groupId = boardService.findGroupIdByTaskId(taskId)
        updateTask(boardId, groupId, updatedTask)
    }

    function onAddFile(file) {
        const updatedTask = { ...currTask, file }
        setCurrTask(updatedTask)
        const groupId = boardService.findGroupIdByTaskId(taskId)
        updateTask(boardId, groupId, updatedTask)
    }

    if (!currTask) return

    const { title, members, file, msgs } = currTask

    const headerProps = {
        type: 'taskDetails',
        title,
        members,
        file,
        subjects: ['Updates', 'Files', 'Activity Log'],
        onSwitchToSubject,
    }

    const bodyProps = {
        msgs,
        files: [file],
        activity: [],
    }

    return (
        <section className={`task-details`}>
            <DynamicSidePanelHeader boardId={boardId} headerProps={{ ...headerProps }} currSubject={currSubject} />
            <DynamicSidePanelRouter type={currSubject} bodyProps={bodyProps} onAddUpdate={onAddUpdate} onAddFile={onAddFile} />
        </section>
    )
}
