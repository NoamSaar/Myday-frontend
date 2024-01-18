import { useRef } from 'react'
import { EmailIcon, GithubIcon, LinkdinIcon } from '../services/svg.service'
import AboutUsImg from '/img/AboutUsImg.png'
import { useSelector } from 'react-redux'
import { resetDynamicModal, setDynamicModal, showSuccessMsg } from '../store/actions/system.actions'
import { UserImg } from './UserImg'

export function AboutUs() {
    const githubRef = useRef(null)
    const mailRef = useRef(null)
    const linkRef = useRef(null)

    const { parentId } = useSelector((storeState) => storeState.systemModule.dynamicModal)

    const isGithubOpen = parentId === 'github-menu'
    const isEmailOpen = parentId === 'email-menu'
    const isLinkedinOpen = parentId === 'linkedin-menu'

    function toggleMenu(isMenuOpen, refEl, options, currParentId) {
        if (isMenuOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal(
                {
                    isOpen: true,
                    parentRefCurrent: refEl.current,
                    type: 'menuOptions',
                    data: { options },
                    parentId: currParentId,
                    isPosBlock: true,
                    isCenter: true,
                    hasCaret: true
                })
        }
    }

    function navToLink(link) {
        window.open(link, '_blank')
    }

    async function onEmailClick(email, name) {
        try {
            await navigator.clipboard.writeText(email);
            showSuccessMsg(`${name}'s email was copied to clipboard`)
        } catch (err) {
            console.error('Error copying to clipboard:', err);
        }
    }

    const users = {
        mor: {
            imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1705356175/7B12EEEE-8B9C-489B-882B-D5B8E47D9874_pjpibk.jpg',
            github: 'https://github.com/MorMarzan',
            linkedin: 'https://www.linkedin.com/in/mor-marzan-26b48621a/',
            email: 'mormarzan@gmail.com'
        },
        noam: {
            imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360614/noam_tdr2rp.jpg',
            github: 'https://github.com/noam-sa11/',
            linkedin: 'https://www.linkedin.com/in/noam-saar-8266662a1/',
            email: 'noamsaar11@gmail.com'
        },
        eden: {
            imgUrl: 'https://res.cloudinary.com/dkvliixzt/image/upload/v1704360556/catt_dytsgq.jpg',
            github: 'https://github.com/EdenRize',
            linkedin: 'https://www.linkedin.com/in/eden-rize-9476541b7/',
            email: 'edenrize@gmail.com'
        },
    }

    const githubOptions = [
        {
            icon: <UserImg user={users.mor} />,
            title: 'Mor Marzan',
            onOptionClick: () => navToLink(users.mor.github)
        },
        {
            icon: <UserImg user={users.noam} />,
            title: 'Noam Saar',
            onOptionClick: () => navToLink(users.noam.github)
        },
        {
            icon: <UserImg user={users.eden} />,
            title: 'Eden Rize',
            onOptionClick: () => navToLink(users.eden.github)
        },
    ]

    const linkedinOptions = [
        {
            icon: <UserImg user={users.mor} />,
            title: 'Mor Marzan',
            onOptionClick: () => navToLink(users.mor.linkedin)
        },
        {
            icon: <UserImg user={users.noam} />,
            title: 'Noam Saar',
            onOptionClick: () => navToLink(users.noam.linkedin)
        },
        {
            icon: <UserImg user={users.eden} />,
            title: 'Eden Rize',
            onOptionClick: () => navToLink(users.eden.linkedin)
        },
    ]

    const emailOptions = [
        {
            icon: <UserImg user={users.mor} />,
            title: 'Mor Marzan',
            onOptionClick: () => onEmailClick(users.mor.email, 'Mor')
        },
        {
            icon: <UserImg user={users.noam} />,
            title: 'Noam Saar',
            onOptionClick: () => onEmailClick(users.noam.email, 'Noam')
        },
        {
            icon: <UserImg user={users.eden} />,
            title: 'Eden Rize',
            onOptionClick: () => onEmailClick(users.eden.email, 'Eden')
        },
    ]

    return (
        <section className="about-us grid">
            <div className="myday-story">Myday Story</div>
            <div className="about-us-img">
                <img src={AboutUsImg} alt="" />
            </div>
            <p className="about-us-txt">
                In today's fast-paced world, we understand how challenging it
                can be to keep up with the demands of daily life.
                <br />
                This understanding inspired us, a trio of young and enthusiastic
                full-stack programmers, to create a tool designed to streamline
                your schedule and optimize your daily productivity.
                <br />
                Our project, a result of two weeks of dedicated work, harnesses the capabilities
                of React, Node.js, and MongoDB to bring you an intuitive and efficient
                experience.
                <br />
                While this website is for educational purposes only and all
                rights are reserved to monday.com, our source of inspiration, we would
                be delighted to receive your feedback.
                <br />
                Your thoughts and opinions are
                invaluable as they guide our learning journey and help us refine our skills.
            </p>
            <div className="about-us-contact">
                <span ref={githubRef} onClick={() => toggleMenu(isGithubOpen, githubRef, githubOptions, 'github-menu')}><GithubIcon /></span>
                <span ref={mailRef} onClick={() => toggleMenu(isEmailOpen, mailRef, emailOptions, 'email-menu')}><EmailIcon /></span>
                <span ref={linkRef} onClick={() => toggleMenu(isLinkedinOpen, linkRef, linkedinOptions, 'linkedin-menu')}><LinkdinIcon /></span>
            </div>
        </section>
    )
}