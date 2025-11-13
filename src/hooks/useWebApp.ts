// src/hooks/useWebApp.ts

import { useEffect, useMemo } from 'react'

const webApp = window.WebApp

export function useWebApp() {
	useEffect(() => {
		if (webApp) {
			webApp.ready()
		}
	}, [])

	const value = useMemo(() => {
		return {
			webApp,
			userMax: webApp?.initDataUnsafe?.user,
			platform: webApp?.platform,
			close: () => webApp?.close(),
		}
	}, [])

	return value
}
