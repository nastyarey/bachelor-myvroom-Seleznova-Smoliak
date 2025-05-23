import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {ImageDownloadPhoto} from "../base/ImageDownloadPhoto.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {updateUser, uploadPhotoProfile} from "../../features/user/userSlice.ts";
import {Input} from "../base/Input.tsx";
import {userData} from "../../types/user/userdata.ts";
import {Notyf} from "notyf";
import {useTranslation} from "react-i18next";

export const ProfileInformation = () => {
    const imageRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [file, setFile] = useState<any>(null);
    const {userData} = useSelector((state: RootState) => state.user);
    const [dataUser, setDataUser] = useState<userData | null>({} as userData);
    const notyf = new Notyf()
    useEffect(() => {
        setDataUser(userData)
    }, [userData]);
    const location = useLocation()
    const handleImageDownload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const objectUrl = URL.createObjectURL(file)
            setImageUrl(objectUrl)
            setFile(file)
        }
    }

    const dispatch = useDispatch<AppDispatch>();
    const updateHandler = () => {
        if (imageUrl !== null) {
            dispatch(uploadPhotoProfile(file))
            notyf.success('Photo  updated successfully.')
        }
        if (dataUser) {
            try {
                dispatch(updateUser(dataUser))
                notyf.success('Profile information updated successfully.')
            } catch (e: any) {
                notyf.error(e)
            }
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (dataUser) {
            setDataUser({
                ...dataUser,
                [e.target.name]: e.target.value
            })
        }
    }
    const {t} = useTranslation();
    return (
        <>
            <div className="container-profile-information">
                <div className="navigation-profile">
                    <Link to={'/profile'}
                          className={`navigation-link-profile ${location.pathname === '/profile' ? 'active-link' : ''} `}>{t('app.profile-settings')}</Link>
                    <Link to={'/profile/payment'}
                          className={`navigation-link-profile ${location.pathname === '/profile/payment' ? 'active-link' : ''} `}>{t(`app.payment-settings`)}</Link>
                </div>
                <div className="content-profile-settings">
                    <div className="profile-photo">
                        <div className="title-container">
                            <p>{t('app.profile-photo')}</p>
                        </div>
                        <div className="container-photo-load" onClick={() => imageRef.current?.click()}>
                            {imageUrl ? <img src={imageUrl} alt="" className={'image-container-profile'}/> : null}
                            {!imageUrl ? (<div className="container-download-photo">
                                <ImageDownloadPhoto/>
                                <span>{t('app.download-photo')}</span>
                                <input ref={imageRef} type="file" accept="image/*" multiple={false} hidden
                                       onChange={handleImageDownload}/>
                            </div>) : null}
                        </div>

                    </div>
                    <div className="profile-form-container">
                        {userData ? (
                            <>
                                <div className="container-inputs-profile">
                                    <div className="container-input">
                                        <Input name={'first_name'} label={t('auth.first_name')} placeholder={t('auth.first_name')}
                                               value={userData.first_name}
                                               onChange={handleChange}/>
                                    </div>
                                    <div className="container-input">
                                        <Input name={'last_name'} label={t('auth.last_name')} placeholder={t('auth.last_name')}
                                               value={userData.last_name} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="container-inputs-profile">

                                    <div className="container-input">
                                        <Input name={'carNumber'} label={t('auth.car_number')} placeholder={t('auth.car_number')}
                                               value={userData.carNumber} onChange={handleChange}/>
                                    </div>
                                    <div className="container-input">
                                        <Input name={'phone'} label={t('auth.phone')} placeholder={t('auth.phone')}
                                               value={userData.phone}
                                               onChange={handleChange}/>
                                    </div>
                                    {dataUser?.type === 'tenant' ? (<div className="container-input">
                                        <Input name={'tenantName'} label={t('app.tenant_name')}
                                               placeholder={t('app.tenant_name')}
                                               value={userData.tenantName}
                                               onChange={handleChange}/>
                                    </div>) : null}
                                </div>
                            </>
                        ) : null}

                    </div>
                </div>

                <button className={'save-btn-profile'} onClick={updateHandler}> {t(`app.save`)}</button>
                <button className={'clear-btn-profile'} onClick={updateHandler}> {t('app.clear')}</button>
            </div>
        </>
    )
}