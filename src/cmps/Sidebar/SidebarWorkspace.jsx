import { SidebarFilter } from "./SidebarFilter";
import { SidebarWorkspaceNav } from "./SidebarWorkspaceNav";

export function SidebarWorkspace(
    { onToggleDropdown, onToggleIsActive, isDropdownOpen, isActive, onAddNewBoard }
) {
    return (
        <section className="sidebar-workspace">
            <SidebarWorkspaceNav
                onToggleDropdown={onToggleDropdown}
                isDropdownOpen={isDropdownOpen}
            />
            <SidebarFilter
                onToggleIsActive={onToggleIsActive}
                isActive={isActive}
                onAddNewBoard={onAddNewBoard}
            />
        </section>
    )
}