
export function SidebarWorkspaceNav({ onToggleDropdown, isDropdownOpen }) {
    return (
        <>
            <section className="sidebar-workspace-nav">
                <div className={`btn workspace-section grid column ${isDropdownOpen ? 'open' : ''}`}
                    onClick={onToggleDropdown}
                    title="Main Workspace">
                    <div className="workspace-logo flex justify-center align-center">
                        M
                        <img src="../../public/icons/HomeBlackFill.svg" alt="home-icon" />
                    </div>

                    <span>Main workspace</span>

                    <img src="../../public/icons/DropdownChevronDown.svg" alt="dropdown-icon" />
                </div>
            </section>

            <img className="btn btn-option-menu" src="../../public/icons/menu.svg" alt="Board Menu" />
        </>
    )
}