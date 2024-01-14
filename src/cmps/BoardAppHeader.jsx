import { useRef, useState } from "react"
import { useSelector } from "react-redux"

import { resetDynamicModal, setDynamicModal, showErrorMsg, showSuccessMsg } from "../store/actions/system.actions.js"
import { logout } from "../store/actions/user.actions.js"

import { LogoIcon, LoginIcon, InviteIcon } from "../services/svg.service.jsx"
import { UserImg } from "./UserImg.jsx"
import { useNavigate } from "react-router"

export function BoardAppHeader() {
    const menuBtnRef = useRef(null)
    var user = useSelector(storeState => storeState.userModule.user)
    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()

    const isMenuOpen = parentId === `user-auth-menu`

    function onLoginClick() {
        resetDynamicModal()
        navigate('/auth')
    }

    async function onLogout() {
        try {
            resetDynamicModal()
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            console.error('Error logging out:', err)
            showErrorMsg('Cannot logout')
        }
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
                    parentId: 'user-auth-menu',
                    isPosBlock: true,
                    hasTooltip: true
                })
        }
    }

    const menuOptions = user ? [
        {
            icon: <LoginIcon />,
            title: 'Logout',
            onOptionClick: onLogout
        },
    ] : [
        {
            icon: <LoginIcon />,
            title: 'Login',
            onOptionClick: onLoginClick
        },
        {
            icon: <InviteIcon />,
            title: 'Signup',
            onOptionClick: onLoginClick
        },
    ]



    // if (!user) {
    //     user = {
    //         fullname: "Guest",
    //         imgUrl: "https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg",
    //     }
    // }

    return (
        <header className="board-app-header flex space-between align-center">
            <section className="header-logo grid column place-center">
                <img className="logo" src="/img/myday-temp-logo.png" />
                {/* <LogoIcon /> */}
                <span className="app-title">myday</span>
            </section>
            <nav className="header-nav">
                <div className="user-info">
                    <button
                        className="flex align-center justify-center relative"
                        title="User Profile"
                        onClick={toggleMenu}
                        ref={menuBtnRef}
                    >
                        <UserImg user={user} />

                        {/* <img src={`${user.imgUrl}`} alt="user-profile" /> */}
                        {/* {isModalOpen && <MenuOptionsModal options={menuOptions} />} */}
                        {/* {isModalOpen && <MenuOptionsModal options={menuOptions} relative={posOptions} />} */}
                    </button>
                </div>

            </nav>
        </header>
    )
}

{/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}

                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                } */}