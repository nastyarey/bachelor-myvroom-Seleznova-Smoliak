export const validatePhone = (phone: string) => {
    if(phone === '') {
        return false
    }
    const regex = /^\+380\d{9}$/
    return regex.test(phone)
}