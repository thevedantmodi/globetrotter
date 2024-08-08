import { AlertDialogDemo } from "../components/AddFlight";
import { ModeToggle } from "../components/DarkModeButton";
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col p-4 border-0 items-center">
                <div className="font-semibold">
                    Welcome to Closed Flights!
                </div>
                <Link to={"/map"} className="mt-4">
                    Enter
                </Link>
                <AlertDialogDemo />
            </div>
        </div>
    )
}