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
                    message: "First you need to agree to the Privacy policy"
                })
                return
            }
            const messageValidate = validatePassword(passwords.password, passwords.recPassword)
            const emailValidate = validateEmail(dataRegister.email)
            const phoneValidate = validatePhone(dataRegister.phone)
            if (dataRegister.first_name === '' || dataRegister.last_name === '') {

                setErrors({
                    ...errors,
                    first_name: "First name or Last name required",
                    last_name: "First name or Last name required",
                })
                return
            }
            if (!emailValidate) {
                setErrors({
                    ...errors,
                    email: 'Email is empty or in the wrong format'
                })
                return
            }
            if(dataRegister.type === 'tenant' && dataRegister.tenantName === "") {
                setErrors({
                    ...errors,
                    tenantName: 'Please enter tenant name'
                })
                return
            }
            if (!phoneValidate) {
                setErrors({
                    ...errors,
                    phone: "Phone number is empty or wrong format",
                })
                return
            }
            if (dataRegister.carNumber === '') {
                setErrors({
                    ...errors,
                    carNumber: 'Car number is required',
                })
                return
            }
            if (messageValidate) {
                setErrors({
                    ...errors,
                    password: messageValidate
                })
                return
            }


            await dispatch(registerUser({...dataRegister, password: passwords.password})).unwrap()
            notyf.success({
                message: `${dataRegister.first_name} ${dataRegister.last_name} registration was successful! Welcome!`
            })
            navigate('/')
        } catch {

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
                        <span>User</span>
                        <div className="container-circle-thumb">
                            {!tenant ? <div className="circle"></div> : ''}
                        </div>
                    </div>
                    <div className={`tenant-thumb thumb-main ${tenant ? 'select-thumb' : ''}`}
                         onClick={() => setTenant(true)}>
                        <span>Organization </span>
                        <div className="container-circle-thumb">
                            {tenant ? <div className="circle"></div> : ''}
                        </div>
                    </div>
                </div>
                <div className="content-register-form">
                    <div className="container-personal-info">
                        <div className="container-nfw-inp">
                            <Input name={'first_name'} label={'Surname'} placeholder={'Enter surname'}
                                   onChange={handlerChangeUserData} error={errors.first_name !== ''} required
                                   errorText={errors.first_name !== '' ? errors.first_name : ''}/>
                        </div>
                        <div className="container-nfw-inp">
                            <Input name={'last_name'} label={'Name'} placeholder={'Enter name'}
                                   onChange={handlerChangeUserData} error={errors.last_name !== ''} required
                                   errorText={errors.last_name !== '' ? errors.last_name : ''}/>
                        </div>
                    </div>
                    <div className="container-fw-input">
                        <Input name={'email'} label={'Email'} placeholder={'Enter email'}
                               onChange={handlerChangeUserData} error={errors.email !== ''} required
                               errorText={errors.email !== '' ? errors.email : ''}/>
                    </div>
                    {tenant ? (<div className="container-fw-input">
                        <Input name={'tenantName'} label={'Organization name'} placeholder={'Enter the organization'}
                               onChange={handlerChangeUserData} error={errors.tenantName !== ''} required
                               errorText={errors.tenantName !== '' ? errors.tenantName : ''}/>
                    </div>) : ""}
                    <div className="container-personal-info">
                        <div className="container-nfw-inp">
                            <Input name={'phone'} label={'Phone'} placeholder={'+380 (ХХ) ХХХ ХХ ХХ'}
                                   onChange={handlerChangeUserData} error={errors.phone !== ''} required
                                   errorText={errors.phone !== '' ? errors.phone : ''}/>
                        </div>
                        <div className="container-nfw-inp">
                            <Input name={'carNumber'} label={'Car license plate'} placeholder={'XX0000XX'}
                                   error={errors.carNumber !== ''}
                                   errorText={errors.carNumber !== '' ? errors.carNumber : ''} required
                                   onChange={handlerChangeUserData}/>
                        </div>
                    </div>
                    <div className="container-personal-info">
                        <div className="container-nfw-inp">
                            <Input name={'password'} label="Password" placeholder='6+ characters'
                                   type={'password'} onChange={handlerPasswordSeccure} error={errors.password !== ''}
                                   required
                                   errorText={errors.password !== '' ? errors.password : ''}/>
                        </div>
                        <div className="container-nfw-inp">
                            <Input name={'recPassword'} label="Retype password" placeholder='6+ characters'
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

                        <span>I agree with the <a href="#">privacy policy</a> of this site and consent to the processing of my personal data in accordance with the current legislation of Ukraine.</span>
                    </div>
                    <div className="container-btn-register">
                        <Button text={'Create a profile'} onClick={registerUserHandler}/>
                    </div>
                    <div className="container-footer-register">
                        <div className="or-container">
                            <div className="line-wrapper"></div>
                            <span>or</span>
                            <div className="line-wrapper"></div>
                        </div>

                    </div>

                </div>
                <div className="back-aut-btn">
                    <Link to="/">I already have a profile</Link>
                </div>
            </div>
        </>
    )
}