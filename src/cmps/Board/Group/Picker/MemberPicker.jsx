import { utilService } from "../../../../services/util.service"

export function MemberPicker({ members, onUpdate }) {
    const extraMembers = members.length - 2

    return (
        <li className="member-picker person-col">

            {!members.length && <img src="https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg" />}

            {!!members.length && <div className="member-img-container">
                {members.map((member, idx) => {
                    return idx < 2 ? member.startsWith('http') ?
                        <img key={idx} src={member} /> :
                        <span key={idx} className="extra-members-box">{utilService.getFormatName(member)}</span>
                        :
                        ''
                })}
                {extraMembers > 0 && <span className="extra-members-box">+{extraMembers}</span>}
            </div>
            }
        </li >
    )
}
