import { Routes, Route } from 'react-router-dom'
import RolePickerPage from './pages/RolePickerPage'
import { ThemeProvider } from '@/components/theme-provider'
import EventDetailPage from './pages/EventDetailPage'
import Header from './components/Header'
import { useAuth } from './contexts/AuthContext'
import EventNewPage from './pages/EventNewPage'
import {
	EventAdminPage,
	EventDiscoveryPage,
	EventMePage,
} from './pages/EventPages'

const App = () => {
	const { user } = useAuth()
	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<div className='bg-black'>
				{user?.role && (
					<div className='mx-2 my-4'>
						<Header></Header>
					</div>
				)}

				<Routes>
					<Route path='/me' element={<EventMePage />} />
					<Route path='/admin' element={<EventAdminPage />} />
					<Route path='/' element={<RolePickerPage />} />
					<Route path='/event/new' element={<EventNewPage />} />
					<Route path='/event/:eventId' element={<EventDetailPage />} />
					<Route path='/events' element={<EventDiscoveryPage />} />
				</Routes>
			</div>
		</ThemeProvider>
	)
}

export default App
