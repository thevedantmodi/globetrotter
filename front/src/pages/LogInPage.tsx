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

        await axios.post('/users/sign-up', {
            username: data.username,
            email: data.email,
            password: data.password
        }).then((res) => {
            console.log(res.data.message)
            navigate('/map');

        }).catch((err) => {

            const errors = (err.response?.data?.errors)

            if (errors) {
                /* Set errors for children */
                LoginFormRef.current?.setErrors(errors)
            } else { /* Something bad! */
                LoginFormRef.current?.setFatalError()
            }
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