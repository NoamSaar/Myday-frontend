import { SidebarFilter } from "./SidebarFilter"
import { SidebarWorkspaceNav } from "./SidebarWorkspaceNav"

export function SidebarWorkspace(
    {
        filterBy,
        isDropdownOpen,
        onSetFilter,
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
            />
        </section>
    )
}