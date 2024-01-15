import { useRef } from "react"
import { useSelector } from "react-redux"
import { resetDynamicModal, setDynamicModal } from "../../../../store/actions/system.actions"

export function TitleStat({ titleStat, idx }) {
    const titleRef = useRef(null)

    const { parentId, type, isOpen } = useSelector((storeState) => storeState.systemModule.dynamicModal)
    const isModalOpen = parentId === `${idx}-tooltip`

    function onStatEnter() {
        if (isOpen && type !== 'tooltip') return

        setDynamicModal(
            {
                isOpen: true,
                parentRefCurrent: titleRef.current,
                type: 'tooltip',
                data: { txt: `${titleStat.title ? titleStat.title : ''} ${titleStat.percentageMap.fraction} ${titleStat.percentageMap.percent}` },
                parentId: `${idx}-tooltip`,
                hasCaret: true,
                isCenter: true,
                isPosBlock: true,
                caretClred: true

            })
    }

    function onStatLeave() {
        if (isModalOpen) resetDynamicModal()
    }

    return (
        <div
            className="label-data title-stat"
            ref={titleRef}
            style={{ backgroundColor: titleStat.color, width: titleStat.percentageMap.percent }}
            onMouseEnter={onStatEnter}
            onMouseLeave={onStatLeave}
        ></div>
    )
}
