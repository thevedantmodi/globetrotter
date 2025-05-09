import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

interface DatePickerFieldProps {
    control: Control<any>
    name: string
    placeholder?: string
    id: string,
    label: string
}


const DatePickerField = (props: DatePickerFieldProps) => {
    dayjs.extend(utc)
    return (
        <>
            <label htmlFor={props.id} className="label">
                <span className="label-text">{props.label}</span>
            </label>
            <Controller
                control={props.control}
                name={props.name}
                rules={{
                    required: "This field is required"
                }}
                render={({ field, fieldState }: any) => (
                    <>
                        <DatePicker className='form-control max-w-xs w-full'
                            id={props.id}
                            showTime={{ format: 'hh:mm A', use12Hours:true }}
                            showSecond={false}
                            placeholder={props.placeholder}
                            status={fieldState.error ? "error" : undefined}
                            ref={field.ref}
                            name={field.name}
                            onBlur={field.onBlur}
                            value={field.value ? dayjs.utc(field.value) : null}
                            onChange={(date) => {
                                field.onChange(date
                                    ? dayjs.utc(dayjs(date).format('YYYY-MM-DDTHH:mm:ss[Z]')).toISOString()
                                    : null
                                );
                            }}
                        />
                        {fieldState.error && <span className="label-text text-error">
                            {/* {JSON.stringify(fieldState)} */}
                            {fieldState.error?.message}
                        </span>}
                    </>
                )}
            />
        </>
    )
}

export default DatePickerField