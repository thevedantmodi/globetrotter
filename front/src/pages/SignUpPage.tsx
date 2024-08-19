import { useRef } from "react";
import {
    SignUpForm,
    SignUpFormValues,
    SignUpAPI
} from "../components/SignUpForm/SignUpForm";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Button } from "react-daisyui";

const SignUpPage = () => {

    const SignUpFormRef = useRef<SignUpAPI>(null)
    const navigate = useNavigate();

    const LoginExistingUser = () => {

        return (
            <Button color="secondary" onClick={(e) => {
                e.preventDefault()
                navigate('/login')
            }}>
                Already a user? Login here.
            </Button>
        )
    }

    const onSubmit = async (data: SignUpFormValues) => {

        const delay = (ms: number) =>
            new Promise(resolve => setTimeout(resolve, ms));

        await delay(2000);

        await axios.post('/users/sign-up', {
            username: data.username,
            email: data.email,
            password: data.password
        }).then((res) => {
            console.log(res.data.message)
            navigate("/create-profile", { replace: true });

        }).catch((err) => {

            const errors = (err.response?.data?.errors)

            if (errors) {
                /* Set errors for children */
                SignUpFormRef.current?.setErrors(errors)
            } else { /* Something bad! */
                SignUpFormRef.current?.setFatalError()
            }
        })

    }

    return (
        <SignUpForm
            ref={SignUpFormRef}
            onSubmitReady={onSubmit}
            suffix={<LoginExistingUser />}
        />
    )

}


export default SignUpPage