import {Input} from "../base/Input.tsx";
import {Button} from "../base/Button.tsx";
import {ChangeEvent, useState} from "react";

export const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>('')
    const handlerInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }
    const handleSubmit = () => {
        setEmail('')
        setErrorMsg('')
        setError(false)
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (email === '') {
            setError(true)
            setErrorMsg('Email is required.')
            return
        }
        if (!emailRegEx.test(email)) {
            setError(true)
            setErrorMsg('Incorrect email.')
            return
        }

    }
    return (
        <>
            <div className="forgot-password-form">
                <div className="title-container">
                    <h1 className="h1">Forgot your password?</h1>
                </div>
                <div className="description-container">
                    <p>Enter the email address associated with your profile and we will send you instructions for
                        creating a new password.</p>
                </div>
                <div className="container-inp-reset">
                    <Input label={''} placeholder={'Enter your email address'} onChange={handlerInputEmail}
                           error={error}
                           errorText={errorMsg}/>
                </div>
                <Button text="Change password" onClick={handleSubmit}/>
            </div>
        </>
    )
}