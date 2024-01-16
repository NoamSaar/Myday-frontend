import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useEffectUpdate } from "../../../../customHooks/useEffectUpdate"
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react'

import { getMembersFromBoard, removeTask, updateTask } from "../../../../store/actions/board.actions"
import { resetDynamicModal, setDynamicModal, setDynamicModalData, setSidePanelOpen, showErrorMsg, showSuccessMsg } from "../../../../store/actions/system.actions"

import { DeleteIcon, MenuIcon, OpenIcon } from "../../../../services/svg.service"
import { DynamicPreview } from "../Picker/DynamicPreview"
import { EditableTxt } from "../../../EditableTxt"
import { useNavigate } from "react-router"
import { MsgBtn } from "./MsgBtn"

export function TaskPreview({ task, groupId, groupColor, onSetActiveTask, highlightText, filterBy }) {
    const menuBtnRef = useRef(null)
    const navigate = useNavigate()
    const session = useSession() //tokens, when session exists we have a user

    const board = useSelector((storeState) => storeState.boardModule.filteredBoard)
    const activeTask = useSelector((storeState) => storeState.boardModule.activeTask)
    const isMobile = useSelector((storeState) => storeState.systemModule.isMobile)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const [isChangingToDone, setIsChangingToDone] = useState(false)
    const [currTask, setCurrTask] = useState(null)
    const [taskTitle, setTaskTitle] = useState(task.title)
    const [isShowMenuBtn, setIsShowMenuBtn] = useState(false)
    const [isShowTaskDetailsBtn, setIsShowTaskDetailsBtn] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const isMenuOpen = parentId === `${task.id}-menu`
    const isActive = currTask ? activeTask === currTask.id : false

    useEffect(() => {
        const newmembers = task.members.length
            ? getMembersFromBoard(board, task.members)
            : []

        setCurrTask({ ...task, members: newmembers })
        setTaskTitle(task.title)
    }, [task])

    useEffectUpdate(() => {
        setCurrTask((prevTask) => ({ ...prevTask, title: taskTitle }))
    }, [taskTitle])

    async function onTaskChange(field, recivedData) {
        try {
            let data = recivedData
            if (field === 'members') data = data.map(member => member._id)
            if (field[0] === 'status' && recivedData === 'l101') {
                setIsChangingToDone(true)
                setTimeout(() => {
                    setIsChangingToDone(false)
                }, 3000)
            }

            if (field !== 'members' && field !== 'link') resetDynamicModal()

            const updatedTask = { ...task, members: task.members, [field]: data }
            updateTask(board._id, groupId, updatedTask)

            const isCalenderAutomate = loggedInUser &&
                loggedInUser.automations &&
                loggedInUser.automations.includes('calendar') &&
                updatedTask.date &&
                session &&
                session.provider_token

            switch (field) {
                case 'members':
                    setDynamicModalData({
                        chosenMembers: recivedData,
                        allMembers: board.members,
                        onChangeMembers: onTaskChange
                    })
                    if (isCalenderAutomate && data.includes(loggedInUser._id)) {
                        const date = new Date(updatedTask.date)
                        await createCalendarEvent({ name: updatedTask.title, startTime: date, endTime: date })
                    }
                    break;

                case 'date':
                    if (isCalenderAutomate) {
                        const date = new Date(updatedTask.date)
                        await createCalendarEvent({ name: updatedTask.title, startTime: date, endTime: date })
                    }
                    break

                default:
                    break;
            }

        } catch (err) {
            console.error('Error changing task:', err)
            showErrorMsg('Cannot change Task')
        }
    }

    async function onRemoveTask() {
        try {
            removeTask(board._id, groupId, task.id)
            resetDynamicModal()
            showSuccessMsg('We successfully deleted the Task')
        } catch (err) {
            console.error('Error removing task:', err)
            showErrorMsg('Cannot remove Task')
        }
    }

    async function onChangeTitle({ target }) {
        try {
            const title = target.value
            setTaskTitle(title)
        } catch (err) {
            console.error('Error changing task title:', err)
            showErrorMsg('Cannot changing Task Title')
        }
    }

    function handleMouseEnter() {
        setIsShowMenuBtn(true)
    }

    function handleMouseLeave() {
        if (!isMenuOpen) setIsShowMenuBtn(false)
    }

    function toggleMenu(ev) {
        if (isMenuOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal(
                {
                    isOpen: true,
                    parentRefCurrent: menuBtnRef.current,
                    type: 'menuOptions',
                    data: { options: menuOptions },
                    parentId: `${currTask.id}-menu`
                })
        }
    }

    function onTitleClick(ev) {
        ev.stopPropagation()
        setIsEditing(true)
        onSetActiveTask(task.id)
    }

    async function onTitleEditExit() {
        try {
            if (activeTask === task.id) onSetActiveTask(null)

            let titleToSave = taskTitle
            if (!taskTitle) {
                setTaskTitle(task.title)
                titleToSave = task.title
            }

            onTaskChange('title', titleToSave)

            setIsEditing(false)
        } catch (err) {
            console.error('Error changing task title:', err)
            showErrorMsg('Cannot changing Task Title')
        }
    }

    async function createCalendarEvent({ name, description = '', startTime, endTime }) {
        try {
            const event = {
                'summary': name,
                'description': description,
                'start': {
                    'dateTime': startTime.toISOString(),
                    'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                'end': {
                    'dateTime': endTime.toISOString(),
                    'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            };

            const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${session.provider_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });

            if (!response.ok) {
                throw new Error(`Failed to create calendar event. Status: ${response.status}`);
            }

            const data = await response.json();
            showSuccessMsg('Event added to google calender')

        } catch (err) {
            console.error('Error creating calendar event:', err);
        }
    }


    const menuOptions = [
        {
            icon: <DeleteIcon />,
            title: 'Delete',
            onOptionClick: onRemoveTask,
        },
    ]

    if (!currTask) return <ul className="clean-list flex subgrid full-grid-column loading-task task-preview-container">
        <div className='task-sticky-container sticky-left'>
            {isMobile ?
                <div className="task-row-placeholder"></div>
                :
                <div className="menu-container flex align-center justify-center">

                </div>}

            <div
                style={{ backgroundColor: groupColor }}
                className={`${isMobile ? 'sticky-left' : 'sticky-left-36'} color-display`}>
            </div>
            <ul className='clean-list task-title-container flex'>
                <li className="task-selection">
                    <div className="checkbox"></div>
                </li>

                <li className="task-title single-task"
                >

                    <div className="flex align-center open-details-container">

                    </div>

                </li>
            </ul>
        </div>

    </ul>
    return (
        <ul
            className="clean-list flex subgrid full-grid-column task-preview-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`${isActive && 'active'} task-sticky-container sticky-left`}>
                {isMobile ?
                    <div className="task-row-placeholder"></div>
                    :
                    <div className="menu-container flex align-center justify-center">
                        {isShowMenuBtn && (
                            <button
                                ref={menuBtnRef}
                                className="btn svg-inherit-color flex align-center justify-center"
                                onClick={toggleMenu}><MenuIcon className="btn" />
                            </button>
                        )}
                    </div>}

                <div
                    style={{ backgroundColor: groupColor }}
                    className={`${isMobile ? 'sticky-left' : 'sticky-left-36'} color-display`}>
                </div>
                <ul className={`clean-list task-title-container flex ${isActive && 'active'}`}>
                    <li className="task-selection">
                        <div className="checkbox"></div>
                    </li>

                    <li className="task-title single-task"
                        onClick={() => {
                            setSidePanelOpen(true)
                            navigate('task/' + currTask.id)
                        }}

                        onMouseEnter={() => setIsShowTaskDetailsBtn(true)}
                        onMouseLeave={() => setIsShowTaskDetailsBtn(false)}
                    >

                        <EditableTxt
                            isEditing={isEditing}
                            txtValue={highlightText(taskTitle, filterBy.txt)}
                            onTxtClick={onTitleClick}
                            inputValue={taskTitle}
                            onInputChange={onChangeTitle}
                            onEditClose={onTitleEditExit}
                        />

                        <div className="flex align-center open-details-container">
                            {(isShowTaskDetailsBtn && !isEditing) && <button className="task-details-btn flex justify-center">
                                <OpenIcon />
                                <p>Open</p>
                            </button>}

                            <MsgBtn msgsLength={currTask.msgs.length} />
                        </div>

                    </li>
                </ul>
            </div>

            <ul className={`clean-list subgrid grid-column-table-content flex ${isActive && 'active'} task-preview`}>

                {board.titlesOrder.map((title, idx) => {
                    return (
                        <DynamicPreview
                            key={idx}
                            title={title}
                            task={currTask}
                            onUpdate={onTaskChange}
                            allMembers={board.members}
                            isChangingToDone={isChangingToDone}
                        />
                    )
                })}

                <li className="line-end"></li>
            </ul>
        </ul>
    )
}
