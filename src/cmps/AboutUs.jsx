import { useRef } from 'react'
import { EmailIcon, GithubIcon, LinkdinIcon } from '../services/svg.service'
import AboutUsImg from '/img/AboutUsImg.png'

export function AboutUs() {
    const githubRef = useRef()
    const mailRef = useRef()
    const linkRef = useRef()

    return (
        <section className="about-us grid">
            <div className="myday-story">Myday Story</div>
            <div className="about-us-content">
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
            </div>
            <div className="about-us-contact">
                <span ref={githubRef}><GithubIcon /></span>
                <span ref={mailRef}><EmailIcon /></span>
                <span ref={linkRef}><LinkdinIcon /></span>
            </div>
        </section>
    )
}