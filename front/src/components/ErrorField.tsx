import React from "react"

interface ErrorFieldProps {
    message?: string
}

const ErrorField = (props: ErrorFieldProps) => {
    return (
        <>
            {props.message &&
                <span className="label-text text-error">
                    {props.message}
                </span>}
        </>

    )
}

export default ErrorField