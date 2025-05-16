import {RouteObject} from 'react-router-dom'
import {MainLayout} from '../layouts/MainLayout'
import {AuthLayout} from '../layouts/AuthLayout'
import {AuthForm} from '../components/custom/AuthForm'
import {RegisterForm} from "../components/custom/RegisterForm.tsx"
import {ProtectRoute} from "./ProtectRoute.tsx"
import {Profile} from "../components/custom/Profile.tsx"
import {ProfileInformation} from "../components/custom/ProfileInformation.tsx"
import {PaymentInformation} from "../components/custom/PaymentInformation.tsx"
import {NotificationsProfile} from "../components/custom/NotificationsProfile.tsx"
import {MainPage} from "../components/custom/MainPage.tsx";
import {ForgotPassword} from "../components/custom/ForgotPassword.tsx";

export const routes: RouteObject[] = [
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {index: true, element: <AuthForm/>},
            {path: "register", element: <RegisterForm/>},
            {path: "forgot-password", element: <ForgotPassword/>},
        ],
    },
    {
        path: '/',
        element: <ProtectRoute/>,
        children: [
            {
                path: '',
                element: <MainLayout/>,
                children: [
                    {index: true, element: <MainPage/>},
                    {
                        path: 'profile',
                        element: <Profile/>,
                        children: [
                            {index: true, element: <ProfileInformation/>},
                            {path: 'payment', element: <PaymentInformation/>},
                            {path: 'notifications', element: <NotificationsProfile/>},
                        ],
                    },
                ],
            },
        ],
    },
]
