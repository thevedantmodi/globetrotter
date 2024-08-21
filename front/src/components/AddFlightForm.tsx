import React, { forwardRef, useImperativeHandle, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { FormField } from "./FormField";
import { Button } from "react-daisyui";
import DatePickerField from "./DatePickerField";


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
    price: number
}

const formSchema = z.object({
    departure: z.object({
        date: z.string()
            .datetime()
        ,
        /* TODO: Find if belongs in IATA code set */
        port: z.string()
            .length(3, { message: "Must be three characters long" })
            .toUpperCase()
    }),
    arrival: z.object({
        date: z.string()
            .datetime()
        ,
        //     /* TODO: Find if belongs in IATA code */
        port: z.string()
            .length(3, { message: "Must be three characters long" })
            .toUpperCase()
    }),
    carrier: z.string()
        .length(2, { message: "Must be two characters long" })
        .toUpperCase(),
    number: z.number().min(1).max(9999),
    price: z.number()
})

export type AddFlightFormValues = z.infer<typeof formSchema>

export interface AddFlightFormProps {
    onSubmitReady: (data: AddFlightFormValues) => Promise<void>
    suffix?: React.ReactElement
}

export interface AddFlightAPI {
    setErrors: (errors: Record<string, string>) => void
}

export const AddFlightForm = forwardRef<AddFlightAPI, AddFlightFormProps>
    ((props: AddFlightFormProps, ref) => {
        const {
            register,
            control,
            handleSubmit,
            setError,
            formState: { errors, isSubmitting },
        } = useForm<AddFlightInput>({
            resolver: zodResolver(formSchema)
        })

        const setErrorRef = useRef(setError)
        setErrorRef.current = setError
        /* Allows for parent of this component to call fn's */
        useImperativeHandle(ref, () => {
            return {
                setErrors: (errors: Record<string, string>) => {
                    Object.entries(errors).forEach(([key, error]) => {
                        setErrorRef.current(key as "departure.date" |
                            "departure.port" |
                            "arrival.date" |
                            "arrival.port" |
                            "carrier" |
                            "number",
                            { message: error })
                    })
                }
            }
        })

        return (
            <form style={{
                display: 'flex',
                flexFlow: 'column',
                gap: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
                onSubmit={handleSubmit(props.onSubmitReady)}

            >
                <h2 className="font-bold text-xl">Add a flight</h2>
                {/* <ModeToggle styles="" /> */}

                <h3 className="font-bold text-xl">Departure</h3>
                {/* <span>{JSON.stringify(watch("departure.date"))}</span> */}

                <DatePickerField
                    control={control}
                    name="departure.date"
                    label="Date"
                    id="dept-date"
                />

                <FormField
                    id="departure-port"
                    label="Port"
                    type="text"
                    inputProps={register("departure.port")}
                    error={errors.departure?.port?.message}
                />
                <h3 className="font-bold text-xl">Arrival</h3>

                <DatePickerField
                    control={control}
                    name="arrival.date"
                    label="Date"
                    id="arr-date"
                />

                <FormField
                    id="arrival-port"
                    label="Port"
                    type="text"
                    inputProps={register("arrival.port")}
                    error={errors.arrival?.port?.message}
                />
                <h3 className="font-bold text-xl">Vessel</h3>
                <FormField
                    id="carrier"
                    label="Carrier"
                    type="text"
                    inputProps={register("carrier")}
                    error={errors.carrier?.message}
                />
                <FormField
                    id="number"
                    label="Number"
                    type="number"
                    inputProps={register("number", { valueAsNumber: true })}
                    error={errors.number?.message}
                />
                <FormField
                    id="price"
                    label="Price"
                    type="number"
                    inputProps={register("price", { valueAsNumber: true })}
                    error={errors.price?.message}
                />

                <Button loading={isSubmitting} color="neutral"
                    active={!isSubmitting}
                >{isSubmitting ? "Loading..." : "Submit"}</Button>

                {props.suffix}
            </form >)
    })
AddFlightForm.displayName = 'ForwardRefedAddFlightForm'

