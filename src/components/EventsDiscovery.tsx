import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { CompassIcon } from 'lucide-react'
import { Input } from './ui/input'
import type { EventDTO } from '@/dto/event'
import EventCard from './Event'

const EventsDiscovery = ({ events }: { events: EventDTO[] }) => (
	<Drawer>
		<DrawerTrigger asChild>
			<Button variant='secondary' className='size-18 border-1 rounded-3xl'>
				<CompassIcon className='size-8' />
			</Button>
		</DrawerTrigger>

		<DrawerContent className='bg-zinc-900 border-zinc-800 text-zinc-200 h-[96dvh]'>
			<div className='mx-auto w-full max-w-sm text-center px-3 h-full flex flex-col'>
				<div className='flex-shrink-0'>
					<DrawerHeader>
						<DrawerTitle>Актуальные мероприятия</DrawerTitle>
						<DrawerDescription>
							Найдите интересующие вас события
						</DrawerDescription>
					</DrawerHeader>
					<Input
						type='text'
						placeholder='Название мероприятия...'
						className='bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-400'
					/>
				</div>
				<div className='flex-grow overflow-y-auto mt-5 mb-10 pb-4'>
					<div className='flex flex-col gap-4'>
						{events.map(event => (
							<EventCard key={event.event_id} {...event} />
						))}
					</div>
				</div>
			</div>
		</DrawerContent>
	</Drawer>
)

export default EventsDiscovery
