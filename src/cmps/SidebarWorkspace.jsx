
export function SidebarWorkspace(
    { onToggleDropdown, onToggleIsActive, isDropdownOpen, isActive }
) {

    function onAddNewBoard() {

    }

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
            </div>

            <div className="sidebar-filter grid column place-center">
                <div className={`search-section flex justify-center aligh-center${isActive ? 'active' : ''}`}
                    onClick={onToggleIsActive}>
                    <div className="btn search-icon">
                        <img src="../../public/icons/Search.svg" alt="search-icon" />
                    </div>
                    <input type="search" placeholder="Search" />
                </div>

                <button className="btn clrblue" title="Add Item to Workspace"
                    onClick={onAddNewBoard}>
                    <img src="../../public/icons/AddSmall.svg" alt="add-icon" />
                </button>
            </div>
        </section>
    )
}