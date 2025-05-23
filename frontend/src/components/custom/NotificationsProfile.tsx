import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store.ts";
import {useEffect} from "react";
import {getNotification} from "../../features/user/notificationSlice.ts";
import {NotificationProfile} from "./NotificationProfile.tsx";
import {useTranslation} from "react-i18next";

export const NotificationsProfile = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {items, firstFethced} = useSelector((state: RootState) => state.notification)
    const {t} = useTranslation()
    useEffect(() => {
        if (!firstFethced) {
            dispatch(getNotification()).unwrap
        }
    }, [items, dispatch])
    return (
        <>
            <div className="notifications-profile">
                <div className="top-line-notyf">
                    <h3 className="h3">{t('app.notyf')}</h3>
                    
                </div>
                <div className="content-notification">
                    {items.map((e, i) => <NotificationProfile notification={e} key={i}/>)}
                </div>
            </div>
        </>
    )
}