import { FileInput } from "react-daisyui"
import { RefCallback } from "react";
import ErrorField from "./ErrorField";

/* Types are happy now */
interface FileFieldProps {
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
    placeholder?: string
}

const FileField = (props: FileFieldProps) => {
    return (
        <div className="form-control w-full max-w-xs" >
            <label htmlFor={props.id} className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <FileInput
                color="neutral"
                id={props.id}
                type={props.type ?? "text"}
                {...(props.inputProps ?? {})} /* Could be react-hook-form */
                placeholder={props.placeholder}
            />

            <ErrorField message={props.error} />

        </div>
    )
}

export default FileField