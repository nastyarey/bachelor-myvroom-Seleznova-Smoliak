import {useState} from "react";
import {ParkingService} from "./ParkingService.tsx";
import {EmergencyService} from "./EmergencyService.tsx";

export const MainPage = () => {
    const [selectType, setSelectType] = useState<'parking' | 'emergency'>('emergency')
    return (
        <>
            <div className="main-page-container">
                <div className="navigation-main-page">
                    <div className="container-btn-selected-type">
                        <div
                            className={`btn-nav-main btn-emergency-service ${selectType === 'emergency' ? 'selected-nav' : ''}`}
                            onClick={() => setSelectType('emergency')}>
                            <span>Emergency Services</span>
                        </div>
                        <div
                            className={`btn-nav-main btn-parking-service ${selectType === 'parking' ? 'selected-nav' : ''}`}
                            onClick={() => setSelectType('parking')}>
                            <span>Parking Service</span>
                        </div>
                    </div>
                </div>

                <div className="content-main-page">
                    {selectType === 'emergency' ? <EmergencyService/> : <ParkingService/>}
                </div>
            </div>
        </>
    )
}