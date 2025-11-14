import type { EventDTO } from '@/dto/event'
import type { ReactNode } from 'react'
import EventCard from './Event'

interface EventListProps {
	events: EventDTO[]
	children: ReactNode
}

const EventList = ({ events, children }: EventListProps) => {
	if (events.length > 0) {
		return (
			<div className='flex flex-col w-full gap-4'>
				{events.map(event => (
					<EventCard key={event.event_id} {...event} />
				))}
			</div>
		)
	}

	return <>{children}</>
}

export default EventList
