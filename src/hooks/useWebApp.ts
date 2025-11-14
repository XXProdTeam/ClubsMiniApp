// src/hooks/useWebApp.ts

import { useEffect, useMemo } from 'react'

export function useWebApp() {
	const webApp = window.WebApp
	useEffect(() => {
		if (webApp) {
			webApp.ready()
		}
	}, [webApp])

	const value = useMemo(() => {
		return {
			webApp,
			userMax: webApp?.initDataUnsafe?.user,
			platform: webApp?.platform,
			close: () => webApp?.close(),
		}
	}, [webApp])

	return value
}
