import React, { useState } from "react";

import SlidingWrapper from "../components/SlidingWrapper";

import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';


export default function SettingsPage() {
    const [expanded, setExpanded] = useState(true)
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div>
            <Drawer opened={opened} onClose={close} title="Authentication">
                {/* Drawer content */}
            </Drawer>

            <Button onClick={open}>Open Drawer</Button>
        </div>
    )
}
