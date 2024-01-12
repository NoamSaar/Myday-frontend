import { useState, useEffect } from 'react'
import { LikeIcon, PersonIcon, ReplyIcon } from "../../services/svg.service"
import { UserImg } from '../UserImg'

export function PanelUpdate({ updates }) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers() {
            const userPromises = updates.map(async (update) => {
                const user = await getUser(update.memberId)
                return user
            })

            const resolvedUsers = await Promise.all(userPromises)
            setUsers(resolvedUsers)
        }

        fetchUsers()
    }, [updates])

    async function getUser(userId) {
        try {
            if (userId === undefined) return 'guest'
            const user = await userService.getById(userId)
            console.log('user:', user)
            return user
        } catch (err) {
            console.error('error getting user', err)
            return null
        }
    }

    console.log('users:', users)
    return (
        <section className="panel-update grid align-center">
            {updates.length > 0 && users.length === updates.length ? (
                updates.map((update, idx) => (
                    <article key={update.id} className="update-post">
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
                            <p>{update.txt}</p>
                        </section>
                        <section className="post-actions flex align-center">
                            <div>
                                <button className="btn"><LikeIcon />Like</button>
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
                        <h2>No updates yet for this item</h2>
                        <p className="post_not_found_subtitle">Be the first one to update about progress, mention someone
                            <br />
                            or upload files to share with your team members</p>
                    </div>
                </div>
            )}
        </section>
    )
}
