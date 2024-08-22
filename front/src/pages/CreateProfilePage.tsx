

import { useRef } from "react";
import {
    CreateProfileForm,
    CreateProfileFormValues,
    CreateProfileAPI
} from "../components/CreateProfileForm/CreateProfileForm";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import type { AuthUserData } from "../components/RequireAuth"
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const CreateProfilePage = () => {

    const authUser = useAuthUser<AuthUserData>()
    const CreateProfileFormRef = useRef<CreateProfileAPI>(null)
    const navigate = useNavigate();

    const onSubmit = async (data: CreateProfileFormValues) => {
        console.log(data)
        // await axios.post('/profiles/update-photo', {
        //     dp: data.dp[0]
        // }, {
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // })

        await axios.post('/profiles/set', {
            username: authUser?.username,
            first_name: data.first_name,
            last_name: data.last_name,
            hometown: data.hometown
        }
        ).then(res => {
            console.log(res.data)
            navigate("/map")
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
            username={authUser?.username as string}
        />
    )
}

export default CreateProfilePage