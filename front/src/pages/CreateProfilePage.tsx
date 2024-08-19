

import { useRef } from "react";
import {
    CreateProfileForm,
    CreateProfileFormValues,
    CreateProfileAPI
} from "../components/CreateProfileForm/CreateProfileForm";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const CreateProfilePage = () => {

    const CreateProfileFormRef = useRef<CreateProfileAPI>(null)
    const navigate = useNavigate();

    const { auth } = useAuth()

    const onSubmit = async (data: CreateProfileFormValues) => {
        console.log(data)


        

        //     .catch ((err) => {

        // const errors = (err.response?.data?.errors)

        // if (errors) {
        //     /* Set errors for children */
        //     CreateProfileFormRef.current?.setErrors(errors)
        // } else { /* Something bad! */
        //     CreateProfileFormRef.current?.setFatalError()
        // }
        // })
    }

    return (
        <CreateProfileForm
            ref={CreateProfileFormRef}
            onSubmitReady={onSubmit}
        />
    )


}

export default CreateProfilePage