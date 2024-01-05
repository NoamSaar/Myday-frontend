
export function SidebarFilter({ onToggleIsFocus, isFocus, onAddNewBoard }) {
    return (
        <>
            <div className="sidebar-filter grid column place-center">
                <div className={`search-section flex aligh-center ${isFocus ? 'active' : ''}`}
                    onClick={onToggleIsFocus}>
                    <div className="btn search-icon">
                        <img src="../../public/icons/Search.svg" alt="search-icon" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search"
                        onBlur={onToggleIsFocus}
                    />
                </div>

            </div>
            <button className="btn clrblue" title="Add Item to Workspace"
                onClick={onAddNewBoard}>
                <img src="../../public/icons/AddSmall.svg" alt="add-icon" />
            </button>
        </>
    )
}