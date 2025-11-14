import { Container } from '@maxhub/max-ui'
import { useNavigate } from 'react-router-dom'
import { CalendarClockIcon, CompassIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import NavContainer from '@/components/nav/NavContainer'
import type { EventDTO } from '@/dto/event'
import { useAuth } from '@/contexts/AuthContext'
import api from '@/api/api'
import EventList from '@/components/EventList'
import IconHeader from '@/components/IconHeader'
import { QRScan } from '@/components/nav/NavQRScan'
import { NavAddEvent } from '@/components/nav/NavAddEvent'

const EventAdminPage = () => {
	const navigate = useNavigate()

	const [searchQuery, setSearchQuery] = useState('')
	const [events, setEvents] = useState<EventDTO[]>([])

	const filteredEvents = events.filter(event =>
		event.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const { user } = useAuth()
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await api.get<EventDTO[]>(`/events/`)
				setEvents(response.data)
			} catch (err: any) {
				console.error('Authentication failed:', err)
				setError(err.message || 'Произошла ошибка при аутентификации')
			} finally {
				setLoading(false)
			}
		}
		fetchEvents()
	}, [user])

	return (
		<Container className='bg-black'>
			<div className='flex flex-wrap items-center gap-4 pb-24'>
				<IconHeader text='Текущие события' icon={CompassIcon} />
				<Input
					placeholder='Название мероприятия...'
					onChange={e => setSearchQuery(e.target.value)}
				></Input>

				<EventList events={filteredEvents}>
					<div className='flex flex-col w-full items-center justify-center gap-3 mt-30'>
						<CalendarClockIcon
							size={24}
							strokeWidth={2}
							className='stroke-zinc-400'
						/>
						<p className='text-zinc-400 text-center'>
							{searchQuery ? 'Ничего не найдено' : 'Здесь пока ничего нет'}
						</p>
					</div>
				</EventList>
			</div>
			<NavContainer>
				<NavAddEvent />
			</NavContainer>
		</Container>
	)
}

export default EventAdminPage
