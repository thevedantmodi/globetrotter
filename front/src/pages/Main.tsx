import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import MapPage from "./MapPage";

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
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/map" element={<MapPage />} />
            </Routes>
        </Router>
    )
}

export default Main