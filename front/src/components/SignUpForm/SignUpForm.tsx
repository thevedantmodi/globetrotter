import React, { forwardRef, useImperativeHandle, useRef } from "react"
import { useForm } from "react-hook-form"
import { SignUpField } from "./SignUpField";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "react-daisyui";

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

export type SignUpFormValues = z.infer<typeof SignUpSchema>

export interface SignUpFormProps {
    onSubmitReady: (data: SignUpFormValues) => Promise<void>
}

export interface SignUpAPI {
    setErrors: (errors: Record<string, string>) => void
}

export const SignUpForm = forwardRef<SignUpAPI, SignUpFormProps>
    ((props: SignUpFormProps, ref) => {
        const {
            register,
            handleSubmit,
            setError,
            formState: { errors, isSubmitting },
        } = useForm<Inputs>({
            resolver: zodResolver(SignUpSchema)
        })

        const setErrorRef = useRef(setError)
        setErrorRef.current = setError
        /* Allows for parent of this component to call fn's */
        useImperativeHandle(ref, () => {
            return {
                setErrors: (errors: Record<string, string>) => {
                    Object.entries(errors).forEach(([key, error]) => {
                        setErrorRef.current(key as "email" | "password" | "confirm_password"
                            , { message: error })
                    })
                }
            }
        })

        return (
            <form style={{
                display: 'flex',
                flexFlow: 'column',
                gap: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
                onSubmit={handleSubmit(props.onSubmitReady)}

            >
                <h2>Sign Up</h2>
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
                <Button loading={isSubmitting} color="neutral"
                active={!isSubmitting}
                >{isSubmitting ? "Loading..." : "Submit"}</Button>
            </form>)
    })

SignUpForm.displayName = 'ForwardRefedSignupForm'
