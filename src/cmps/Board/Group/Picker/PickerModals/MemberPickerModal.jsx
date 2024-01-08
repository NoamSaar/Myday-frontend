import { useState } from "react"
import { UserImg } from "../../../../UserImg"

export function MemberPickerModal({ chosenMembers, memberOptions, onChangeMembers }) {
    const [currChosenMembers, setCurrChosenMembers] = useState(chosenMembers)
    const [currMemberOptions, setCurrMemberOptions] = useState(getFilterMembers(memberOptions, chosenMembers))

    function getFilterMembers(memberOptions, chosenMembers) {
        return memberOptions.filter(member => !chosenMembers.some(chosenMember => chosenMember._id === member._id));
    }

    function onAddMember(member) {
        const newChosenMembers = [member, ...currChosenMembers]

        setCurrChosenMembers(newChosenMembers)
        setCurrMemberOptions(prevMembers => prevMembers.filter(currMember => currMember._id !== member._id))
        onChangeMembers('person', newChosenMembers.map(member => member._id))
    }

    function onRemoveMember(member) {
        const newChosenMembers = currChosenMembers.filter(currMember => currMember._id !== member._id)
        const newMemberOptions = [member, ...currMemberOptions]

        setCurrChosenMembers(newChosenMembers)
        setCurrMemberOptions(getFilterMembers(newMemberOptions, newChosenMembers))
        onChangeMembers('person', newChosenMembers.map(member => member._id))
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

            <ul className="clean-list member-options-list">
                {currMemberOptions.map((member, idx) => {
                    return <li key={idx}><button onClick={() => onAddMember(member)} className="btn">{member.fullname}</button> </li>
                })}
            </ul>
        </div>
    )
}
