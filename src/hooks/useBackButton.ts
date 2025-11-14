import { useEffect } from 'react'
import { useWebApp } from '@/hooks/useWebApp'
import { useNavigate } from 'react-router-dom'

export const useBackButton = (isVisible: boolean) => {
	const { webApp } = useWebApp()
	const navigate = useNavigate()

	useEffect(() => {
		const handleBackClick = () => {
			navigate(-1)
		}

		if (isVisible) {
			webApp.BackButton.show()
			webApp.BackButton.onClick(handleBackClick)
		} else {
			webApp.BackButton.hide()
		}

		return () => {
			webApp.BackButton.offClick(handleBackClick)
			webApp.BackButton.hide()
		}
	}, [isVisible, webApp, navigate])
}
