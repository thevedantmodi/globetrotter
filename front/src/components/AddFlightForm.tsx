import React from "react";
import { z } from "zod"
import {zodResolver}


const formSchema = z.object({
    departure: z.object({
        date: z.string().datetime({ offset: true }),
        /* TODO: Find if belongs in IATA code set */
        port: z.string()
            .length(3, { message: "Must be three characters long" })
            .toUpperCase()
    }),
    arrival: z.object({
        date: z.string().datetime({ offset: true }),
        /* TODO: Find if belongs in IATA code */
        port: z.string()
            .length(3, { message: "Must be three characters long" })
            .toUpperCase()
    }),
    carrier: z.string().length(2, { message: "Must be two characters long" }),
    number: z.number().min(1).max(9999)
})

export default function AddFlightForm() {
    const form = useFor
}