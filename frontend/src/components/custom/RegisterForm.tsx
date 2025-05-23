import {Logo} from "../base/Logo.tsx";
import {useEffect, useState} from "react";
import {Input} from "../base/Input.tsx";
import {Button} from "../base/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userData} from "../../types/user/userdata.ts";
import {AppDispatch} from "../../app/store.ts";
import {registerUser} from "../../features/user/userSlice.ts";
import {validatePassword} from "../../utils/validatePassword.ts";
import {Notyf} from "notyf";
import {validateEmail} from "../../utils/validateEmail.ts";
import {validatePhone} from "../../utils/validatePhone.ts";
import {useTranslation} from "react-i18next";

type PasswordSecure = {
    password: string;
    recPassword: string;
}
type Errors = {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    carNumber: string,
    tenantName: string,
    type: string
    password: string
}
export const RegisterForm = () => {
    const [tenant, setTenant] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const {t} = useTranslation()
    const [passwords, setPasswords] = useState<PasswordSecure>({
        password: "",
        recPassword: "",
    })
    const [dataRegister, setDataRegister] = useState<userData>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        carNumber: '',
        tenantName: '',
        type: ""
    })
    const [errors, setErrors] = useState<Errors>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        carNumber: '',
        tenantName: '',
        type: "",
        password: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const registerUserHandler = async () => {
        const notyf = new Notyf()
        setErrors({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            carNumber: '',
            tenantName: '',
            type: "",
            password: ''
        })
        try {

            if (!checked) {
                notyf.error({
                    message: t('error.policy')
                })
                return
            }

            const messageValidate = validatePassword(passwords.password, passwords.recPassword)
            console.log(1)
            const emailValidate = validateEmail(dataRegister.email)
            const phoneValidate = validatePhone(dataRegister.phone)

            if (dataRegister.first_name === '' || dataRegister.last_name === '') {

                setErrors({
                    ...errors,
                    first_name: t('error.name'),
                    last_name: t('error.name'),
                })
                return
            }

            if (!emailValidate) {
                setErrors({
                    ...errors,
                    email: t('error.email')
                })
                return
            }
            if(dataRegister.type === 'tenant' && dataRegister.tenantName === "") {
                setErrors({
                    ...errors,
                    tenantName: t('error.tenant')
                })
                return
            }
            if (!phoneValidate) {
                setErrors({
                    ...errors,
                    phone: t('error.phone'),
                })
                return
            }
            if (dataRegister.carNumber === '') {
                setErrors({
                    ...errors,
                    carNumber: t(`error.car_number`),
                })
                return
            }
            if (!messageValidate) {
                setErrors({
                    ...errors,
                    password: t(`error.password`)
                })
                return
            }


            await dispatch(registerUser({...dataRegister, password: passwords.password})).unwrap()
            notyf.success({
                message: `${dataRegister.first_name} ${dataRegister.last_name} registration was successful! Welcome!`
            })
            navigate('/')
        } catch {
            notyf.error(t('error.user-exist'))
        }
    }
    const handlerChangeUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataRegister({
            ...dataRegister,
            [e.target.name]: e.target.value,
        })
    }
    const handlerPasswordSeccure = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
        })
    }
    useEffect(() => {
        if (tenant) {
            setDataRegister({
                ...dataRegister,
                type: 'tenant',
            })
            return
        }
        setDataRegister({
            ...dataRegister,
            type: 'user',
        })
    }, [tenant])
    return (
        <>
            <div className="main-register-form">
                <div className="logo-container">
                    <Logo/>
                </div>
                <div className="select-thumbs">
                    <div className={`user-thumb thumb-main ${!tenant ? 'select-thumb' : ''}`}
                         onClick={() => setTenant(false)}>
                        <span>{t('auth.user')}</span>
                        <div className="container-circle-thumb">
                            {!tenant ? <div className="circle"></div> : ''}
                        </div>
                    </div>
                    <div className={`tenant-thumb thumb-main ${tenant ? 'select-thumb' : ''}`}
                         onClick={() => setTenant(true)}>
                        <span>{t('auth.tenant')} </span>
                        <div className="container-circle-thumb">
                            {tenant ? <div className="circle"></div> : ''}
                        </div>
                    </div>
                </div>
                <div className="content-register-form">
                    <div className="container-personal-info">
                        <div className="container-nfw-inp">
                            <Input name={'first_name'} label={t(`auth.first_name`)} placeholder={t('auth.first_name')}
                                   onChange={handlerChangeUserData} error={errors.first_name !== ''} required
                                   errorText={errors.first_name !== '' ? errors.first_name : ''}/>
                        </div>
                        <div className="container-nfw-inp">
                            <Input name={'last_name'} label={t(`auth.last_name`)} placeholder={t('auth.last_name')}
                                   onChange={handlerChangeUserData} error={errors.last_name !== ''} required
                                   errorText={errors.last_name !== '' ? errors.last_name : ''}/>
                        </div>
                    </div>
                    <div className="container-fw-input">
                        <Input name={'email'} label={t(`auth.email`)} placeholder={t(`auth.email`)}
                               onChange={handlerChangeUserData} error={errors.email !== ''} required
                               errorText={errors.email !== '' ? errors.email : ''}/>
                    </div>
                    {tenant ? (<div className="container-fw-input">
                        <Input name={'tenantName'} label={t('auth.tenant_name')} placeholder={t('auth.tenant_name')}
                               onChange={handlerChangeUserData} error={errors.tenantName !== ''} required
                               errorText={errors.tenantName !== '' ? errors.tenantName : ''}/>
                    </div>) : ""}
                    <div className="container-personal-info">
                        <div className="container-nfw-inp">
                            <Input name={'phone'} label={t('auth.phone')} placeholder={'+380 (ХХ) ХХХ ХХ ХХ'}
                                   onChange={handlerChangeUserData} error={errors.phone !== ''} required
                                   errorText={errors.phone !== '' ? errors.phone : ''}/>
                        </div>
                        <div className="container-nfw-inp">
                            <Input name={'carNumber'} label={t('auth.car_number')} placeholder={'XX0000XX'}
                                   error={errors.carNumber !== ''}
                                   errorText={errors.carNumber !== '' ? errors.carNumber : ''} required
                                   onChange={handlerChangeUserData}/>
                        </div>
                    </div>
                    <div className="container-personal-info">
                        <div className="container-nfw-inp">
                            <Input name={'password'} label={t(`auth.password`)} placeholder={t('auth.length-pass')}
                                   type={'password'} onChange={handlerPasswordSeccure} error={errors.password !== ''}
                                   required
                                   errorText={errors.password !== '' ? errors.password : ''}/>
                        </div>
                        <div className="container-nfw-inp">
                            <Input name={'recPassword'} label={t('auth.retype_pass')} placeholder={t('auth.length-pass')}
                                   type={'password'} onChange={handlerPasswordSeccure} error={errors.password !== ''}
                                   required/>
                        </div>
                    </div>
                    <div className="checkbox-container-wrapper">
                        <div className="container-checked-checkbox" onClick={() => setChecked(!checked)}>
                            {checked ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6"
                                >
                                    <path d="M5 13l4 4L19 7"/>
                                </svg>
                            ) : ''}
                        </div>

                        <span>{t(`auth.pr-policy-pt1`)} <a href="#">{t(`auth.pr-policy-link`)}</a> {t('auth.pr-policy-pt2')}</span>
                    </div>
                    <div className="container-btn-register">
                        <Button text={t('auth.create-profile')} onClick={registerUserHandler}/>
                    </div>
                    <div className="container-footer-register">
                        <div className="or-container">
                            <div className="line-wrapper"></div>

                            <div className="line-wrapper"></div>
                        </div>

                    </div>

                </div>
                <div className="back-aut-btn">
                    <Link to="/">{t('auth.have-profile')}</Link>
                </div>
            </div>
        </>
    )
}