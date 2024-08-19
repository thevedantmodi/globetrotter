import { useRef } from "react";
import {
    LogInForm,
    LogInFormValues,
    LogInAPI
} from "../components/LogInForm/LogInForm";
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const LogInPage = () => {

    const LoginFormRef = useRef<LogInAPI>(null)
    const navigate = useNavigate();
    // @ts-ignore
    const { setAuth } = useAuth()
    const location = useLocation()
    const from = location.state?.from?.pathname ?? "/"

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
        }
        ).then((res) => {
            console.log(res.data)
            setAuth({ user: res.data.username })
            navigate("/map", { replace: true });

        }).catch((err) => {
            console.log(err);

            const errors = (err.response?.data?.errors)
            console.log(errors);

            if (errors) {
                /* Set errors for children components */
                LoginFormRef.current?.setErrors(errors)

            }
            else {
                /* Something bad! */
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