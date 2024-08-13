import React, { useCallback } from "react";
import { ModeToggle } from "../components/DarkModeButton";
import { Input } from "react-daisyui"
import SignUpForm, { SignUpFormValues } from "../components/SignUpForm/SignUpForm";
import axios from 'axios'

const SignUpPage = () => {

    const onSubmit = async (data: SignUpFormValues) => {
        await axios.post('/sign-up', {
            email: data.email,
            password: data.password
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log("ERROR: ", err)
        })
    }

    return (
        <SignUpForm
            onSubmitReady={onSubmit} />
    )

}


export default SignUpPage