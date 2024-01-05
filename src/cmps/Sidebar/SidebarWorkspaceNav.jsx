
export function SidebarWorkspaceNav({ onToggleDropdown, isDropdownOpen }) {
    return (
        <section className="sidebar-workspace">
            <div title="Main Workspace"
                className={`btn workspace-section grid column ${isDropdownOpen ? 'open' : ''}`}
                onClick={onToggleDropdown}>
                <div className="workspace-logo flex justify-center align-center">
                    M
                    <img src="../../public/icons/HomeBlackFill.svg" alt="home-icon" />
                </div>

                <span>Main workspace</span>

                <img src="../../public/icons/DropdownChevronDown.svg" alt="dropdown-icon" />
                <img className="btn btn-board-menu" src="../../public/icons/menu.svg" alt="Board Menu" />
            </div>
        </section>
    )
}