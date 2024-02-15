const AUTH_TOKEN_ENTRY = 'home-financier-auth-token'

const localStorageUtils = {
    authToken: {
        set: (token: string) => {
            localStorage.setItem(AUTH_TOKEN_ENTRY, token)
        },

        get: (): string | null => {
            return localStorage.getItem(AUTH_TOKEN_ENTRY)
        },

        remove: () => {
            localStorage.removeItem(AUTH_TOKEN_ENTRY)
        }
    }
}

export default localStorageUtils
