import {useDispatch} from "react-redux";
import {getMe} from "../features/user/userSlice.ts";
import {AppDispatch} from "../app/store.ts";
import {Header} from "../components/base/Header.tsx";
import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";


export const MainLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getMe()).unwrap()
            } catch {
                navigate('/auth')
            }
        }

        fetchData()
    }, [dispatch])
    return (
        <>
            <div className="container-main-layout">
                <Header/>
                <div className="container-content">

                    <Outlet/>

                </div>
            </div>
        </>
    )
}
