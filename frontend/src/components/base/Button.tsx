export const Button = ({text, disabled = false, onClick}: {
    text: string,
    disabled?: boolean,
    onClick?: () => void
}) => {
    return <button className="main-btn" disabled={disabled} onClick={onClick}>
        <span>{text}</span>
    </button>
}