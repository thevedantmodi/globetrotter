import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { FormField } from "./FormField";
import { Button } from "react-daisyui";
import DatePickerField from "./DatePickerField";
import ErrorField from "./ErrorField";
import { RHFAutocompleteField as AutoCompleteField } from "./AutoCompleteField";
import axios from "axios";

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
    setFatalError: () => void
}

export const AddFlightForm = forwardRef<AddFlightAPI, AddFlightFormProps>((props:
    AddFlightFormProps, ref) => {
    const {
        register,
        control,
        handleSubmit,
        setError,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<AddFlightInput>({
        resolver: zodResolver(formSchema)
    })

    const [showFatalError, setShowFatalError] = useState(false)


    const fetchPortOptions = async (input: string) => {
        try {
            const response = await axios.post('/airports/port-options',
                { query: input })

            const data = response.data
            return data.map((item: any) => ({
                id: item.id,
                label: item.label
            }))
        } catch (err) {
            console.log(err);
            return []
        }
    }

    const fetchCarrierOptions = async (input: string) => {
        try {
            const response = await axios.post('/carriers/options',
                { query: input })

            const data = response.data
            return data.map((item: any) => ({
                id: item.id,
                label: item.label
            }))
        } catch (err) {
            console.log(err);
            return []
        }
    }

    const setErrorRef = useRef(setError)
    setErrorRef.current = setError
    /* Allows for parent of this component to call fn's */
    useImperativeHandle(ref, () => {
        return {
            setErrors: (errors: Record<string, string>) => {
                Object.entries(errors).forEach(([key, error]) => {
                    setErrorRef.current(key as keyof AddFlightFormValues,
                        { message: error })
                })
            },
            setFatalError: () => {
                setShowFatalError(true)
            }
        }
    })

    return (
        <form
            className="
                    flex
                    flex-col
                    gap-4
                    items-center
                    justify-start
                    h-screen
                    overflow-y-auto
                    p-5
                    box-border
                "
            onSubmit={handleSubmit(props.onSubmitReady)}

        >
            <h2 className="font-bold text-xl">Add a flight</h2>

            <h3 className="font-bold text-xl">Departure</h3>
            <DatePickerField
                control={control}
                name="departure.date"
                label="Date"
                id="dept-date"
            />

            <AutoCompleteField
                id="departure-port"
                label="Port"
                initialOptions={[]}
                fetchOptions={fetchPortOptions}
                control={control}
                name="departure.port"
                placeholder="Select port"
            />

            <h3 className="font-bold text-xl">Arrival</h3>

            <DatePickerField
                control={control}
                name="arrival.date"
                label="Date"
                id="arr-date"
            />

            <AutoCompleteField
                id="arrival-port"
                label="Port"
                initialOptions={[]}
                fetchOptions={fetchPortOptions}
                control={control}
                name="arrival.port"
                placeholder="Select port"
            />

            <h3 className="font-bold text-xl">Vessel</h3>

            <AutoCompleteField
                id="carrier"
                label="Carrier"
                initialOptions={[]}
                fetchOptions={fetchCarrierOptions}
                control={control}
                name="carrier"
                placeholder="Select carrier"
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
                type="text"
                inputProps={register("price", { valueAsNumber: true })}
                error={errors.price?.message}
            />

            {
                showFatalError &&
                <ErrorField message="Fatal error occurred. Try again later!" />
            }

            <Button loading={isSubmitting} color="neutral"
                active={!isSubmitting}
            >{isSubmitting ? "Loading..." : "Submit"}</Button>

            {props.suffix}
        </form >)
})
AddFlightForm.displayName = 'ForwardRefedAddFlightForm'

export type FlightInputValues = AddFlightInput