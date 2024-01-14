export function UsersList({ users }) {
    return (
        <ul className="clean-list users-list">
            {users.map(user => {
                return user.fullname
            })}
        </ul>
    )
}
