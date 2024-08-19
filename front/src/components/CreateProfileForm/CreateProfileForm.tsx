import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { FormField } from "../FormField";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "react-daisyui";
import ErrorField from "../ErrorField";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import FileField from "../../components/FileField";

const CreateProfileSchema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    hometown: z.string().min(1).max(32).optional(),
    dp: z.any().optional(),
})

export type CreateProfileFormValues = z.infer<typeof CreateProfileSchema>

export interface CreateProfileFormProps {
    onSubmitReady: (data: CreateProfileFormValues) => Promise<void>
    suffix?: React.ReactElement
    username: string
}

export interface CreateProfileAPI {
    setErrors: (errors: Record<string, string>) => void
    setFatalError: () => void
}

export const CreateProfileForm = forwardRef<CreateProfileAPI, CreateProfileFormProps>
    ((props: CreateProfileFormProps, ref) => {
        const {
            register,
            handleSubmit,
            setError,
            formState: { errors, isSubmitting },
        } = useForm<CreateProfileFormValues>({
            resolver: zodResolver(CreateProfileSchema)
        })

        const [showFatalError, setShowFatalError] = useState(false)

        const setErrorRef = useRef(setError)
        setErrorRef.current = setError
        /* Allows for parent of this component to call fn's */
        useImperativeHandle(ref, () => {
            return {
                setErrors: (errors: Record<string, string>) => {
                    Object.entries(errors).forEach(([key, error]) => {
                        setErrorRef.current(key as "hometown" | "dp"
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
                <h2 className="font-bold text-xl">Hi {props.username}! Let's learn more about you.</h2>
                <FormField
                    id="first_name"
                    label="First Name"
                    type="text"
                    inputProps={register("first_name")}
                    error={errors.first_name?.message}
                    placeholder="(e.g. Prince Christopher)"

                />
                <FormField
                    id="last_name"
                    label="Last Name"
                    type="text"
                    inputProps={register("last_name")}
                    error={errors.last_name?.message}
                    placeholder="(e.g. Rajkumar Honest)"
                />
                <FormField
                    id="hometown"
                    label="Hometown"
                    type="text"
                    inputProps={register("hometown")}
                    error={errors.hometown?.message}
                    placeholder="(e.g. New York, USA)"
                    /* TODO: Change placeholder to flash between popular cities  */
                />
                <FileField
                    id="dp"
                    label="Profile Picture"
                    type="file"
                    inputProps={register("dp")}
                    error={errors.dp?.message as string}
                />
                {
                    showFatalError &&
                    <ErrorField message="Fatal error occurred. Try again later!" />
                }
                <Button loading={isSubmitting} color="neutral"
                    active={!isSubmitting}
                >{isSubmitting ? "Loading..." : "Submit"}</Button>

                {props.suffix}
            </form>)
    })

CreateProfileForm.displayName = 'ForwardRefedCreateProfileForm'
