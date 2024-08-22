import { Input } from "react-daisyui"
import { RefCallback, useState } from "react";
import ErrorField from "./ErrorField";
import { useAutocomplete } from '@mui/base'


/* Types are happy now */
interface AutoCompleteFieldProps {
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

const AutoCompleteField = (props: AutoCompleteFieldProps) => {
    const testWords = [
        "Leslie",
        "Jolene",
        "Cooley",
        "Allison",
        "Debbie",
        "Beryl",
        "Carissa",
        "Jewel",
        "Daisy",
        "Gordon"
    ];

    const [value, setValue] = useState<typeof testWords[number]>('')

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        focused,
    } = useAutocomplete({
        id: 'use-autocomplete-demo',
        options: testWords,
        getOptionLabel: (option) => option,
        value,
        onChange: (event, newValue) => setValue(newValue as string),
    });




    return (
        <div className="form-control w-full max-w-xs" >
            <label htmlFor={props.id} className="label">
                <span className="label-text">{props.label}</span>
            </label>

            <input
                id={props.id}
                color="ghost"
                type={props.type ?? "text"}
                {...props.inputProps}
                placeholder={props.placeholder}
            />
            {groupedOptions.length > 0 && (
                <div>
                    {(groupedOptions as typeof testWords).map((option, index) => (
                        <p>{option}</p>
                    ))}
                </div>
            )}

            <ErrorField message={props.error} />

        </div>
    )
}

export default AutoCompleteField