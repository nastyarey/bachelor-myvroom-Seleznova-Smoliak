import {Logo} from "../base/Logo.tsx";
import {Input} from "../base/Input.tsx";
import {Button} from "../base/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser} from "../../features/user/userSlice.ts";
import * as React from "react";
import {useState} from "react";
import {AppDispatch} from "../../app/store.ts";
import {useAppSelector} from "../../hooks/hook.ts";
import {useTranslation} from "react-i18next";

type UserLogin = {
    email: string;
    password: string;
}
export const AuthForm = () => {
    const [dataLogin, setDataLogin] = useState<UserLogin>({
        email: '',
        password: ''
    })
    const {t} = useTranslation()
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();
    const token = useAppSelector(state => state.user.token)
    const dispatch = useDispatch<AppDispatch>();
    const handleLogin = async () => {
        try {
            await dispatch(loginUser(dataLogin)).unwrap()
            if (token) {
                localStorage.setItem('token', token)
            }
            navigate('/')
        } catch {
            setError('Incorrect password. Try another one.')
        }

    }
    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value
        })
    }
    const linkRefForgotPassword = () => {
        navigate('/auth/forgot-password')
    }
    return (
        <>
            <div className="container-auth-wrapper">
                <div className="logo-container">
                    <Logo/>
                </div>
                <div className="content-form-auth">
                    <div className="main-input-auth">
                        <Input name={'email'} label={t('auth.email')} placeholder={t('auth.email')} disabled={false}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDataChange(e)}/>
                    </div>
                    <div className="main-input-auth">
                        <Input name={'password'} label={t('auth.password')} placeholder={t('auth.password')} disabled={false}
                               link={t('auth.forgot-pass' )+ '?'}
                               type={'password'}
                               linkClick={linkRefForgotPassword}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDataChange(e)}
                               error={error !== null}
                               errorText={error !== null ? error : ''}
                        />
                    </div>

                </div>
                <div className="container-btn">
                    <Button text={t('auth.login')} onClick={handleLogin}/>
                </div>
                <div className="or-container">
                    <div className="line-wrapper"></div>
                    <span>{t('auth.prefix')}</span>
                    <div className="line-wrapper"></div>
                </div>
                <div className="btn-auth-container">
                    <div className="register-btn">
                        <Link to="register">{t('auth.register-btn')}</Link>
                    </div>
                </div>
            </div>
        </>
    )
}