import { Routes, Route } from 'react-router-dom'
import MainParticipantPage from './pages/MainParticipantPage'
import RolePickerPage from './pages/RolePickerPage'
import { ThemeProvider } from '@/components/theme-provider'
import MainAdminPage from './pages/MainAdminPage'

const App = () => (
	<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
		<Routes>
			<Route path='/participant' element={<MainParticipantPage />} />
			<Route path='/admin' element={<MainAdminPage />} />
			<Route path='/' element={<RolePickerPage />} />
		</Routes>
	</ThemeProvider>
)

export default App
