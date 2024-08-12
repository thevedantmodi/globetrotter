"use client"

import React, { useState } from "react"
import { Moon, Sun, Circle } from "@phosphor-icons/react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function ModeToggle({ styles }: { styles: string }) {
  const { theme, setTheme } = useTheme()

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={isOpen ? handleClose : handleOpen}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>

        <div
          className={`${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity duration-300 ease-in-out`}
        >
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <div className="flex justify-between items-center w-full">
                <div>Light</div>
                <div>
                  {theme === 'light' && <Circle className={"text-gray-500"}
                    size={20} weight="fill" />}
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <div className="flex justify-between items-center w-full">
                <div>Dark</div>
                <div>
                  {theme === 'dark' && <Circle className={"dark:text-blue-400"}
                    size={20} weight="fill" />}
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <div className="flex justify-between items-center w-full">
                <div>System</div>
                <div>
                  {theme === 'system' && <Circle className={"dark:text-blue-400 text-gray-500"}
                    size={20} weight="fill" />}
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
}