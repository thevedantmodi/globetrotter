import React from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"

import { Button } from "./ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="departure"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Departure</FormLabel>
                        <FormControl>
                            <Input placeholder="MM/DD/YYYY" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}

            >

            </FormField>
            <Button type="submit">Submit</Button>
        </form >

    </Form >
}