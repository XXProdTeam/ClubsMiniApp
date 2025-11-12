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
dayjs.locale('ru')

const Root = () => (
	<MaxUI platform='ios' colorScheme='dark'>
		<BrowserRouter>
			<AuthProvider>
				<QrCodeProvider>
					<App />
				</QrCodeProvider>
			</AuthProvider>
		</BrowserRouter>
	</MaxUI>
)

createRoot(document.getElementById('root')!).render(<Root />)
