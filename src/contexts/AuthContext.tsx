import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from 'react'
import api from '@/api/api'
import type { UserRole } from '@/dto/user'
import { useNavigate } from 'react-router-dom'

interface User {
	user_id: number
	first_name: string
	last_name: string
	chat_id: number
	role: UserRole
}

interface AuthContextType {
	user: User | null
	loading: boolean
	error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate()
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const initializeUserSession = async () => {
			try {
				const registrationData = {
					user_id: 42,
					first_name: 'Егор',
					last_name: 'Фадеев',
					chat_id: 10,
					role: 'student',
				}

				await api.post('/users/register', registrationData)
			} catch (err: any) {
				/* empty */
			}
			try {
				setLoading(true)

				const response = await api.get<User>('/users/me?user_id=42')
				setUser(response.data)
				navigate('/me')
				setError(null)
			} catch (err: any) {
				console.error('Authentication failed:', err)
				setError(err.message || 'Произошла ошибка при аутентификации')
				setUser(null)
			} finally {
				setLoading(false)
			}
		}

		initializeUserSession()
	}, [])

	const value = { user, loading, error }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
