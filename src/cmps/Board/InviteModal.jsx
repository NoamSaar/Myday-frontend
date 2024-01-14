import { useEffect, useState } from "react"
import { getUsers } from "../../store/actions/user.actions"
import { MemberList } from "../MemberList"
import { CloseIcon, SearchIcon } from "../../services/svg.service"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { DynamicInput } from "../DynamicInput"

export function InviteModal({ boardMembers }) {
    const [users, setUsers] = useState(null)
    const [filteredUsers, setFilteredUsers] = useState(null)
    const [usersFilter, setUsersFilter] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersFromDb = await getUsers()
                setUsers(usersFromDb || [])

                const usersToShow = getUsersToShow(usersFromDb)
                setFilteredUsers(usersToShow || [])
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()

    }, [boardMembers])

    useEffectUpdate(() => {
        if (!usersFilter) {
            const usersToShow = getUsersToShow(users)
            setFilteredUsers(usersToShow || [])
            return
        }
        filterUsers()

    }, [usersFilter])

    function getUsersToShow(users) {
        return users.filter(user => !boardMembers.some(member => member._id === user._id))
    }

    function onFilterUsers({ target }) {
        const searchVal = target.value
        setUsersFilter(searchVal)
    }

    function filterUsers() {
        const regex = new RegExp(usersFilter, 'i')
        const newFilteredUsers = users.filter(user => regex.test(user.fullname))

        setFilteredUsers(newFilteredUsers)

    }

    const inputProps = {

        name: 'fullname',
        inputValue: usersFilter,
        placeholder: 'Search a name',
        handleChange: onFilterUsers,
        isSearchInput: false,
        additionalBtns: [
            {
                name: 'filter',
                icon: usersFilter ? <CloseIcon /> : < SearchIcon />,
                func: usersFilter ? () => setUsersFilter('') : () => { }
            }
        ]
    }

    if (!filteredUsers) return <div className="invite-modal">Loading...</div>
    if (!filteredUsers.length) return <div className="invite-modal">No Users to Show</div>
    return (
        <div className="invite-modal">
            <div className="sticky-container">
                <span>Invite Users</span>
                <DynamicInput inputProps={inputProps} />
            </div>
            <MemberList members={filteredUsers} />
        </div>
    )
}
