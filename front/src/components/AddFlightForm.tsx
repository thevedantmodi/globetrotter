import React from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"

interface AddFlightInput {
    departure: {
        date: string
        port: string
    }
    arrival: {
        date: string
        port: string
    }
    carrier: string
    number: number
}


const formSchema = z.object({
    departure: z.object({
        date: z.string()
            .datetime({ offset: true })
            .default("1970-01-01T00:00:00Z"),
        /* TODO: Find if belongs in IATA code set */
        port: z.string()
            .length(3, { message: "Must be three characters long" })
            .toUpperCase()
    }),
    arrival: z.object({
        date: z.string()
            .datetime({ offset: true })
            .default("1970-01-01T00:00:00Z"),
        /* TODO: Find if belongs in IATA code */
        port: z.string()
            .length(3, { message: "Must be three characters long" })
            .toUpperCase()
    }),
    carrier: z.string().length(2, { message: "Must be two characters long" }),
    number: z.number().min(1).max(9999)
})

export function AddFlightForm() {
    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    // })

    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <></>
    )
}