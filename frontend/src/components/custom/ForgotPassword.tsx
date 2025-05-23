import {Input} from "../base/Input.tsx";
import {Button} from "../base/Button.tsx";
import {ChangeEvent, useState} from "react";
import {useTranslation} from "react-i18next";

export const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>('')
    const handlerInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }
    const {t} = useTranslation()
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
                    <h1 className="h1">{t('app.forgot-pass')}</h1>
                </div>
                <div className="description-container">
                    <p>{t(`app.forgot-subtitle`)}</p>
                </div>
                <div className="container-inp-reset">
                    <Input label={''} placeholder={t('app.email')} onChange={handlerInputEmail}
                           error={error}
                           errorText={errorMsg}/>
                </div>
                <Button text="Change password" onClick={handleSubmit}/>
            </div>
        </>
    )
}