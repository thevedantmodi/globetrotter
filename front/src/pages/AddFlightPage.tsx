import React, { useState } from "react"
import Modal from "../components/Modal"
import { Trash } from "@phosphor-icons/react"
import { AddFlightForm, AddFlightFormValues } from "../components/AddFlightForm"
import axios from "axios"

export default function AddFlightPage() {
    const onSubmit = async (data: AddFlightFormValues) => {
        console.log("Sucess!")
        console.log(data)
    }

    return (
        <>
            <AddFlightForm onSubmitReady={onSubmit} />
        </>)
}
