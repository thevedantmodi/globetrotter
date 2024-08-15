import { useRef } from "react";
import {
    LogInForm,
    LogInFormValues,
    LogInAPI
} from "../components/LogInForm/LogInForm";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Button } from "react-daisyui";

const LogInPage = () => {

    const LoginFormRef = useRef<LogInAPI>(null)
    const navigate = useNavigate();

    const onSubmit = async (data: LogInFormValues) => {

        const delay = (ms: number) =>
            new Promise(resolve => setTimeout(resolve, ms));

        await delay(2000);

        await axios.post('/sign-up', {
            email: data.email,
            password: data.password
        }).then((res) => {
            const errors = res.data.errors
            const success = res.data.success

            if (!success) { /* Set errors for child */
                LoginFormRef.current?.setErrors(errors)
                return
            }

            navigate('/map');

        }).catch((err) => {
            console.log("ERROR: ", err)
        })

    }

    return (
        <LogInForm
            ref={LoginFormRef}
            onSubmitReady={onSubmit}
        />
    )

}


export default LogInPage