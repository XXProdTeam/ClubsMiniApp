import { Container } from '@maxhub/max-ui'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { useEffect, useState, type ReactNode } from 'react'
import EventList from '@/components/EventList'
import IconHeader from '@/components/IconHeader'
import NavContainer from '@/components/nav/NavContainer'
import QRCode from '@/components/nav/NavQRCode'
import type { EventDTO } from '@/dto/event'
import { useAuth } from '@/contexts/AuthContext'
import api from '@/api/api'

interface UnifiedEventPageProps {
	title: string
	icon: ReactNode
	fetchUrl: string
	queryParamUserId?: boolean
	placeholder?: string
	navbar?: ReactNode
	emptyStateContent?: ReactNode
	searchEnabled?: boolean
}

const UnifiedEventPage = ({
	title,
	icon,
	fetchUrl,
	queryParamUserId = false,
	placeholder = 'Название мероприятия...',
	navbar,
	emptyStateContent,
	searchEnabled = true,
}: UnifiedEventPageProps) => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const [searchQuery, setSearchQuery] = useState('')
	const [events, setEvents] = useState<EventDTO[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const url =
					queryParamUserId && user?.user_id
						? `${fetchUrl}?user_id=${user.user_id}`
						: fetchUrl

				const response = await api.get<EventDTO[]>(url)
				setEvents(response.data)
			} catch (err: any) {
				console.error('Ошибка при получении событий:', err)
				setError(err.message || 'Произошла ошибка при загрузке данных')
			} finally {
				setLoading(false)
			}
		}

		fetchEvents()
	}, [user, fetchUrl, queryParamUserId])

	const filteredEvents = searchEnabled
		? events.filter(event =>
				event.name.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: events

	return (
		<Container className='bg-black'>
			<div className='flex flex-wrap items-center gap-4 pb-24'>
				<IconHeader text={title} icon={icon} />

				{searchEnabled && (
					<Input
						placeholder={placeholder}
						onChange={e => setSearchQuery(e.target.value)}
					/>
				)}

				<EventList events={filteredEvents}>
					{emptyStateContent ?? (
						<div className='flex flex-col w-full items-center justify-center gap-3 mt-30'>
							<p className='text-zinc-400 text-center'>
								{searchQuery ? 'Ничего не найдено' : 'Здесь пока ничего нет'}
							</p>
						</div>
					)}
				</EventList>
			</div>

			<NavContainer>{navbar ?? <QRCode />}</NavContainer>
		</Container>
	)
}

export default UnifiedEventPage
