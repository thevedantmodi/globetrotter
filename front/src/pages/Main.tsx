import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import MapPage from "./MapPage";
import HomePage from "./HomePage";
import SettingsPage from "./SettingsPage";
import SignUpPage from "./SignUpPage";
import LogInPage from "./LogInPage";
import CreateProfilePage from "./CreateProfilePage";
import AddFlightPage from "./AddFlightPage"
import RequireAuth from "../components/RequireAuth";
import Unauthorized from "./Unauthorized";

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
                <Route path="/" element={<MapPage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route element={<RequireAuth />}>
                    <Route path="/create-profile" element={<CreateProfilePage />} />
                    <Route path="/add-flight" element={<AddFlightPage />} />
                    <Route path="/sign-out" element={<></>} />
                </Route>
            </Routes>
        </Router>
    )
}

export default Main