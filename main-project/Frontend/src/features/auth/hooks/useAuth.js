import { useContext } from "react"
import { AuthContext } from "../AuthProvider"
import { getMe, login, refresh, register } from "../services/auth.api";
import { setAccessToken } from "../services/tokenService";

const useAuth = () => {
    const { setUser, setLoading, setError } = useContext(AuthContext);

    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true)
            const data = await register({ username, email, password });
            setUser(data.user);
            setAccessToken(data.accessToken)
            return true
        } catch (error) {
            console.log(error?.response?.data?.message)
            setError(error?.response?.data?.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true)
            const data = await login({ email, password });
            setAccessToken(data.accessToken)
            setUser(data.user);
            return true
        } catch (error) {
            console.log(error?.response?.data?.message)
            setError(error?.response?.data?.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleGetMe = async () => {
        try {
            setLoading(true)
            const token = await refresh()
            setAccessToken(token.accessToken)
            const data = await getMe()
            setUser(data.user)
        } catch (error) {
            console.log(error?.response?.data?.message)
            setError(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return ({ handleRegister, handleLogin, handleGetMe })
}

export default useAuth