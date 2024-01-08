import { useEffect, useState } from "react"
import { UserImg } from "../../../../UserImg"

export function MemberPickerModal({ chosenMembers, memberOptions, onChangeMembers }) {
    const [currChosenMembers, setCurrChosenMembers] = useState(chosenMembers)
    const [currMemberOptions, setCurrMemberOptions] = useState(getFilterMembers(memberOptions, chosenMembers))
    const [membersFilter, setMembersFilter] = useState('')

    useEffect(() => {
        setCurrChosenMembers(chosenMembers)
        setCurrMemberOptions(getFilterMembers(memberOptions, chosenMembers))
    }, [chosenMembers, memberOptions])

    useEffect(() => {
        if (!membersFilter) {
            setCurrMemberOptions(getFilterMembers(memberOptions, chosenMembers))
            return
        }

        const regex = new RegExp(membersFilter, 'i')
        const filteredMemberOptions = getFilterMembers(currMemberOptions, currChosenMembers).filter(member => regex.test(member.fullname))

        setCurrMemberOptions(filteredMemberOptions)
    }, [membersFilter])

    function getFilterMembers(memberOptions, chosenMembers) {
        return memberOptions.filter(member => !chosenMembers.some(chosenMember => chosenMember._id === member._id));
    }

    function onAddMember(member) {
        const newChosenMembers = [member, ...currChosenMembers]

        setCurrChosenMembers(newChosenMembers)
        setCurrMemberOptions(prevMembers => prevMembers.filter(currMember => currMember._id !== member._id))
        onChangeMembers('person', newChosenMembers)
    }

    function onRemoveMember(member) {
        const newChosenMembers = currChosenMembers.filter(currMember => currMember._id !== member._id)
        const newMemberOptions = [member, ...currMemberOptions]

        setCurrChosenMembers(newChosenMembers)
        setCurrMemberOptions(getFilterMembers(newMemberOptions, newChosenMembers))
        onChangeMembers('person', newChosenMembers)
    }

    function onFilterMembers({ target }) {
        const searchVal = target.value
        setMembersFilter(searchVal)
    }

    return (
        <div className="general-modal member-picker-modal">

            <ul className="clean-list chosen-members-list">
                {currChosenMembers.map((member, idx) => {
                    return <li key={idx} className="chosen-member">
                        <UserImg user={member} />
                        <p className="username">{member.fullname}</p>
                        <button className="remove-btn" onClick={() => onRemoveMember(member)}>X</button></li>
                })}
            </ul>

            <div className="new-person-picker-container">

                <div className="search-input-container black-blue-input">
                    <input value={membersFilter} onChange={onFilterMembers} type="text" className="reset" placeholder="Search a name" />
                </div>

                {!membersFilter && <p className="suggested-people-title">Suggested people</p>}

                <ul className="clean-list member-options-list">
                    {currMemberOptions.map((member, idx) => {
                        return <li key={idx}>
                            <button onClick={() => onAddMember(member)} className="btn member-option">
                                <UserImg user={member} />
                                <p className="username">{member.fullname}</p>
                            </button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}
