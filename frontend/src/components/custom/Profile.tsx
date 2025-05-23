import {Link, Outlet, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Profile = () => {
    const location = useLocation()
    const {t} = useTranslation()
    return (
        <>
            <div className="profile-container">
                <div className="content-profile-sidebar">
                    <div className={`link-main link-sidbar ${location.pathname === '/profile' ? 'selected-link' : ''}`}>
                        <Link to={'/profile'}>{t('app.profile-page')}</Link>
                    </div>
                    <div
                        className={`link-main link-sidbar ${location.pathname === '/profile/notifications' ? 'selected-link' : ''}`}>
                        <Link to={'/profile/notifications'}>{t('app.notyf')}</Link>
                    </div>

                </div>
                <div className="content-profile">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}