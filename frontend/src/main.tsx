import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import {store} from './app/store.ts'
import './scss/main.scss'
import 'notyf/notyf.min.css'
import './i18n'
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
