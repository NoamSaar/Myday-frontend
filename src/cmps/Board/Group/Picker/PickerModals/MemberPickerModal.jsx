import { useState } from "react"
import { utilService } from "../../../../../services/util.service"
import { UserImg } from "../../../../UserImg"

export function MemberPickerModal({ chosenMembers, memberOptions, onChangeMembers }) {
    const [currChosenMembers, setCurrChosenMembers] = useState(chosenMembers)
    const [currMemberOptions, setCurrMemberOptions] = useState(memberOptions)

    function onAddMember(member) {
        setCurrChosenMembers(prevMembers => [member, ...prevMembers])
        setCurrMemberOptions(prevMembers => prevMembers.filter(currMember => currMember._id !== member._id))
        onChangeMembers('person', [member, ...currChosenMembers].map(member => member._id))
    }

    function onRemoveMember(member) {
        setCurrChosenMembers(prevMembers => prevMembers.filter(currMember => currMember._id !== member._id))
        setCurrMemberOptions(prevMembers => [member, ...prevMembers])
        onChangeMembers('person', currChosenMembers.filter(currMember => currMember._id !== member._id).map(member => member._id))
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
