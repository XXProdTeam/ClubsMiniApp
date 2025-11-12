import { Routes, Route } from 'react-router-dom'
import EventMePage from './pages/EventMePage'
import RolePickerPage from './pages/RolePickerPage'
import { ThemeProvider } from '@/components/theme-provider'
import MainAdminPage from './pages/MainAdminPage'
import EventDetailPage from './pages/EventDetailPage'
import Header from './components/Header'
import EventDiscoveryPage from './pages/EventDiscoveryPage'

const App = () => (
	<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
		<div className='bg-black'>
			<div className='mx-2 my-4'>
				<Header></Header>
			</div>
			<Routes>
				<Route path='/me' element={<EventMePage />} />
				<Route path='/admin' element={<MainAdminPage />} />
				<Route path='/' element={<RolePickerPage />} />
				<Route path='/event/:eventId' element={<EventDetailPage />} />
				<Route path='/events' element={<EventDiscoveryPage />} />
			</Routes>
		</div>
	</ThemeProvider>
)

export default App
