import { Input } from "react-daisyui"
import { RefCallback } from "react";
import ErrorField from "./ErrorField";

/* Types are happy now */
interface FormFieldProps {
    id: string,
    label: string,
    error?: string,
    inputProps?: {
        onChange?: (e: any) => unknown;
        onBlur?: (e: any) => unknown;
        ref?: any;
        name?: string;
        min?: string | number;
        max?: string | number;
        maxLength?: number;
        minLength?: number;
        pattern?: string;
        required?: boolean;
        disabled?: boolean;
    },
    type?: 'password' | 'text' | 'email' | 'date' | 'number' | 'file',
}

export const FormField = (props: FormFieldProps) => {
    return (
        <div className="form-control w-full max-w-xs" >
            <label htmlFor={props.id} className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <Input
                color="ghost"
                id={props.id}
                type={props.type ?? "text"}
                {...(props.inputProps ?? {})} /* Could be react-hook-form */
            />

            <ErrorField message={props.error} />

        </div>
    )
}