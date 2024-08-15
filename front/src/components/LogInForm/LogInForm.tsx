import React, { forwardRef, useImperativeHandle, useRef } from "react"
import { useForm } from "react-hook-form"
import { FormField } from "../FormField";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "react-daisyui";

type Inputs = {
    email: string
    password: string
    confirm_password: string
}

const LogInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
})

export type LogInFormValues = z.infer<typeof LogInSchema>

export interface LogInFormProps {
    onSubmitReady: (data: LogInFormValues) => Promise<void>
    suffix?: React.ReactElement
}

export interface LogInAPI {
    setErrors: (errors: Record<string, string>) => void
}

export const LogInForm = forwardRef<LogInAPI, LogInFormProps>
    ((props: LogInFormProps, ref) => {
        const {
            register,
            handleSubmit,
            setError,
            formState: { errors, isSubmitting },
        } = useForm<Inputs>({
            resolver: zodResolver(LogInSchema)
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
                <h2 className="font-bold text-xl">Login</h2>
                {/* <ModeToggle styles="" /> */}    
                <FormField
                    id="email"
                    label="Email address"
                    type="email"
                    inputProps={register("email")}
                    error={errors.email?.message}
                />
                <FormField
                    id="password"
                    label="Password"
                    type="password"
                    inputProps={register("password")}
                    error={errors.password?.message}
                />
                <Button loading={isSubmitting} color="neutral"
                active={!isSubmitting}
                >{isSubmitting ? "Loading..." : "Submit"}</Button>

                {props.suffix}
            </form>)
    })

LogInForm.displayName = 'ForwardRefedSignupForm'
