import { AngleDownIcon, HomeBlackFillIcon, MenuIcon } from "../../services/svg.service"

export function SidebarWorkspaceNav({ onToggleDropdown, isDropdownOpen }) {
    return (
        <>
            <section className="sidebar-workspace-nav">
                <div className={`btn workspace-section grid column ${isDropdownOpen ? 'open' : ''}`}
                    onClick={onToggleDropdown}
                    title="Main Workspace"
                >
                    <div className="workspace-logo flex justify-center align-center">
                        M
                        <div className="home-icon"><HomeBlackFillIcon /></div>
                    </div>

                    <span>Main workspace</span>

                    <div className="flex angle-down-container">
                        <AngleDownIcon />
                    </div>
                </div>
            </section>
            <button className="btn btn-option-menu">
                <MenuIcon />
            </button>
        </>
    )
}