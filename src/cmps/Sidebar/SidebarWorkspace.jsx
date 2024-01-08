import { SidebarFilter } from "./SidebarFilter"
import { SidebarWorkspaceNav } from "./SidebarWorkspaceNav"

export function SidebarWorkspace(
    {
        filterBy,
        isFocus,
        isDropdownOpen,
        onSetFilter,
        onToggleIsFocus,
        onToggleDropdown,
        onAddNewBoard,
    }) {

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