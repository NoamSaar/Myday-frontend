import { useState } from 'react'
import HoltCatImg from '/img/welcome-to-monday.avif'
import { DynamicInput } from '../cmps/DynamicInput'
import { userService } from '../services/user.service'
import { uploadService } from '../services/upload.service'
import { UserImg } from '../cmps/UserImg'

export function LoginSignup() {
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState(userService.getEmptyUser())

    function toggleLogin() {
        setIsLogin(prevLogin => !prevLogin)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
            default:
                break
        }

        setUser(prevUser => ({ ...prevUser, [field]: value }))

    }

    async function onImgUpload(ev) {
        try {
            const imgData = await uploadService.uploadImg(ev)
            console.log('imgData.url', imgData.url)
            setUser(prevUser => ({ ...prevUser, imgUrl: imgData.url }))
        } catch (err) {
            console.log('err', err)
        }
    }

    const usernameInputProps = {
        name: 'username',
        inputValue: user.username,
        placeholder: 'Enter your username',
        handleChange: handleChange,
    }

    const fullnameInputProps = {
        name: 'fullname',
        inputValue: user.fullname,
        placeholder: 'Enter your fullname',
        handleChange: handleChange,
    }

    const passwordInputProps = {
        name: 'password',
        inputValue: user.password,
        type: 'password',
        placeholder: 'Enter your password',
        handleChange: handleChange,
    }

    const noticeContent = isLogin ?
        <p>Don't have an account yet? <span onClick={toggleLogin}>Sign up</span></p>
        :
        <p>Already have an account? <span onClick={toggleLogin}>Log in</span></p>

    return (
        <section className="login-signup">
            <div className='flex column align-center justify-center login-content-container'>

                <div className="flex column align-center justify-center form-container">
                    <h1>Welcome to myday</h1>
                    <h2>{isLogin ? 'Log in to your account' : 'Get started - it\'s free. No credit card needed.'}</h2>

                    <form className='full-width'>

                        <div className="flex column full-width form-section-container">
                            <label>Username:</label>
                            <DynamicInput inputProps={usernameInputProps} />
                        </div>

                        {!isLogin && <div className="flex column full-width form-section-container">
                            <label>Fullname:</label>
                            <DynamicInput inputProps={fullnameInputProps} />
                        </div>}

                        <div className="flex column full-width form-section-container">
                            <label>Password:</label>
                            <DynamicInput inputProps={passwordInputProps} />
                        </div>

                        {!isLogin && <div className="flex align-center full-width form-section-container user-img-selection">
                            <label className='user-img-label'>Your Image:</label>
                            <label className="flex custom-file-upload">
                                <input type="file" onChange={onImgUpload} />
                                {user.imgUrl ? <UserImg user={user} /> : <UserImg />}
                            </label>
                        </div>}

                        <button>{isLogin ? 'Log in' : 'Sign up'}</button>
                    </form>
                </div>

                <div className='notice-navigation'>
                    {noticeContent}
                </div>

            </div>

            <div className="img-container">
                <img src={HoltCatImg} />
            </div>
        </section>
    )
}
