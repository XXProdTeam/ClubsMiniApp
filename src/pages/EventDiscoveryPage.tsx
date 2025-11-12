import { eventMock1, eventMock2, eventMock3, eventMock4, qrMock } from '@/mock'
import { Container } from '@maxhub/max-ui'
import { useNavigate } from 'react-router-dom'
import { CalendarClockIcon, CompassIcon } from 'lucide-react'
import EventCard from '@/components/Event'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import NavContainer from '@/components/nav/NavContainer'
import { NavMe } from '@/components/nav/NavMe'
import QRCode from '@/components/nav/NavQRCode'

const EventDiscoveryPage = () => {
	const navigate = useNavigate()

	const [searchQuery, setSearchQuery] = useState('')
	const events = [eventMock1, eventMock2, eventMock3, eventMock4]

	const filteredEvents = events.filter(event =>
		event.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<Container className='bg-black'>
			<div className='flex flex-wrap items-center gap-4 pb-24'>
				<div className='flex items-center gap-2 px-5'>
					<CompassIcon size={24} strokeWidth={2} className='stroke-zinc-200' />
					<h1 className='scroll-m-20 text-2xl font-medium tracking-tight text-balance text-zinc-200'>
						Актуальные события
					</h1>
				</div>
				<Input
					placeholder='Название мероприятия...'
					onChange={e => setSearchQuery(e.target.value)}
				></Input>

				{filteredEvents.length > 0 ? (
					<div className='flex flex-col gap-4'>
						{filteredEvents.map(event => (
							<EventCard key={event.eventId} {...event} />
						))}
					</div>
				) : (
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
				)}
			</div>
			<NavContainer>
				<NavMe />
				<QRCode qr={qrMock} firstName='Егор' lastName='Фадеев' />
			</NavContainer>
		</Container>
	)
}

export default EventDiscoveryPage
