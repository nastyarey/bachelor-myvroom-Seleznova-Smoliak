export const validatePassword = (password: string, rePassword: string) => {
    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }
    if (password !== rePassword) {
        return "Passwords have to be the same"
    }
    return null

}