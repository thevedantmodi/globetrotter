import React, { useCallback } from "react";
import { ModeToggle } from "../components/DarkModeButton";
import { Input } from "react-daisyui"
import { useForm, SubmitHandler } from "react-hook-form"
import { SignUpField } from "../components/SignUpField";

type Inputs = {
    email: string
    password: string
    confirm_password: string
}

export default function SignUpPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    const onValid = useCallback((data: any) => {
        console.log(data)
    }, [])


    console.log(errors)


    return (
        <form style={{
            display: 'flex',
            flexFlow: 'column',
            gap: 15,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}
            onSubmit={handleSubmit(onValid)}

        >

            {/* <ModeToggle styles="" /> */}
            <SignUpField
                id="email"
                label="Email address"
                type="email"
                inputProps={register("email", { required: "Must enter an email address" })}
                error={errors.email?.message}
            />
            <SignUpField
                id="password"
                label="Password"
                type="password"
                inputProps={register("password", { required: "Must enter a password" })}
                error={errors.password?.message}
            />
            <SignUpField
                id="confirm-password"
                label="Confirm Password"
                type="password"
                inputProps={register("confirm_password", { required: "Must confirm password" })}
                error={errors.confirm_password?.message}
            />
            

            <button>Submit</button>
        </form>
    )
}