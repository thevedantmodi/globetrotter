import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import MapPage from "./MapPage";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";

export function NavBar() {
    return (
        <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/map"}>Map</Link>
        </nav>
    )
}

function Main() {
    return (
        <Router>
            {/* <NavBar /> */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </Router>
    )
}

export default Main