// import { NavLink } from "react-router-dom";
import routes from "../routes";

export function Sidebar() {
    return (
        <section className="sidebar">
            <h2>I'm sidebar</h2>
            <nav className="app-nav">
                {/* <NavLink to="/" >Home</NavLink>
                <NavLink to="/board" >Board</NavLink> */}
                {routes.map(route => (
                    <a key={route.path} href={route.path}>{route.label}</a>
                ))}
            </nav>
        </section>
    )
}
