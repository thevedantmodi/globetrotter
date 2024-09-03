import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface RHFAutocompleteFieldProps<
    O extends { id: string; label: string },
    TField extends FieldValues
> {
    control: Control<TField>;
    name: Path<TField>;
    initialOptions: O[];
    placeholder?: string;
    id: string
    label: string
    fetchOptions: (input: string) => Promise<O[]>
}

export const RHFAutocompleteField = <
    O extends { id: string; label: string },
    TField extends FieldValues
>(
    props: RHFAutocompleteFieldProps<O, TField>
) => {
    const { control, name } = props;

    const [options, setOptions] = React.useState<O[]>(props.initialOptions)
    const [query, setQuery] = React.useState<string>("")


    const handleInputChange = async (event: React.ChangeEvent<{}>, value: string) => {
        setQuery(value)
        if (value) {
            const newOptions = await props.fetchOptions(value)
            setOptions(newOptions)
        }
    }

    return (
        <>
            <label htmlFor={props.id} className="label dark:text-gray-300">
                <span className="label-text">{props.label}</span>
            </label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: "this field is requried"
                }}
                render={({ field, fieldState: { error } }) => {
                    const { onChange, ref } = field;
                    return (
                        <div className='form-control max-w-xs w-full'>
                            <Autocomplete
                                className='form-control'
                                value={
                                    { id: query, label: query }
                                }
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(options, value) => options.valueOf === value.valueOf}
                                onChange={(event: any, newValue) => {
                                    onChange(newValue ? newValue.id : null);
                                }}
                                onInputChange={handleInputChange}
                                id={props.id}
                                options={options}
                                renderInput={(params) => (
                                    <TextField
                                        className="form-control dark:text-white"
                                        {...params}
                                        label={props.placeholder}
                                        inputRef={ref}
                                    />
                                )}
                            />
                            {error && (
                                <span className="label-text text-error">
                                    {error.message}
                                </span>
                            )}
                        </div>
                    );
                }}
            />
        </>
    );
};
