import {useState} from "react";

export const Input = ({
                          label,
                          placeholder,
                          disabled = false,
                          link,
                          linkClick,
                          type = 'text',
                          onChange,
                          name,
                          errorText,
                          error,
                          value,
                          required
                      }: {
    label: string,
    placeholder: string,
    disabled?: boolean,
    link?: string,
    type?: string,
    linkClick?: () => void,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    name?: string
    error?: boolean,
    errorText?: string
    value?: string | null,
    required?: boolean
}) => {
    const [typeState, setTypeState] = useState<string>(type);
    const handlerClick = () => {
        if (linkClick) {
            linkClick()
        }
    }
    const handlerChangeType = () => {
        if (typeState === 'password') {
            setTypeState('text')
            return
        }
        setTypeState('password')
    }

    return (
        <div className="main-input-wrapper">
            <div className="container-label">
                <label>{label} {required ? < span > * </span>:null} </label>
                {link ? (<span className="link-text" onClick={handlerClick}>{link}</span>) : ''}
            </div>
            <div className="input-container">
                <input name={name} type={typeState} placeholder={placeholder} disabled={disabled}
                       className={`main-input ${error ? 'error-input' : ''}`} defaultValue={value ? value : undefined}
                       onChange={onChange}/>
                {type === 'password' ? (
                    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                         onClick={handlerChangeType}>
                        <path
                            d="M32.333 15.1979C29.3278 9.125 23.3174 5 16.5278 5C9.68261 5 3.67217 9.125 0.666957 15.1979C0.555652 15.4271 0.5 15.7135 0.5 16C0.5 16.3438 0.555652 16.6302 0.666957 16.8594C3.67217 22.9323 9.68261 27 16.5278 27C23.3174 27 29.3278 22.9323 32.333 16.8594C32.4443 16.6302 32.5 16.3438 32.5 16.0573C32.5 15.7135 32.4443 15.4271 32.333 15.1979ZM16.5278 24.25C12.0757 24.25 8.51391 20.5833 8.51391 16C8.51391 11.474 12.0757 7.75 16.5278 7.75C20.9243 7.75 24.5417 11.474 24.5417 16V16.0573C24.5417 20.5833 20.9243 24.3073 16.5278 24.3073V24.25ZM16.5278 10.5C16.027 10.5573 15.5261 10.6146 15.0809 10.7292C15.4148 11.1875 15.5817 11.7604 15.5817 12.3906C15.5817 13.8802 14.413 15.0833 12.9661 15.0833C12.3539 15.0833 11.7974 14.9115 11.3522 14.5677C11.2409 15.026 11.1852 15.5417 11.1852 16C11.1852 19.0365 13.5783 21.5 16.5278 21.5C19.4774 21.5 21.8704 19.0365 21.8704 16C21.8704 12.9635 19.4774 10.5573 16.5278 10.5573V10.5Z"
                            fill="black" fillOpacity="0.6"/>
                        <path
                            d="M32.333 15.1979C29.3278 9.125 23.3174 5 16.5278 5C9.68261 5 3.67217 9.125 0.666957 15.1979C0.555652 15.4271 0.5 15.7135 0.5 16C0.5 16.3438 0.555652 16.6302 0.666957 16.8594C3.67217 22.9323 9.68261 27 16.5278 27C23.3174 27 29.3278 22.9323 32.333 16.8594C32.4443 16.6302 32.5 16.3438 32.5 16.0573C32.5 15.7135 32.4443 15.4271 32.333 15.1979ZM16.5278 24.25C12.0757 24.25 8.51391 20.5833 8.51391 16C8.51391 11.474 12.0757 7.75 16.5278 7.75C20.9243 7.75 24.5417 11.474 24.5417 16V16.0573C24.5417 20.5833 20.9243 24.3073 16.5278 24.3073V24.25ZM16.5278 10.5C16.027 10.5573 15.5261 10.6146 15.0809 10.7292C15.4148 11.1875 15.5817 11.7604 15.5817 12.3906C15.5817 13.8802 14.413 15.0833 12.9661 15.0833C12.3539 15.0833 11.7974 14.9115 11.3522 14.5677C11.2409 15.026 11.1852 15.5417 11.1852 16C11.1852 19.0365 13.5783 21.5 16.5278 21.5C19.4774 21.5 21.8704 19.0365 21.8704 16C21.8704 12.9635 19.4774 10.5573 16.5278 10.5573V10.5Z"
                            fill="white" fillOpacity="0.6"/>
                    </svg>

                ) : ''}
                {errorText !== '' ? <span className="error-text-label">{errorText}</span> : ''}

            </div>


        </div>
)
}