import { useEffect, useState } from "react"
import { getUsers } from "../../store/actions/user.actions"
import { UsersList } from "./UsersList"

export function InviteModal() {
    const [users, setUsers] = useState(null)

    useEffect(async () => {
        const usersFromDb = await getUsers()
        setUsers(usersFromDb || [])
    }, [])

    if (!users) return <div>Loading...</div>
    if (!users.length) return <div>No Users to Show</div>
    return (
        <div className="invite-modal">
            <UsersList users={users} />
        </div>
    )
}
