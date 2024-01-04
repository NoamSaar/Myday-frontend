
export function MemberPicker({ members, onUpdate }) {
    const extraMembers = members.length - 2

    return (
        <li className="member-picker">

            {!members.length && <img src="https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg" />}

            {!!members.length && <div className="member-img-container">
                {members.map((member, idx) => {
                    return <p key={idx}>{member}</p>
                })}
                {extraMembers > 0 && <span className="extra-members-box">+{extraMembers}</span>}
            </div>
            }
        </li>
    )
}
