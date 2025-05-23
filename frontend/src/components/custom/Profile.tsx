import {Link, Outlet, useLocation} from "react-router-dom";

export const Profile = () => {
    const location = useLocation()
    return (
        <>
            <div className="profile-container">
                <div className="content-profile-sidebar">
                    <div className={`link-main link-sidbar ${location.pathname === '/profile' ? 'selected-link' : ''}`}>
                        <Link to={'/profile'}>Profile</Link>
                    </div>
                    <div
                        className={`link-main link-sidbar ${location.pathname === '/profile/notifications' ? 'selected-link' : ''}`}>
                        <Link to={'/profile/notifications'}>Notification</Link>
                    </div>

                </div>
                <div className="content-profile">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}