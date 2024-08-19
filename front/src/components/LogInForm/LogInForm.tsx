import React, { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { FormField } from "../FormField";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "react-daisyui";

type Inputs = {
    user_or_email: string
    password: string
}

const not_email: RegExp = /^(?!.*.@.).*$/

const LogInSchema = z.object({
    user_or_email: z.union(
        [z.string()
            .min(1, "Email or username is required")
            .email()
            .max(128)
            .trim(),
        z.string()
        .regex(not_email) /* Choose username if not email */
        .min(1)
        .max(32)
    ]),
    password: z.string().min(6).max(32),
})

export type LogInFormValues = z.infer<typeof LogInSchema>

export interface LogInFormProps {
    onSubmitReady: (data: LogInFormValues) => Promise<void>
    suffix?: React.ReactElement
}

export interface LogInAPI {
    setErrors: (errors: Record<string, string>) => void
    setFatalError: () => void
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

        const [showFatalError, setShowFatalError] = useState(false)


        const setErrorRef = useRef(setError)
        setErrorRef.current = setError
        /* Allows for parent of this component to call fn's */
        useImperativeHandle(ref, () => {
            return {
                setErrors: (errors: Record<string, string>) => {
                    Object.entries(errors).forEach(([key, error]) => {
                        setErrorRef.current(key as "user_or_email" | "password"
                            , { message: error })
                    })
                },
                setFatalError: () => {
                    setShowFatalError(true)
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
                    id="user_or_email"
                    label="Email address or username"
                    type="text"
                    inputProps={register("user_or_email")}
                    error={errors.user_or_email?.message}
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

LogInForm.displayName = 'ForwardRefedLogInForm'
