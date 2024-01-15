import { useSelector } from "react-redux"

export function DynamicDialog() {
    const dialogData = useSelector((storeState) => storeState.systemModule.dynamicDialog)

    if (!dialogData.isOpen) return
    return (
        <div className="dynamic-dialog">
            <div className="black-screen"></div>

            <div className="dialog-content">
                {dialogData.contentCmp}
            </div>
        </div>
    )
}
