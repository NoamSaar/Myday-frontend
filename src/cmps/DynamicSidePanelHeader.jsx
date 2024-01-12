import { useEffect, useState } from "react"
import { HomeIcon, MenuIcon, PersonIcon } from "../services/svg.service"
import { userService } from "../services/user.service"
// import { MemberPicker } from "./Board/Group/Picker/PickerModals/MemberPicker"
import { UserImg } from "./UserImg"
import { utilService } from "../services/util.service"
import { setSidePanelOpen } from "../store/actions/system.actions"
import { useNavigate } from "react-router"

export function DynamicSidePanelHeader(props) {
    const { type, title, subjects } = props.headerProps
    const { boardId } = props
    const [user, setUser] = useState(null)
    const [activeSubject, setActiveSubject] = (type === 'taskDetails') ? useState('Updates') : useState('Activity Log')
    const navigate = useNavigate()

    useEffect(() => {
        if (props.headerProps.members) getUser(props.headerProps.members[0])
        else setUser('guest')
    }, [])

    async function getUser(userId) {
        try {
            if (userId === undefined) return setUser('guest')
            const user = await userService.getById(userId)
            setUser(user)
        } catch (err) {
            console.error('error getting user', err)
        }
    }

    // function onClosePanel() {
    //     setSidePanelOpen(false)
    //     // navigate('borad/' + boardId)
    // }

    // console.log('user:', user)
    if (!user) return <div>Loading...</div>
    return (
        <section className="panel-header grid">
            <button className="btn" onClick={() => {
                setSidePanelOpen(false)
                navigate('/board/' + boardId)
            }}>
                X
            </button>

            <section className="panel-title-section flex align-center space-between">
                <span className="title">{title}
                    {type === 'activitylog' && <span> Log</span>}
                </span>
                {type === 'taskDetails' && (
                    <div className="title-section-actions flex justify-center align-center">
                        <span className="panel-members flex justify-center align-center">
                            {user !== 'guest' ? <UserImg user={user} /> : <PersonIcon />}
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
