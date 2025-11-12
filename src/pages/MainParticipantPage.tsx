import EventCard from '@/components/Event'
import NavContainer from '@/components/nav/NavContainer'
import { NavDiscovery } from '@/components/nav/NavDiscovery'
import QRCode from '@/components/nav/NavQRCode'
import { Button } from '@/components/ui/button'
import { eventMock1, eventMock2, qrMock } from '@/mock'
import { Container } from '@maxhub/max-ui'
import { CalendarHeartIcon, CalendarPlusIcon } from 'lucide-react'

const MainParticipantPage = () => {
	const events = [eventMock1, eventMock2, eventMock1, eventMock2]
	return (
		<>
			<Container className='bg-black'>
				<div className='flex flex-wrap items-center gap-4 pb-24'>
					<div className='flex items-center gap-2 px-5'>
						<CalendarHeartIcon
							size={24}
							strokeWidth={2}
							className='stroke-zinc-200'
						/>
						<h1 className='scroll-m-20 text-2xl font-medium tracking-tight text-balance text-zinc-200'>
							Мои мероприятия
						</h1>
					</div>

					{events.length > 0 ? (
						<div className='flex flex-col gap-4'>
							{events.map(event => (
								<EventCard key={event.eventId} {...event} />
							))}
						</div>
					) : (
						<div className='flex flex-col w-full items-center justify-center gap-3 mt-30'>
							<CalendarPlusIcon
								size={24}
								strokeWidth={2}
								className='stroke-zinc-400'
							/>
							<p className='text-zinc-400 text-center'>Здесь пока ничего нет</p>
							<Button>Найти мероприятия</Button>
						</div>
					)}
				</div>
				<NavContainer>
					<NavDiscovery />
					<QRCode qr={qrMock} firstName='Егор' lastName='Фадеев' />
				</NavContainer>
			</Container>
		</>
	)
}

export default MainParticipantPage
