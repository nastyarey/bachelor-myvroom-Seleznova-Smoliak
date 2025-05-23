

export const validatePassword = (password: string, rePassword: string) => {
    if (password.length < 6) {
        return false;
    }
    if (password !== rePassword) {
        return false
    }
    return true

}