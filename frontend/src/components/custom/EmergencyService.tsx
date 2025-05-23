import {MapContainer} from "./MapContainer.tsx";
import {useState} from "react";
import {TimerService} from "./TimerService.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {useTranslation} from "react-i18next";

export const EmergencyService = () => {
    const [step, setStep] = useState<number>(1);
    const [selectService, setSelectService] = useState<number | null>(null);
    const [startTimer, setStartTimer] = useState<boolean>(false);
    const [finishTimer, setFinishTimer] = useState<boolean>(false);
    const {userData} = useSelector((state: RootState) => state.user)
    const handlerStep = (method: string) => {
        if (method === "next") {
            setStep(step + 1)
            return
        }
        if (method === 'reset') {

            setStep(1)
            return;
        }

        setStep(step - 1)
    }
    const finishTimerHandler = () => {
        setFinishTimer(true)
    }
    const {t} = useTranslation()
    return (
        <>
            {userData && userData.tenantName !== '' ? <div className="emergency-service tenant-emergency">
                <div className="contianer-slider-wrapper">
                    <div className="item-slider">
                        <div className="title-container-slider">
                            <p>Richard Hammond</p>
                            <span>10:45</span>
                        </div>
                        <div className="str-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="28" viewBox="0 0 14 28"
                                 fill="none">
                                <path
                                    d="M7.85714 13.6791V26.5179C7.85714 26.7784 7.75367 27.0282 7.56948 27.2123C7.38529 27.3965 7.13548 27.5 6.875 27.5C6.61452 27.5 6.36471 27.3965 6.18052 27.2123C5.99633 27.0282 5.89286 26.7784 5.89286 26.5179V13.6791C4.17255 13.4308 2.61015 12.5402 1.52008 11.1864C0.430007 9.83257 -0.106809 8.11614 0.0176628 6.3825C0.142135 4.64887 0.918655 3.02673 2.19095 1.84254C3.46324 0.658343 5.13687 0 6.875 0C8.61314 0 10.2868 0.658343 11.5591 1.84254C12.8313 3.02673 13.6079 4.64887 13.7323 6.3825C13.8568 8.11614 13.32 9.83257 12.2299 11.1864C11.1399 12.5402 9.57745 13.4308 7.85714 13.6791Z"
                                    fill="#D1544B"/>
                            </svg>
                            <p>Lypunskoho 28 street, Lviv </p>
                        </div>
                        <div className="eta-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                 fill="none">
                                <path
                                    d="M13 0C5.82098 0 0 5.82098 0 13C0 20.179 5.82098 26 13 26C20.179 26 26 20.179 26 13C26 5.82098 20.179 0 13 0ZM18.1217 16.9958L17.2917 18.1275C17.2737 18.1521 17.2509 18.1729 17.2248 18.1888C17.1987 18.2046 17.1697 18.2151 17.1395 18.2197C17.1093 18.2243 17.0785 18.2228 17.0488 18.2155C17.0192 18.2081 16.9913 18.195 16.9667 18.1768L12.1672 14.6772C12.1373 14.6558 12.113 14.6274 12.0963 14.5946C12.0797 14.5618 12.0711 14.5254 12.0714 14.4886V6.5C12.0714 6.37232 12.1759 6.26786 12.3036 6.26786H13.6993C13.827 6.26786 13.9315 6.37232 13.9315 6.5V13.6819L18.0694 16.6737C18.1739 16.7462 18.1971 16.8913 18.1217 16.9958Z"
                                    fill="black"/>
                            </svg>
                            <p>ETA: 15 min</p>
                        </div>
                        <div className="btn-group">
                            <button className={`btn-decline`}>{t('app.decline')}</button>
                            <button className={`btn-accept`}>{t('app.accept')}</button>
                        </div>
                    </div>
                    <div className="item-slider">
                        <div className="title-container-slider">
                            <p>Richard Hammond</p>
                            <span>10:45 AM</span>
                        </div>
                        <div className="str-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="28" viewBox="0 0 14 28"
                                 fill="none">
                                <path
                                    d="M7.85714 13.6791V26.5179C7.85714 26.7784 7.75367 27.0282 7.56948 27.2123C7.38529 27.3965 7.13548 27.5 6.875 27.5C6.61452 27.5 6.36471 27.3965 6.18052 27.2123C5.99633 27.0282 5.89286 26.7784 5.89286 26.5179V13.6791C4.17255 13.4308 2.61015 12.5402 1.52008 11.1864C0.430007 9.83257 -0.106809 8.11614 0.0176628 6.3825C0.142135 4.64887 0.918655 3.02673 2.19095 1.84254C3.46324 0.658343 5.13687 0 6.875 0C8.61314 0 10.2868 0.658343 11.5591 1.84254C12.8313 3.02673 13.6079 4.64887 13.7323 6.3825C13.8568 8.11614 13.32 9.83257 12.2299 11.1864C11.1399 12.5402 9.57745 13.4308 7.85714 13.6791Z"
                                    fill="#D1544B"/>
                            </svg>
                            <p>Lypunskoho 28 street, Lviv </p>
                        </div>
                        <div className="eta-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                 fill="none">
                                <path
                                    d="M13 0C5.82098 0 0 5.82098 0 13C0 20.179 5.82098 26 13 26C20.179 26 26 20.179 26 13C26 5.82098 20.179 0 13 0ZM18.1217 16.9958L17.2917 18.1275C17.2737 18.1521 17.2509 18.1729 17.2248 18.1888C17.1987 18.2046 17.1697 18.2151 17.1395 18.2197C17.1093 18.2243 17.0785 18.2228 17.0488 18.2155C17.0192 18.2081 16.9913 18.195 16.9667 18.1768L12.1672 14.6772C12.1373 14.6558 12.113 14.6274 12.0963 14.5946C12.0797 14.5618 12.0711 14.5254 12.0714 14.4886V6.5C12.0714 6.37232 12.1759 6.26786 12.3036 6.26786H13.6993C13.827 6.26786 13.9315 6.37232 13.9315 6.5V13.6819L18.0694 16.6737C18.1739 16.7462 18.1971 16.8913 18.1217 16.9958Z"
                                    fill="black"/>
                            </svg>
                            <p>ETA: 15 min</p>
                        </div>
                        <div className="btn-group">
                            <button className={`btn-decline`}>Decline</button>
                            <button className={`btn-accept`}>Accept</button>
                        </div>
                    </div>
                    <div className="item-slider">
                        <div className="title-container-slider">
                            <p>Richard Hammond</p>
                            <span>10:45 AM</span>
                        </div>
                        <div className="str-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="28" viewBox="0 0 14 28"
                                 fill="none">
                                <path
                                    d="M7.85714 13.6791V26.5179C7.85714 26.7784 7.75367 27.0282 7.56948 27.2123C7.38529 27.3965 7.13548 27.5 6.875 27.5C6.61452 27.5 6.36471 27.3965 6.18052 27.2123C5.99633 27.0282 5.89286 26.7784 5.89286 26.5179V13.6791C4.17255 13.4308 2.61015 12.5402 1.52008 11.1864C0.430007 9.83257 -0.106809 8.11614 0.0176628 6.3825C0.142135 4.64887 0.918655 3.02673 2.19095 1.84254C3.46324 0.658343 5.13687 0 6.875 0C8.61314 0 10.2868 0.658343 11.5591 1.84254C12.8313 3.02673 13.6079 4.64887 13.7323 6.3825C13.8568 8.11614 13.32 9.83257 12.2299 11.1864C11.1399 12.5402 9.57745 13.4308 7.85714 13.6791Z"
                                    fill="#D1544B"/>
                            </svg>
                            <p>Lypunskoho 28 street, Lviv </p>
                        </div>
                        <div className="eta-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                 fill="none">
                                <path
                                    d="M13 0C5.82098 0 0 5.82098 0 13C0 20.179 5.82098 26 13 26C20.179 26 26 20.179 26 13C26 5.82098 20.179 0 13 0ZM18.1217 16.9958L17.2917 18.1275C17.2737 18.1521 17.2509 18.1729 17.2248 18.1888C17.1987 18.2046 17.1697 18.2151 17.1395 18.2197C17.1093 18.2243 17.0785 18.2228 17.0488 18.2155C17.0192 18.2081 16.9913 18.195 16.9667 18.1768L12.1672 14.6772C12.1373 14.6558 12.113 14.6274 12.0963 14.5946C12.0797 14.5618 12.0711 14.5254 12.0714 14.4886V6.5C12.0714 6.37232 12.1759 6.26786 12.3036 6.26786H13.6993C13.827 6.26786 13.9315 6.37232 13.9315 6.5V13.6819L18.0694 16.6737C18.1739 16.7462 18.1971 16.8913 18.1217 16.9958Z"
                                    fill="black"/>
                            </svg>
                            <p>ETA: 15 min</p>
                        </div>
                        <div className="btn-group">
                            <button className={`btn-decline`}>Decline</button>
                            <button className={`btn-accept`}>Accept</button>
                        </div>
                    </div>
                </div>
                <div className="notyf-error-message">
                    <div className="title-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="29" viewBox="0 0 33 29" fill="none">
                            <path
                                d="M32.8407 27.2245L17.5201 0.591837C17.2918 0.196046 16.8977 0 16.5 0C16.1023 0 15.7045 0.196046 15.4799 0.591837L0.159295 27.2245C-0.293693 28.0161 0.273462 29 1.17944 29H31.8206C32.7265 29 33.2937 28.0161 32.8407 27.2245ZM15.3215 10.949C15.3215 10.7862 15.4541 10.6531 15.6161 10.6531H17.3839C17.5459 10.6531 17.6785 10.7862 17.6785 10.949V17.7551C17.6785 17.9179 17.5459 18.051 17.3839 18.051H15.6161C15.4541 18.051 15.3215 17.9179 15.3215 17.7551V10.949ZM16.5 23.9694C16.0374 23.9599 15.597 23.7687 15.2731 23.4367C14.9493 23.1048 14.768 22.6586 14.768 22.1939C14.768 21.7292 14.9493 21.283 15.2731 20.951C15.597 20.6191 16.0374 20.4279 16.5 20.4184C16.9626 20.4279 17.403 20.6191 17.7269 20.951C18.0507 21.283 18.232 21.7292 18.232 22.1939C18.232 22.6586 18.0507 23.1048 17.7269 23.4367C17.403 23.7687 16.9626 23.9599 16.5 23.9694Z"
                                fill="#A03026"/>
                        </svg>
                        <h3 className="h3">{t('app.secc-warning')}</h3>
                    </div>
                    <div className="container-notyf-error-message">
                        <div className="item-notyf-error-message">
                            <span>None </span>
                        </div>
                    </div>
                </div>
                <div className="map-containeer">
                    <MapContainer/>
                    <div className="container-map-wrapper">
                        {step === 1 ? <div className="container-form-order-parking">
                            <div className="container-emergency-services">
                                <div className="input-container">
                                    <input name={'address'} placeholder={t('app.ev-from')}/>
                                    <button>
                                        <span>{t('app.select-map')}</span>
                                    </button>

                                </div>
                                <div className="input-container">
                                    <input name={'address'} placeholder={t('app.ev-to')}/>
                                    <button>
                                        <span>{t('app.select-map')}</span>
                                    </button>
                                </div>
                                <div className="container-service-wrapper">
                                    <div className={`item-service ${selectService === 1 ? 'active-service' : ''}`}
                                         onClick={() => setSelectService(1)}>
                                        <div className="container-image-content-service">
                                            <div className="image-container">
                                                <img src="/img/imgtrack-1.png" alt="11"/>
                                            </div>
                                            <div className="text-content">
                                                <p>{t('app.super-cart')}</p>
                                                <span>{t('app.time')}</span>
                                            </div>
                                        </div>
                                        <div className="price-container">
                                            <span>{t(`app.price`)}</span>
                                        </div>
                                    </div>
                                    <div className={`item-service ${selectService === 2 ? 'active-service' : ''}`}
                                         onClick={() => setSelectService(2)}>
                                        <div className="container-image-content-service">
                                            <div className="image-container">
                                                <img src="/img/imgtrack-2.png" alt="11"/>
                                            </div>
                                            <div className="text-content">
                                                <p>{t('app.super-cart')}</p>
                                                <span>{t('app.time')}</span>
                                            </div>
                                        </div>
                                        <div className="price-container">
                                            <span>{t(`app.price`)}</span>
                                        </div>
                                    </div>
                                    <div className={`item-service ${selectService === 3 ? 'active-service' : ''}`}
                                         onClick={() => setSelectService(3)}>
                                        <div className="container-image-content-service">
                                            <div className="image-container">
                                                <img src="/img/imgtrack-3.png" alt="11"/>
                                            </div>
                                            <div className="text-content">
                                                <p>{t('app.super-cart')}</p>
                                                <span>{t('app.time')}</span>
                                            </div>
                                        </div>
                                        <div className="price-container">
                                            <span>{t(`app.price`)}</span>
                                        </div>
                                    </div>
                                    <div className={`item-service ${selectService === 4 ? 'active-service' : ''}`}
                                         onClick={() => setSelectService(4)}>
                                        <div className="container-image-content-service">
                                            <div className="image-container">
                                                <img src="/img/imgtrack-1.png" alt="11"/>
                                            </div>
                                            <div className="text-content">
                                                <p>{t('app.super-cart')}</p>
                                                <span>{t('app.time')}</span>
                                            </div>
                                        </div>
                                        <div className="price-container">
                                            <span>{t(`app.price`)}</span>
                                        </div>
                                    </div>

                                </div>
                                <button className={`main-btn-emergency`} onClick={() => handlerStep('next')}>
                                    <span>{t('app.order-track')}</span>
                                </button>
                            </div>
                        </div> : null}
                        {step === 2 ? <div className={'container-form-order-parking'}>
                            <div className="timer-container">
                                <div className="title-timer">
                                    <p>{t('exp-time-ar')} </p>
                                </div>
                                {finishTimer ? <div className="timer-finish">
                                    <span>{t('app.track-arr')}</span>
                                </div> : <TimerService start={startTimer} onFinish={finishTimerHandler}/>}


                            </div>
                            <div className="container-item-parkink">
                                <div className="item-image">
                                    <img src="/img/imgtrack-1.png" alt=""/>
                                </div>
                                <div className="content-container">
                                    <p><span>{t('app.tow-service')}:</span>{t('app.car-help')}</p>
                                    <p><span>{t('app.price-help')}:</span> 550₴</p>
                                    <p><span>{t('app.driver')}:</span> Antonio Galucho</p>
                                </div>

                            </div>
                            <div className="container-check-wrapper">
                                <div className="line-header-container">
                                    <p>{t('app.y-car')}:</p>
                                    <p>{t('tow-y-track')}:</p>
                                </div>
                                <div className="content-body-container">
                                    <p>Skoda Superb</p>
                                    <p>2,5 t</p>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button onClick={() => handlerStep('reset')}>
                                    <span>{t('app.cancel')}</span>
                                </button>
                                <button onClick={() => setStartTimer(true)}>
                                    <span>{startTimer ?  t('app.follow-map') : t('app.continue')}</span>
                                </button>
                            </div>
                        </div> : null}


                    </div>
                </div>
            </div> : <div className="emergency-service">
                <div className="title-container">
                    <h3 className="h3">{t('app.title-emrg')}</h3>
                    <p>{t('app.subtitle-emrg')}</p>
                </div>
                <div className="map-containeer">
                    <MapContainer/>
                    <div className="container-map-wrapper">
                        {step === 1 ? <div className="container-form-order-parking">
                            <div className="container-emergency-services">
                                <div className="input-container">
                                    <input name={'address'} placeholder={t('app.ev-from')}/>
                                    <button>
                                        <span>{t('app.select-map')}</span>
                                    </button>

                                </div>
                                <div className="input-container">
                                    <input name={'address'} placeholder={t('app.ev-to')}/>
                                    <button>
                                        <span>{t('app.select-map')}</span>
                                    </button>
                                </div>
                                <div className="container-service-wrapper">
                                    <div className={`item-service ${selectService === 1 ? 'active-service' : ''}`}
                                         onClick={() => setSelectService(1)}>
                                        <div className="container-image-content-service">
                                            <div className="image-container">
                                                <img src="/img/imgtrack-1.png" alt="11"/>
                                            </div>
                                            <div className="text-content">
                                                <p>{t('app.super-car')}</p>
                                                <span>{t('app.time')}</span>
                                            </div>
                                        </div>
                                        <div className="price-container">
                                            <span>{t('app.price')}</span>
                                        </div>
                                    </div>
                                    <div className={`item-service ${selectService === 2 ? 'active-service' : ''}`}
                                         onClick={() => setSelectService(2)}>
                                        <div className="container-image-content-service">
                                            <div className="image-container">
                                                <img src="/img/imgtrack-2.png" alt="11"/>
                                            </div>
                                            <div className="text-content">
                                                <p>{t('app.super-car')}</p>
                                                <span>{t('app.time')}</span>
                                            </div>
                                        </div>
                                        <div className="price-container">
                                            <span>{t('app.price')}</span>
                                        </div>
                                    </div>
                                    <div className={`item-service ${selectService === 3 ? 'active-service' : ''}`}
                                         onClick={() => setSelectService(3)}>
                                        <div className="container-image-content-service">
                                            <div className="image-container">
                                                <img src="/img/imgtrack-3.png" alt="11"/>
                                            </div>
                                            <div className="text-content">
                                                <p>{t('app.super-car')}</p>
                                                <span>{t('app.time')}</span>
                                            </div>
                                        </div>
                                        <div className="price-container">
                                            <span>{t('app.price')}</span>
                                        </div>
                                    </div>
                                    <div className={`item-service ${selectService === 4 ? 'active-service' : ''}`}
                                         onClick={() => setSelectService(4)}>
                                        <div className="container-image-content-service">
                                            <div className="image-container">
                                                <img src="/img/imgtrack-1.png" alt="11"/>
                                            </div>
                                            <div className="text-content">
                                                <p>{t('app.super-car')}</p>
                                                <span>{t('app.time')}</span>
                                            </div>
                                        </div>
                                        <div className="price-container">
                                            <span>{t('app.price')}</span>
                                        </div>
                                    </div>

                                </div>
                                <button className={`main-btn-emergency`} onClick={() => handlerStep('next')}>
                                    <span>{t('app.order-track')}</span>
                                </button>
                            </div>
                        </div> : null}
                        {step === 2 ? <div className={'container-form-order-parking'}>
                            <div className="timer-container">
                                <div className="title-timer">
                                    <p>{t('app.exp-time-ar')} </p>
                                </div>
                                {finishTimer ? <div className="timer-finish">
                                    <span>{t('app.track-arr')}</span>
                                </div> : <TimerService start={startTimer} onFinish={finishTimerHandler}/>}


                            </div>
                            <div className="container-item-parkink">
                                <div className="item-image">
                                    <img src="/img/imgtrack-1.png" alt=""/>
                                </div>
                                <div className="content-container">
                                    <p><span>{t('app.tow-service')}:</span>{t('app.car-help')}</p>
                                    <p><span>{t('app.price-help')}:</span> {t('app.price')}</p>
                                    <p><span>{t('app.driver')}:</span> Antonio Galucho</p>
                                </div>
                            </div>
                            <div className="container-check-wrapper">
                                <div className="line-header-container">
                                    <p>{t('app.y-car')}:</p>
                                    <p>{t('app.tow-y-track')}:</p>
                                </div>
                                <div className="content-body-container">
                                    <p>Skoda Superb</p>
                                    <p>2,5 t</p>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button onClick={() => handlerStep('reset')}>
                                    <span>{t('app.cancel')}</span>
                                </button>
                                <button onClick={() => setStartTimer(true)}>
                                    <span>{startTimer ? t('app.follow-map') : t('app.continue')}</span>
                                </button>
                            </div>
                        </div> : null}
                    </div>
                </div>
            </div>}


        </>
    )
}