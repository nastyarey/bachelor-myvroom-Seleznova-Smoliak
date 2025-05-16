import {Outlet} from "react-router-dom";

export const AuthLayout = () => {

    return (
        <>
            <div className="container-main-auth-form">
                <Outlet/>
            </div>
        </>
    )
}