import { useState } from "react";
import { SidebarMainNav } from "./SidebarMainNav";
import { SidebarWorkspace } from "./SidebarWorkspace";
import { SidebarBoardNav } from "./SidebarBoardNav";

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [isNotActive, setIsNotActive] = useState(true)

    function onOpenSidebar() {
        setIsSidebarOpen(!isSidebarOpen)
    }

    function onToggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen)
    }

    function onToggleIsActive() {
        setIsActive(!isActive)
    }

    return (
        <section className="sidebar-container">
            <article className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <SidebarMainNav
                    onToggleIsActive={onToggleIsActive}
                    onOpenSidebar={onOpenSidebar}
                    isSidebarOpen={isSidebarOpen}
                    isActive={isActive} />
                <SidebarWorkspace
                    onToggleDropdown={onToggleDropdown}
                    onToggleIsActive={onToggleIsActive}
                    isDropdownOpen={isDropdownOpen}
                    isActive={isActive} />
                <SidebarBoardNav

                    isActive={isActive} />
            </article>
        </section>

    )
}
