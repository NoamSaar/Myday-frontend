
export function DynamicDialog({ dialogContentComponent, onCloseDialog }) {
    return (
        <div className="dynamic-dialog">
            <div className="black-screen" onClick={onCloseDialog}></div>

            <div className="dialog-content">
                {dialogContentComponent}
            </div>
        </div>
    )
}
