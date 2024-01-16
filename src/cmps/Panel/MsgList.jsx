import { useEffect, useState } from "react"
import { UserImg } from "../UserImg"
import { ClockIcon, LikeIcon, PersonIcon, ReplyIcon } from "../../services/svg.service"
import { utilService } from "../../services/util.service"
import { getUserById } from "../../store/actions/user.actions"

export function MsgList({ msgs, onLikeComment }) {

    const [currMsgs, setCurrMsgs] = useState(null)

    useEffect(() => {
        const copyMsgs = JSON.parse(JSON.stringify(msgs))
        const updatedMsgs = copyMsgs.map(msg => {
            const user = getUserById(msg.memberId)
            msg.user = user
            delete msg.memberId
            return msg
        })
        setCurrMsgs(updatedMsgs)
    }, [msgs])

    if (!currMsgs) return

    return (
        <>
            {currMsgs.map(msg => (
                <article key={msg.id} className="update-post">
                    <section className="post-header flex align-center space-between">
                        <section className="post-creator grid column align-center">
                            {msg.user ? (
                                <>
                                    <UserImg user={msg.user} />
                                    {msg.user.fullname}
                                </>
                            ) : (
                                <>
                                    <PersonIcon />
                                    Guest
                                </>
                            )}
                        </section>
                        <section className="post-time flex align-center justify-center">
                            <ClockIcon />
                            {utilService.timeSince(msg.createdAt)}
                            {/* <button
                                    className={`btn btn-option-menu`}
                                    alt="update Menu"
                                    onClick={toggleMenu}
                                    title="Update Menu"
                                    data-boardid={board._id}
                                    ref={menuBtnRef}
                                >
                                    <MenuIcon />
                                </button> */}
                        </section>
                    </section>
                    <section className="post-content">
                        <p>{msg.txt}</p>
                    </section>

                    <section className="likes-section flex">
                        {
                            msg.likes && msg.likes.length > 0 && (
                                <article className="btn flex">
                                    👍 {msg.likes.length}
                                </article>
                            )
                        }
                    </section>

                    <section className="post-actions flex align-center">
                        <div>
                            <button className="btn" onClick={onLikeComment}>
                                <LikeIcon />Like
                            </button>
                        </div>
                        <div>
                            <button className="btn"><ReplyIcon />Reply</button>
                        </div>
                    </section>
                </article>
            ))}

        </>
    )
}
