import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Logo from '/img/myday-temp-logo.png'

import { login, logout, signup } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../store/actions/system.actions'
import { ArrowRightIcon } from '../services/svg.service'

export function HomeHeader({ scrolled }) {
    const navigate = useNavigate()
    const user = useSelector((storeState) => storeState.userModule.user)

    async function onLogin(credentials = { username: 'Noam', password: 'noam' }) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            navigate('/board')
            // navigate('/workspace')
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
            navigate('/')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className={"home-header-container full " + (scrolled ? 'scrolled' : '')}>
            <img src={Logo} className='home-header-logo' alt="" />
            <div>
                <div className='btn-header-login' onClick={() => navigate('/auth/login')}>
                    Log in
                </div>
                <button onClick={() => navigate('/board/659fb84f43565a19c57dd627')} className='btn-get-started'><span className='get-started-txt'>Get Started</span>
                    <ArrowRightIcon />
                </button>
            </div>
        </header>
    )
}

// <header className="home-header full main-container">
//     <div className="flex">
//         <img src={Logo} alt="logo" />
//     </div>
//     <div className="flex">
//         <div className="user-actions flex">
//             {/* {user && (
//                 <span className="user-info">
//                     <Link to={`user/${user._id}`}>
//                         {user.imgUrl && <img src={user.imgUrl} />}
//                         {user.fullname}
//                     </Link>
//                     <button onClick={onLogout}>Logout</button>
//                 </span>
//             )}
//             {!user && (
//                 <section className="user-info">
//                     <LoginSignup onLogin={onLogin} onSignup={onSignup} />
//                 </section>
//             )} */}
//             <button
//                 onClick={onLogin}
//                 className={'get-started-btn flex align-center justify-center'}>
//                 Get Started
//             </button>
//         </div>
//     </div>
// </header>