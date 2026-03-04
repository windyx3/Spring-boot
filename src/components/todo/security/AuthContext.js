import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const[isAuthenticated, setIsAuthenticated] = useState(false)
    const[username, setUsername] = useState(null)

    const[token, setToken] = useState(null)

    async function login(name, password) {

        try {
            const response = await executeJwtAuthenticationService(name, password)

            if(response.status === 200) {
                const jwtToken = 'Bearer ' + response.data.token
                setIsAuthenticated(true)
                setUsername(name)
                setToken(jwtToken)

                apiClient.interceptors.request.use((config => {
                    config.headers.Authorization = jwtToken
                    return config
                }))
                return true
            }else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }
    }

    function logout() {
        setIsAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, username, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}