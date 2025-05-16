import {Notification} from "../../features/user/notificationSlice.ts";
import {useState} from "react";

export const NotificationProfile = ({notification}: { notification: Notification }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <div className="notification-profile">
                <div className={`title-container ${open ? 'title-container-active' : ''}`}
                     onClick={() => setOpen(!open)}>
                    <p>{notification.title}</p>
                    <svg className={`open-hidden-icon ${open ? 'active-open' : null}`}
                         xmlns="http://www.w3.org/2000/svg" width="19" height="12"
                         viewBox="0 0 19 12" fill="none">
                        <path
                            d="M2.2325 11.875L9.5 4.53526L16.7675 11.875L19 9.61538L9.5 -4.61936e-07L1.54972e-06 9.61538L2.2325 11.875Z"
                            fill="#7E7D7D"/>
                    </svg>
                </div>
                {open ? (<div className="container-hidden-wrapper">
                    <p>{notification.message}</p>
                    <div className="container-date">
                        <p>{new Date(notification.createdAt).toLocaleDateString('uk-UA', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })
                        }</p>
                    </div>
                </div>) : null}

            </div>
        </>
    )
}