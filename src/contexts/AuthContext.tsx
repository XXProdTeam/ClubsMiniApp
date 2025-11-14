import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
	useCallback,
} from 'react'
import api from '@/api/api'
import { useNavigate } from 'react-router-dom'
import type { UserDTO, UserRole } from '@/dto/user'
import { useWebApp } from '@/hooks/useWebApp'

interface AuthContextType {
	user: UserDTO | null
	loading: boolean
	error: string | null
	updateUserRole: (role: UserRole) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate()
	const [user, setUser] = useState<UserDTO | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const { userMax } = useWebApp()

	useEffect(() => {
		const initializeUserSession = async () => {
			try {
				setLoading(true)
				console.log()
				const response = await api.get<UserDTO>(
					`/users/me?user_id=${userMax.id}`
				)
				setUser(response.data)
				if (response.data.role != null) {
					navigate('/me')
				}

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
	}, [userMax])

	const updateUserRole = useCallback(
		async (role: UserRole) => {
			if (!user) {
				throw new Error('User is not authenticated')
			}
			try {
				await api.post(`/users/role/${role}?user_id=${user.user_id}`)
				const updatedUser = { ...user, role: role }
				setUser(updatedUser)
			} catch (err) {
				console.error('Failed to update user role:', err)
				throw err
			}
		},
		[user]
	)

	const value = { user, loading, error, updateUserRole }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
