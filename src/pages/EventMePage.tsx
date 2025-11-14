import api from '@/api/api'
import EventCard from '@/components/Event'
import EventList from '@/components/EventList'
import IconHeader from '@/components/IconHeader'
import NavContainer from '@/components/nav/NavContainer'
import { NavDiscovery } from '@/components/nav/NavDiscovery'
import QRCode from '@/components/nav/NavQRCode'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import type { EventDTO } from '@/dto/event'
import { Container } from '@maxhub/max-ui'
import { CalendarHeartIcon, CalendarPlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EventMePage = () => {
	const navigate = useNavigate()

	const { user } = useAuth()
	const [events, setEvents] = useState<EventDTO[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchMeEvents = async () => {
			try {
				const response = await api.get<EventDTO[]>(
					`/users/me/events?user_id=${user?.user_id}`
				)
				setEvents(response.data)
			} catch (err: any) {
				console.error('Authentication failed:', err)
				setError(err.message || 'Произошла ошибка при аутентификации')
			} finally {
				setLoading(false)
			}
		}
		fetchMeEvents()
	}, [user])
	return (
		<>
			<Container className='bg-black'>
				<div className='flex flex-wrap items-center gap-4 pb-24'>
					<IconHeader text='Мои мероприятия' icon={CalendarHeartIcon} />
					<EventList events={events}>
						<div className='flex flex-col w-full items-center justify-center gap-3 mt-30'>
							<CalendarPlusIcon
								size={24}
								strokeWidth={2}
								className='stroke-zinc-400'
							/>
							<p className='text-zinc-400 text-center'>Здесь пока ничего нет</p>
							<Button onClick={() => navigate('/events')}>
								Найти мероприятия
							</Button>
						</div>
					</EventList>
				</div>
				<NavContainer>
					<NavDiscovery />
					<QRCode />
				</NavContainer>
			</Container>
		</>
	)
}

export default EventMePage
