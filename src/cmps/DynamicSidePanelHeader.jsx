import { useEffect, useState } from "react"
import { CloseIcon, HomeIcon, MenuIcon, PersonIcon } from "../services/svg.service"
import { userService } from "../services/user.service"
// import { MemberPicker } from "./Board/Group/Picker/PickerModals/MemberPicker"
import { UserImg } from "./UserImg"
import { utilService } from "../services/util.service"
import { setSidePanelOpen } from "../store/actions/system.actions"
import { useNavigate } from "react-router"

export function DynamicSidePanelHeader(props) {
    const { type, title, subjects, members } = props.headerProps
    const { boardId, taskId } = props
    const [users, setUsers] = useState(null)
    const [activeSubject, setActiveSubject] = (type === 'taskDetails') ? useState('Updates') : useState('Activity Log')
    const navigate = useNavigate()

    useEffect(() => {
        if (members) getUsers(members)
        else setUsers(['guest'])
    }, [taskId])

    async function getUsers(userIds) {
        try {
            const userPromises = userIds.map(async (userId) => await userService.getById(userId))
            const resolvedUsers = await Promise.all(userPromises)
            setUsers(resolvedUsers)
        } catch (err) {
            console.error('error getting users', err)
        }
    }

    // function onClosePanel() {
    //     setSidePanelOpen(false)
    //     // navigate('borad/' + boardId)
    // }

    // console.log('user:', user)
    if (!users?.length) return <div>Loading...</div>
    return (
        <section className="panel-header grid">
            <button className="btn" onClick={() => {
                setSidePanelOpen(false)
                navigate('/board/' + boardId)
            }}>
                <CloseIcon />
            </button>

            <section className="panel-title-section flex align-center space-between">
                <span className="title">{title}
                    {type === 'activitylog' && <span> Log</span>}
                </span>
                {type === 'taskDetails' && (
                    <div className="title-section-actions flex justify-center align-center">
                        <span className="panel-members flex justify-center align-center">
                            {users.map((user, index) => (
                                <UserImg key={index} user={user} />
                            ))}
                        </span>
                        <button className="btn">
                            <MenuIcon />
                        </button>
                    </div>
                )}
            </section>
            <section className="panel-subjects flex">
                {subjects.map((sub, idx) => (
                    <button
                        key={sub}
                        className={`btn ${sub === activeSubject ? 'active' : ''}`}
                        onClick={() => {
                            props.headerProps.onSwitchToSubject(sub)
                            setActiveSubject(sub)
                        }}
                    >
                        {sub === 'Updates' && <HomeIcon />}
                        {utilService.capitalizeFirstLetter(sub)}
                    </button>
                ))}
            </section>
        </section>
    )

}
