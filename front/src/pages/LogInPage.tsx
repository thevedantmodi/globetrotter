import { useRef } from "react";
import {
    LogInForm,
    LogInFormValues,
    LogInAPI
} from "../components/LogInForm/LogInForm";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {

    const LoginFormRef = useRef<LogInAPI>(null)
    const navigate = useNavigate();

    const onSubmit = async (data: LogInFormValues) => {

        const delay = (ms: number) =>
            new Promise(resolve => setTimeout(resolve, ms));

        await delay(2000);

        const user_or_email = data.user_or_email
        const not_email: RegExp = /^(?!.*.@.).*$/

        await axios.post('/users/login', {
            username: user_or_email.match(not_email) ? user_or_email : "",
            email: user_or_email.match(not_email) ? "" : user_or_email,
            password: data.password
        }).then((res) => {
            console.log(res.data)
            // navigate('/map');

        }).catch((err) => {

            const errors = (err.response?.data?.errors)

            errors ?
                /* Set errors for children components */
                LoginFormRef.current?.setErrors(errors)
                : /* Something bad! */
                LoginFormRef.current?.setFatalError()

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