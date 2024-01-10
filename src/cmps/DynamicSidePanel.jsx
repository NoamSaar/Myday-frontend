import { useSelector } from "react-redux"
import { MenuIcon } from "../services/svg.service";

export function DynamicSidePanel() {
    const { isPanelOpen, type, data } = useSelector((storeState) => storeState.systemModule.sidePanelData)

    return (
        <>
            {isPanelOpen &&
                <DynamicSidePanelCmp type={type} data={data} />
            }
        </>
    )

}

function DynamicSidePanelCmp({ type, data }) {
    <section className="side-panel">
        <PanelHeader data={data} type={type} />
        <PanelBody data={data} type={type} />
    </section>
}

function PanelHeader({ data, type }) {
    function onSwitchToSubject() {
        setDynamicPanelType()
    }

    return (
        <div className="panel-header grid">
            <button className="btn">X</button>
            <section className="panel-title-section">
                <h2>{data.title}</h2>
                {
                    (type === 'preview')
                        ?
                        <div className="title-section-actions">
                            <span className="panel-members">
                                <MemberPicker members={data.person} />
                            </span>
                            <MenuIcon />
                        </div>
                        : ''
                }
            </section>
            <section className="panel-subjects">
                {
                    data.headerSubjects.map((sub, idx) => (
                        <button key={sub} className="btn" onClick={onSwitchToSubject}>
                            {sub.content}
                        </button>
                    ))
                }
            </section>
        </div>
    )
}

export function DynamicAbsoluteModal() {
    const isOpen = useSelector((storeState) => storeState.systemModule.DynamicModalIsOpen)
    const boundingRect = useSelector((storeState) => storeState.systemModule.dynamicModalBoundingRect)
    const type = useSelector((storeState) => storeState.systemModule.dynamicModalType)
    const data = useSelector((storeState) => storeState.systemModule.dynamicModalData)

    return (
        <div className="dynamic-absolute-modal">
            {isOpen && <dynamicModal type={type} data={data} />}
        </div>
    )
}

function dynamicModal(props) {
    switch (props.type) {
        case 'color picker':
            return <ColorPickerModal colors={props.data.colors} onColorClick={props.data.onColorClick} />

        case 'menu options':
            return <MenuOptionsModal options={props.data.options} />

    }
}