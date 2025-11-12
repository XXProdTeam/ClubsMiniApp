import type { EventDTO } from '@/dto/event'
import { Badge } from './ui/badge'
import dayjs from 'dayjs'
import { ImageIcon } from 'lucide-react'
import { Button } from './ui/button'

const EventCard = (event: EventDTO) => {
	const formattedStartTime = dayjs(event.startTime).format('HH:mm')
	const formattedEndTime = dayjs(event.endTime).format('HH:mm')
	const formattedDate = dayjs(event.startTime).format('D MMMM')

	return (
		<div className='flex flex-col p-3 w-full rounded-3xl border justify-between gap-2 pb-3'>
			{event.images[0] ? (
				<img src={event.images[0]} className='rounded-xl h-40 object-cover' />
			) : (
				<div className='flex rounded-xl border-1 h-60 items-center justify-center'>
					<ImageIcon className='stroke-white' />
				</div>
			)}

			<div className='flex flex-col gap-1'>
				<Badge>{event.place}</Badge>
				<div className='flex gap-1'>
					<Badge variant='secondary'>{formattedDate}</Badge>
					<Badge variant='secondary'>
						{formattedStartTime} - {formattedEndTime}
					</Badge>
				</div>
			</div>
			<div>
				<h1 className='text-xl text-left font-medium tracking-tight text-balance text-gray-200'>
					{event.name}
				</h1>
				<p className='text-sm text-left font-regular tracking-tight text-balance text-gray-400'>
					{event.description}
				</p>
			</div>
			<Button>Подробнее</Button>
		</div>
	)
}

export default EventCard
