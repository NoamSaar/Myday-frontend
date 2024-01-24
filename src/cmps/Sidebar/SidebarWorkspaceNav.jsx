import { HomeBlackFillIcon, MenuIcon } from "../../services/svg.service"
import Workspace from "../Workspace"

export function SidebarWorkspaceNav() {
    return (
        <>
            <section className="sidebar-workspace-nav">
                <Workspace />
            </section>
            <button className="btn btn-option-menu svg-inherit-color">
                <MenuIcon />
            </button>
        </>
    )
}