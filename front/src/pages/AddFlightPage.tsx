import React, { useRef } from "react"
import {
    AddFlightForm,
    AddFlightFormValues,
    AddFlightAPI
} from "../components/AddFlightForm"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function AddFlightPage() {
    const navigate = useNavigate()
    const { auth } = useAuth()
    const AddFlightFormRef = useRef<AddFlightAPI>(null)
    const onSubmit = async (data: AddFlightFormValues) => {
        console.log(data)

        await axios.post('/flights/add', {
            username: auth.user, 
            departure: data.departure,
            arrival: data.arrival,
            carrier: data.carrier,
            number: data.number,
            price: data.price
        }).then((res) => {
            // navigate('/map')
            console.log(res);
        }).catch((err) => {
            const errors = err.response?.data?.errors

            if (errors) {
                AddFlightFormRef.current?.setErrors(errors)
            } else {
                AddFlightFormRef.current?.setFatalError()
            }
        })
        /* TODO: Validate carriers, IATA codes */
    }

    return (
        <>
            <AddFlightForm
                ref={AddFlightFormRef}
                onSubmitReady={onSubmit}
            />
        </>)
}
