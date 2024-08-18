import React, { useRef } from "react"
import {
    AddFlightForm,
    AddFlightFormValues,
    AddFlightAPI
} from "../components/AddFlightForm"
import axios from "axios"

export default function AddFlightPage() {
    const AddFlightFormRef = useRef<AddFlightAPI>(null)
    const onSubmit = async (data: AddFlightFormValues) => {
        console.log(data)
        /* TODO: Validate carriers, IATA codes */
        const error = {
            "carrier": "Cannot be BA" 
        }
        if (data.carrier === "BA") {
            AddFlightFormRef.current?.setErrors(error)
        }
    }

    return (
        <>
            <AddFlightForm
                ref={AddFlightFormRef}
                onSubmitReady={onSubmit}
            />
        </>)
}
