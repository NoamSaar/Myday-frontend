import { useSelector } from "react-redux"
import { UserImg } from "../../../UserImg"
import { resetDynamicModal, setDynamicModal } from "../../../../store/actions/system.actions"

export function MemberPreview({ chosenMembers, memberOptions, onUpdate, taskId }) {
    const { fatherId } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isPickerOpen = fatherId === `${taskId}-memberPicker`
    const extraMembers = chosenMembers.length - 2

    function onMemberPreviewClick(ev) {
        if (isPickerOpen) {
            resetDynamicModal()
        } else {
            setDynamicModal({
                isOpen: true,
                boundingRect: ev.target.getBoundingClientRect(),
                type: 'member picker',
                data: { chosenMembers, memberOptions, onChangeMembers: onUpdate },
                fatherId: `${taskId}-memberPicker`,
                isPosBlock: true
            })
        }
    }

    return (
        <li onClick={onMemberPreviewClick} className="member-picker person-col">
            {!chosenMembers.length &&
                <img className="user-img"
                    src="https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg"
                />
            }

            {!!chosenMembers.length && <div className="member-img-container">
                {chosenMembers.map((member, idx) => {
                    return idx < 2 ? <UserImg key={idx} user={member} /> : ''
                })}
                {extraMembers > 0 && <span className="extra-members-box">+{extraMembers}</span>}
            </div>
            }
        </li >
    )
}
