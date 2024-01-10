import { useState } from "react"
import { useSelector } from "react-redux"

import { showErrorMsg, showSuccessMsg } from "../store/actions/system.actions.js"
import { login, logout, signup } from "../store/actions/user.actions.js"

import { LogoIcon, LoginIcon } from "../services/svg.service.jsx"
import { MenuOptionsModal } from "./MenuOptionsModal"

export function AppHeader() {
    var user = useSelector(storeState => storeState.userModule.user)
    const [isModalOpen, setisModalOpen] = useState(false)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            console.error('Error logging in:', err)
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            console.error('Error signing up:', err)
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            console.error('Error logging out:', err)
            showErrorMsg('Cannot logout')
        }
    }

    function onOpenModal() {
        setisModalOpen(!isModalOpen)
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
            onOptionClick: onLogin
        },
        {
            icon: <LoginIcon />,
            title: 'Signup',
            onOptionClick: onSignup
        },
    ]

    const posOptions = {
        left: '-80px',
        right: 0,
        top: '38px',
        button: 0,
    }

    if (!user) {
        user = {
            fullname: "Guest",
            imgUrl: "https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg",
        }
    }

    return (
        <header className="app-header flex space-between align-center">
            <section className="header-logo grid column place-center">
                <LogoIcon />
                <span className="app-title">MyDay</span>
            </section>
            <nav className="header-nav">
                <div className="user-info">
                    <button
                        className="flex align-center justify-center relative"
                        title="User Profile"
                        onClick={onOpenModal}
                    >
                        <img src={`${user.imgUrl}`} alt="user-profile" />
                        {/* {isModalOpen && <MenuOptionsModal options={menuOptions} />} */}
                        {isModalOpen && <MenuOptionsModal options={menuOptions} relative={posOptions} />}
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