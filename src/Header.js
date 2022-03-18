import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <nav>
            <NavLink exact activeClassName = "active" to="/">
                Home
            </NavLink>
            <NavLink exact activeClassName= "active" to ="/pages/Member.js">
                Member
            </NavLink>
        </nav>
    )
}

export default Header;