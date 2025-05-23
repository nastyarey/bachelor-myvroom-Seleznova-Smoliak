import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {logout} from "../../features/user/userSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import {LogoHeader} from "./LogoHeader.tsx";
import {useTranslation} from "react-i18next";
import {useState} from "react";

export const Header = () => {
    const {userData} = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const [openLang, setOpenLang] = useState<boolean>(false);
    const {i18n} = useTranslation()
    const handlerLogOut = () => {
        dispatch(logout())
        navigate('/auth/')
    }
    const handlerChangeLang = async (lang:string) => {
        await i18n.changeLanguage(lang)
        localStorage.setItem('locale', lang)
        setOpenLang(false)
    }
    return (
        <>
            <header className="main-header">
                <div className="logo-wrapper">
                    <div className="logo-container">
                        <Link to={'/'}>
                            <LogoHeader/>
                        </Link>
                    </div>
                </div>
                <div className="container-profile-wrapper">
                    <div className="image-profile">
                        {userData?.photo ?
                            <img src={`http://localhost:3002${userData.photo}`} alt="No profile"/> : null}
                        {!userData?.photo ? <img src="/img/no-profile-picture-icon.svg" alt="No profile"/> : null}
                    </div>
                    <div className="content-profile" onClick={() => navigate('/profile')}>
                        <h3>Welcome Back!</h3>
                        {userData ? (
                            <p>{`${userData.first_name} ${userData.last_name}`}</p>
                        ) : ""}
                    </div>

                </div>
                <div className="controll-btn">
                    <div className="container-lang">
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none" onClick={() => setOpenLang(!openLang)}>
                            <path
                                d="M19 36C28.3888 36 36 28.3888 36 19C36 9.61116 28.3888 2 19 2M19 36C9.61116 36 2 28.3888 2 19C2 9.61116 9.61116 2 19 2M19 36C23.6364 36 25.1818 28.2727 25.1818 19C25.1818 9.72727 23.6364 2 19 2M19 36C14.3636 36 12.8182 28.2727 12.8182 19C12.8182 9.72727 14.3636 2 19 2M3.54545 25.1818H34.4545M3.54545 12.8182H34.4545"
                                stroke="#242121" strokeWidth="3"/>
                        </svg>
                        {openLang ? <div className="hidden-container-lang-wrapper">
                            <p onClick={() => handlerChangeLang('uk')}>UK</p>
                            <p onClick={() => handlerChangeLang('en')}>ENG</p>
                        </div> : null}

                    </div>
                    <div className="container-log-out" onClick={handlerLogOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" viewBox="0 0 24 24" width="24">
                            <path
                                d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
                                stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </svg>
                    </div>
                </div>
            </header>
        </>
    )
}