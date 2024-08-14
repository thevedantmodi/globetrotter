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

        await axios.post('/sign-up', {
            email: data.email,
            password: data.password
        }).then((res) => {
            const errors = res.data.errors
            const success = res.data.success

            if (!success) { /* Set errors for child */
                SignUpFormRef.current?.setErrors(errors)
            }
        }).catch((err) => {
            console.log("ERROR: ", err)
        })

        navigate('/map'); // Replace Navigate with navigate
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