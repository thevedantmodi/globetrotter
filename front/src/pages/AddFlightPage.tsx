import React, { useRef } from "react"
import {
    AddFlightForm,
    AddFlightFormValues,
    AddFlightAPI
} from "../components/AddFlightForm"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import type { AuthUserData } from "../components/RequireAuth"
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'


export default function AddFlightPage() {
    const authUser = useAuthUser<AuthUserData>()
    const navigate = useNavigate()
    const AddFlightFormRef = useRef<AddFlightAPI>(null)
    const onSubmit = async (data: AddFlightFormValues) => {
        console.log(data)

        await axios.post('/flights/add', {
            username: authUser?.username, 
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
