import React, { useCallback } from "react";
import { ModeToggle } from "../components/DarkModeButton";
import { Input } from "react-daisyui"
import { useForm, SubmitHandler } from "react-hook-form"
import { SignUpField } from "../components/SignUpField";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
    email: string
    password: string
    confirm_password: string
}

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
    /* TODO: change here for req characters */
    confirm_password: z.string().min(6).max(32),
})
    /* ensure pwds match */
    .refine((form) => {
        return form.confirm_password === form.password
    },
        {
            message: "Passwords must match",
            path: ["confirm_password"]
        }

    )

export default function SignUpPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(SignUpSchema)
    })

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
                inputProps={register("email")}
                error={errors.email?.message}
            />
            <SignUpField
                id="password"
                label="Password"
                type="password"
                inputProps={register("password")}
                error={errors.password?.message}
            />
            <SignUpField
                id="confirm-password"
                label="Confirm Password"
                type="password"
                inputProps={register("confirm_password")}
                error={errors.confirm_password?.message}
            />
            <button>Submit</button>
        </form>
    )
}