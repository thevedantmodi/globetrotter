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
    options: O[];
    placeholder?: string;
    id: string
    label: string
}

export const RHFAutocompleteField = <
    O extends { id: string; label: string },
    TField extends FieldValues
>(
    props: RHFAutocompleteFieldProps<O, TField>
) => {
    const { control, options, name } = props;
    return (
        <>
            <label htmlFor={props.id} className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: "this field is requried"
                }}
                render={({ field, fieldState: { error } }) => {
                    const { onChange, value, ref } = field;
                    return (
                        <div className="w-full max-w-xs">
                            <Autocomplete
                                value={
                                    value
                                        ? options.find((option) => {
                                            return value === option.label;
                                        }) ?? null
                                        : null
                                }
                                getOptionLabel={(option) => {
                                    return option.label;
                                }}
                                onChange={(event: any, newValue) => {
                                    onChange(newValue ? newValue.id : null);
                                }}
                                id="controllable-states-demo"
                                options={options}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={props.placeholder}
                                        inputRef={ref}
                                    />
                                )}
                            />
                            {error &&
                                <span className="label-text text-error">
                                    {error?.message}
                                </span>
                            }

                        </div>
                    );
                }}
            />
        </>
    );
};
