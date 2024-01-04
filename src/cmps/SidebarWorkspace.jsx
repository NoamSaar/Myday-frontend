
export function SidebarWorkspace({ onToggleDropdown, isToggleDropdown }) {
    return (
        <section className="sidebar-workspace">
            <div title="Main Workspace"
                className={`btn workspace-section grid column ${isToggleDropdown ? 'open' : ''}`}
                onClick={onToggleDropdown}>
                <div className="workspace-logo flex justify-center align-center">
                    M
                    <img src="../../public/icons/HomeBlackFill.svg" alt="home-icon" />
                </div>
                <span>Main workspace</span>
                <img src="../../public/icons/DropdownChevronDown.svg" alt="dropdown-icon" />
            </div>
            <div className="sidebar-filter">
                <div className="search-section">
                    <div className="btn">
                        <img src="../../public/icons/Search.svg" alt="search-icon" />
                    </div>
                    <input type="text" />
                </div>
                <button className="btn clrblue">
                    <img src="../../public/icons/AddSmall.svg" alt="add-icon" />
                </button>
            </div>
        </section>
    )
}