import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import MapPage from "./MapPage";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";
import SignUpPage from "./SignUpPage";
import LogInPage from "./LogInPage";
import CreateProfilePage from "./CreateProfilePage";
import AddFlightPage from "./AddFlightPage"

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
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/create-profile" element={<CreateProfilePage />} />
                <Route path="/add-flight" element={<AddFlightPage />} />
            </Routes>
        </Router>
    )
}

export default Main