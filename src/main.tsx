import { createRoot } from 'react-dom/client'
import { MaxUI } from '@maxhub/max-ui'
import '@maxhub/max-ui/dist/styles.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import dayjs from 'dayjs'
import { AuthProvider } from './contexts/AuthContext'
import 'dayjs/locale/ru'
import { QrCodeProvider } from './contexts/QRContext.js'
import { Toaster } from 'sonner'
dayjs.locale('ru')

import('eruda').then(eruda => {
	eruda.default.init()
	//eruda.default.show()
})

const Root = () => {
	return (
		<MaxUI platform='ios' colorScheme='dark'>
			<BrowserRouter>
				<AuthProvider>
					<QrCodeProvider>
						<App />
						<Toaster />
					</QrCodeProvider>
				</AuthProvider>
			</BrowserRouter>
		</MaxUI>
	)
}

createRoot(document.getElementById('root')!).render(<Root />)
