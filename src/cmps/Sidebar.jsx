import { NavLink } from "react-router-dom";

export function Sidebar() {
    return (
        <section className="sidebar">
            <h2>I'm sidebar</h2>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                {/* <NavLink to="/board" >Board</NavLink> */}
            </nav>
        </section>
    )
}
