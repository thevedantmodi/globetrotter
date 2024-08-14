import React, { useCallback, useRef } from "react";
import { ModeToggle } from "../components/DarkModeButton";
import { Input } from "react-daisyui"
import {
    SignUpForm,
    SignUpFormValues,
    SignUpAPI
} from "../components/SignUpForm/SignUpForm";
import axios from 'axios'

const SignUpPage = () => {

    const SignUpFormRef = useRef<SignUpAPI>(null)

    const onSubmit = async (data: SignUpFormValues) => {

        const delay = (ms: number) =>
            new Promise(resolve => setTimeout(resolve, ms));

        await delay(2000);

        await axios.post('/sign-up', {
            email: data.email,
            password: data.password
        }).then((res) => {
            const errors = res.data.errors
            const success = res.data.success

            if (!success) { /* Set errors for child */
                SignUpFormRef.current?.setErrors(errors)
            }
        }).catch((err) => {
            console.log("ERROR: ", err)
        })
    }

    return (
        <SignUpForm
            ref={SignUpFormRef}
            onSubmitReady={onSubmit} />
    )

}


export default SignUpPage