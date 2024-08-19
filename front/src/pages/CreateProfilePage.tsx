

import { useRef } from "react";
import {
    CreateProfileForm,
    CreateProfileFormValues,
    CreateProfileAPI
} from "../components/CreateProfileForm/CreateProfileForm";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CreateProfilePage = () => {

    const CreateProfileFormRef = useRef<CreateProfileAPI>(null)
    const navigate = useNavigate();

    const onSubmit = async (data: CreateProfileFormValues) => {

        const delay = (ms: number) =>
            new Promise(resolve => setTimeout(resolve, ms));

        await delay(2000);

        await axios.post('/users/sign-up', {

        }).then((res) => {
            console.log(res.data.message)
            navigate('/map');

        }).catch((err) => {

            const errors = (err.response?.data?.errors)

            if (errors) {
                /* Set errors for children */
                CreateProfileFormRef.current?.setErrors(errors)
            } else { /* Something bad! */
                CreateProfileFormRef.current?.setFatalError()
            }
        })

    }

    return (
        <CreateProfileForm
            ref={CreateProfileFormRef}
            onSubmitReady={onSubmit}
        />
    )


}

export default CreateProfilePage