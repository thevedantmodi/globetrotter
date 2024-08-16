import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

interface DatePickerFieldProps {
    control: Control<any>
    name: string
    placeholder?: string
}


const DatePickerField = (props: DatePickerFieldProps) => {
    const [controlledDate, setControlledDate] = useState<any>(null)

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setControlledDate(date)
    };
    return (
        <Controller
            control={props.control}
            name={props.name}
            rules={{
                required: "This field is required"
            }}
            render={({ field, fieldState }: any) => (
                <>
                    <DatePicker
                        placeholder={props.placeholder}
                        status={fieldState.error ? "error" : undefined}
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                            field.onChange(date ? dayjs(date).toISOString() : null);
                        }}
                    />
                    {fieldState.error && <span className="label-text text-error">
                        {fieldState.error?.message}
                    </span>}
                </>
            )}
        />
    )
}

export default DatePickerField