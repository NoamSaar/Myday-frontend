import { useState, useEffect } from 'react'
import { LikeIcon, PersonIcon, ReplyIcon } from "../../services/svg.service"
import { UserImg } from '../UserImg'
import { boardService } from '../../services/board.service'

export function PanelUpdate({ msgs, onAddUpdate }) {
    const [users, setUsers] = useState([])
    const [updateTxt, setUpdateText] = useState('')

    useEffect(() => {
        async function fetchUsers() {
            const userPromises = msgs.map(async (msg) => {
                const user = await getUser(msg.memberId)
                return user
            })

            const resolvedUsers = await Promise.all(userPromises)
            setUsers(resolvedUsers)
        }

        fetchUsers()
    }, [msgs])

    async function getUser(userId) {
        try {
            if (userId === undefined) return 'guest'
            const user = await userService.getById(userId)
            return user
        } catch (err) {
            console.error('error getting user', err)
            return null
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        const newUpdate = boardService.getNewUpdate(updateTxt)
        onAddUpdate(newUpdate)
        setUpdateText('')
    }

    function onLikeComment() {

    }

    return (
        <section className="panel-update grid align-center">
            <div className="input-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Write an update..."
                        onChange={(ev) => setUpdateText(ev.target.value)}
                    />
                </form>
            </div>

            {msgs.length > 0 && users.length === msgs.length ? (
                msgs.map((msg, idx) => (
                    <article key={msg.id} className="update-post">
                        <section className="post-header flex align-center">
                            <section className="post-creator grid column align-center">
                                {users[idx] !== 'guest' ? (
                                    <>
                                        <UserImg user={users[idx]} />
                                        {users[idx].fullname}
                                    </>
                                ) : (
                                    <>
                                        <PersonIcon />
                                        Guest
                                    </>
                                )}
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
                ))
            ) : (
                <div className="post_not_found grid place-center">
                    <img src="../../../public/icons/no-updates.svg" alt="" />
                    <div className="post-not-found-txt">
                        <h2>No Updates yet for this item</h2>
                        <p className="post_not_found_subtitle">Be the first one to update about progress, mention someone
                            <br />
                            or upload files to share with your team members</p>
                    </div>
                </div>
            )}
        </section>
    )
}
