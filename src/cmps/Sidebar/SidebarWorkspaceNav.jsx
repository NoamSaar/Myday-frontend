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
                        <div><HomeBlackFillIcon /></div>
                        {/* <img src="../../public/icons/HomeBlackFill.svg" alt="home-icon" /> */}
                    </div>

                    <span>Main workspace</span>

                    <AngleDownIcon />
                </div>
            </section>
            <button className="btn btn-option-menu">
                <MenuIcon />
            </button>
        </>
    )
}