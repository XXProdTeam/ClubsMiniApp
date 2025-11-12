import {
	createContext,
	useContext,
	useState,
	useCallback,
	type ReactNode,
} from 'react'
import api from '@/api/api'
import { useAuth } from './AuthContext'

interface QrCodeResponse {
	base64_str: string
}

interface QrCodeContextType {
	qrCode: string | null
	loading: boolean
	error: string | null
	fetchQrCode: () => void
}

const QrCodeContext = createContext<QrCodeContextType | undefined>(undefined)

export const QrCodeProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useAuth()
	const [qrCode, setQrCode] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const fetchQrCode = useCallback(async () => {
		if (!user) {
			setError('Пользователь не авторизован')
			setLoading(false)
			return
		}

		setLoading(true)
		setError(null)
		setQrCode(null)

		try {
			const response = await api.get<QrCodeResponse>(
				`/users/me/qr?user_id=${user.user_id}`
			)
			setQrCode(response.data.base64_str)
		} catch (err: any) {
			console.error('Failed to fetch QR code:', err)
			setError(err.message || 'Не удалось загрузить QR-код')
		} finally {
			setLoading(false)
		}
	}, [user])

	const value = { qrCode, loading, error, fetchQrCode }

	return (
		<QrCodeContext.Provider value={value}>{children}</QrCodeContext.Provider>
	)
}

export const useQrCode = () => {
	const context = useContext(QrCodeContext)
	if (context === undefined) {
		throw new Error('useQrCode must be used within a QrCodeProvider')
	}
	return context
}
