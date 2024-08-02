import React from "react";
import { Button } from "@mantine/core"
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col p-4 border items-center">
                <div>
                    Welcome to Closed Flights!
                </div>
                <Button variant="filled" size="md" radius="md"
                    component={Link} to={"/map"}
                    className="mt-4">Enter</Button>
            </div>
        </div>
    )
}