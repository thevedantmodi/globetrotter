"use client"

import React, { useState } from "react"
import { Moon, Sun } from "@phosphor-icons/react"

import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function UnitsModeButton({ styles }) {
    const [units, setUnits] = useState("miles")

    return (
        <div className={styles}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        {units === "miles" ?
                            <p className="h-[1.2rem] w-[1.2rem] 
                            scale-100 transition-all ease-in-out
                            dark:scale-100">mi</p>
                            : <p className="absolute h-[1.2rem] 
                            w-[1.2rem] scale-100 transition-all ease-in-out
                            dark:scale-100">km</p>}
                        <span className="sr-only">Toggle units</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setUnits("miles")}>
                        Miles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setUnits("kilometers")}>
                        Kilometers
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}