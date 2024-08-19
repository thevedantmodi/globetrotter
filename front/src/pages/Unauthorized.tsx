import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-daisyui'

const Unauthorized = () => {
    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-800 p-8">
                <h1 className="text-4xl font-bold mb-4">Unauthorized!</h1>
                <h2 className="text-lg font-medium text-center">
                    You probably ended up here because you tried to access something you weren't supposed to.
                </h2>

                <Button className='m-10' onClick={goBack}>Go Back</Button>

            </div>

        </>
    )
}

export default Unauthorized