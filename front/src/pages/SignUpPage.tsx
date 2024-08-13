import React, { useCallback } from "react";
import { ModeToggle } from "../components/DarkModeButton";
import { Input } from "react-daisyui"
import SignUpForm, { SignUpFormValues } from "../components/SignUpForm/SignUpForm";
import axios from 'axios'



const SignUpPage = () => {

    return (
        <SignUpForm
            onSubmitReady={async (data: SignUpFormValues) => {
                {
                    await axios.post('/sign-up', {
                        email: data.email,
                        password: data.password
                    })
                        .then((response) => {
                            console.log(response)
                        }).catch((error) => {
                            console.log(error)
                        })

                }
            }} />
    )

}


export default SignUpPage