import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {ImageDownloadPhoto} from "../base/ImageDownloadPhoto.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {updateUser, uploadPhotoProfile} from "../../features/user/userSlice.ts";
import {Input} from "../base/Input.tsx";
import {userData} from "../../types/user/userdata.ts";
import {Notyf} from "notyf";

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
    return (
        <>
            <div className="container-profile-information">
                <div className="navigation-profile">
                    <Link to={'/profile'}
                          className={`navigation-link-profile ${location.pathname === '/profile' ? 'active-link' : ''} `}>Profile
                        settings</Link>
                    <Link to={'/profile/payment'}
                          className={`navigation-link-profile ${location.pathname === '/profile/payment' ? 'active-link' : ''} `}>Payment
                        settings</Link>
                </div>
                <div className="content-profile-settings">
                    <div className="profile-photo">
                        <div className="title-container">
                            <p>Profile photo</p>
                        </div>
                        <div className="container-photo-load" onClick={() => imageRef.current?.click()}>
                            {imageUrl ? <img src={imageUrl} alt="" className={'image-container-profile'}/> : null}
                            {!imageUrl ? (<div className="container-download-photo">
                                <ImageDownloadPhoto/>
                                <span>Download photo</span>
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
                                        <Input name={'first_name'} label={"Name"} placeholder={'Enter name'}
                                               value={userData.first_name}
                                               onChange={handleChange}/>
                                    </div>
                                    <div className="container-input">
                                        <Input name={'last_name'} label={"Surname"} placeholder={'Enter surname'}
                                               value={userData.last_name} onChange={handleChange}/>
                                    </div>
                                    <div className="container-input">
                                        <Input name={'email'} label={"Email"} placeholder={'Enter email'}
                                               value={userData.email}
                                               onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="container-inputs-profile">

                                    <div className="container-input">
                                        <Input name={'carNumber'} label={"Car number"} placeholder={'Enter car number'}
                                               value={userData.carNumber} onChange={handleChange}/>
                                    </div>
                                    <div className="container-input">
                                        <Input name={'phone'} label={"Phone"} placeholder={'Enter phone'}
                                               value={userData.phone}
                                               onChange={handleChange}/>
                                    </div>
                                    {dataUser?.type === 'tenant' ? (<div className="container-input">
                                        <Input name={'tenantName'} label={"Company name"}
                                               placeholder={'Enter company name'}
                                               value={userData.tenantName}
                                               onChange={handleChange}/>
                                    </div>) : null}
                                </div>
                            </>
                        ) : null}

                    </div>
                </div>

                <button className={'save-btn-profile'} onClick={updateHandler}> Save</button>
                <button className={'clear-btn-profile'} onClick={updateHandler}> Clear</button>
            </div>
        </>
    )
}