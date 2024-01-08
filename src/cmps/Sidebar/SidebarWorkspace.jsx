import { SidebarFilter } from "./SidebarFilter"
import { SidebarWorkspaceNav } from "./SidebarWorkspaceNav"

export function SidebarWorkspace(props) {
    const {
        filterBy,
        isFocus,
        isDropdownOpen,
        onSetFilter,
        onToggleIsFocus,
        onToggleDropdown,
        onAddNewBoard,
    } = props

    return (
        <section className="sidebar-workspace">
            <SidebarWorkspaceNav
                isDropdownOpen={isDropdownOpen}
                onToggleDropdown={onToggleDropdown}
            />
            <SidebarFilter
                filterBy={filterBy}
                onAddNewBoard={onAddNewBoard}
                onSetFilter={onSetFilter}
                isFocus={isFocus}
                onToggleIsFocus={onToggleIsFocus}
            />
        </section>
    )
}