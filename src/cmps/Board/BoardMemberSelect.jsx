import { UserImg } from "../UserImg"

export default function BoardMemberSelect({ chosenMember, members, onChangeMember }) {
    return (
        <div className="general-modal board-member-select">
            <p className="title">Quick person filter</p>
            <p className="sub-title">Filter items and subitems by person</p>

            <ul className="clean-list members-options-list">
                {members.map(member => {
                    return <li className={`${chosenMember === member._id ? 'chosen-member' : ''}`}
                        title={member.fullname}
                        key={member._id}
                        onClick={() => onChangeMember(member._id)}>
                        <UserImg user={member} />
                    </li>
                })}

            </ul>
        </div>
    )
}
