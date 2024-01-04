import { useState } from "react";
import { SidebarMainNav } from "./SidebarMainNav";
import { SidebarWorkspace } from "./SidebarWorkspace";

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isToggleDropdown, setIsToggleDropdown] = useState(false)
    const [isActive, setIsActive] = useState(false)

    function onOpenSidebar() {
        setIsSidebarOpen(!isSidebarOpen)
    }

    function onToggleDropdown() {
        setIsToggleDropdown(!isToggleDropdown)
    }

    function onToggleIsActive() {
        setIsActive(!isActive)
    }

    return (
        <section className="sidebar-container">
            <article className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <SidebarMainNav onToggleIsActive={onToggleIsActive} onOpenSidebar={onOpenSidebar} isActive={isActive} />
                <SidebarWorkspace onToggleDropdown={onToggleDropdown} isToggleDropdown={isToggleDropdown} />

                <nav className="sidebar-board-nav"></nav>
            </article>
        </section>

    )
}
