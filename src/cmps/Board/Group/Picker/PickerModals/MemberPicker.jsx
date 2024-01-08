import { useEffect, useState } from "react"
import { UserImg } from "../../../../UserImg"
import { DynamicInput } from "../../../../DynamicInput"

export function MemberPicker({ chosenMembers, memberOptions, onChangeMembers }) {
    const [membersFilter, setMembersFilter] = useState('')
    const [currChosenMembers, setCurrChosenMembers] = useState(chosenMembers)
    const [currMemberOptions, setCurrMemberOptions] = useState(getFilterMembers(memberOptions, chosenMembers))

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
        const filteredMemberOptions = getFilterMembers(memberOptions, currChosenMembers)
            .filter(member => regex.test(member.fullname))

        setCurrMemberOptions(filteredMemberOptions)
    }, [membersFilter])

    function getFilterMembers(memberOptions, chosenMembers) {
        return memberOptions.filter(member => (
            !chosenMembers.some(chosenMember => chosenMember._id === member._id)
        ))
    }

    function onAddMember(member) {
        const newChosenMembers = [member, ...currChosenMembers]

        setCurrChosenMembers(newChosenMembers)
        setCurrMemberOptions(prevMembers => (
            prevMembers.filter(currMember => currMember._id !== member._id)
        ))
        onChangeMembers('person', newChosenMembers)
        setMembersFilter('')
    }

    function onRemoveMember(member) {
        const newChosenMembers = currChosenMembers.filter(currMember => currMember._id !== member._id)
        const newMemberOptions = [member, ...currMemberOptions]

        setCurrChosenMembers(newChosenMembers)
        setCurrMemberOptions(getFilterMembers(newMemberOptions, newChosenMembers))
        onChangeMembers('person', newChosenMembers)
        setMembersFilter('')
    }

    function onFilterMembers({ target }) {
        const searchVal = target.value
        setMembersFilter(searchVal)
    }

    const inputProps = {

        name: 'fullname',
        inputValue: membersFilter,
        placeholder: 'Search a name',
        type: 'search',
        handleChange: onFilterMembers,
        isSearchInput: true,
        // additionalBtns: [
        //     {
        //         name: 'filter',
        //         icon: < SearchIcon />,
        //         func: console.log('hi'),
        //     }
        // ]
    }

    return (
        <div className="general-modal member-picker-modal">

            <ul className="clean-list chosen-members-list">
                {currChosenMembers.map((member, idx) => {
                    return (
                        <li key={idx} className="chosen-member">
                            <UserImg user={member} />
                            <p className="username">{member.fullname}</p>
                            <button
                                className="remove-btn"
                                onClick={() => onRemoveMember(member)}>
                                X
                            </button>
                        </li>
                    )
                })}
            </ul>

            <div className="new-person-picker-container">
                <div className="search-input-container">
                    <DynamicInput inputProps={inputProps} />

                    {/* <input
                        className="reset"
                        type="text"
                        placeholder="Search a name"
                        value={membersFilter}
                        onChange={onFilterMembers}
                    /> */}
                </div>

                {!membersFilter && <p className="suggested-people-title">Suggested people</p>}

                <ul className="clean-list member-options-list">
                    {currMemberOptions.map((member, idx) => {
                        return (
                            <li key={idx}>
                                <button
                                    className="btn member-option"
                                    onClick={() => onAddMember(member)}
                                >
                                    <UserImg user={member} />
                                    <p className="username">{member.fullname}</p>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
