import Header from '@/components/Header'
import { eventMock1 } from '@/mock'
import { Container } from '@maxhub/max-ui'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '@/components/ui/button'
import { CalendarPlusIcon } from 'lucide-react'
import { createEvent } from 'ics'

const EventDetailPage = () => {
	const { eventId } = useParams<{ eventId: string }>()
	const navigate = useNavigate()

	const event = eventMock1

	const formattedStartTime = dayjs(event.startTime).format('HH:mm')
	const formattedEndTime = dayjs(event.endTime).format('HH:mm')
	const formattedDate = dayjs(event.startTime).format('D MMMM')

	return (
		<Container className='bg-black'>
			<div className='w-full flex flex-col gap-3 mb-30'>
				<Carousel
					className=''
					plugins={[
						Autoplay({
							delay: 2000,
						}),
					]}
				>
					<CarouselContent>
						{event.images.map((image, index) => (
							<CarouselItem key={index}>
								<img
									className='border-1 rounded-2xl h-60 object-cover'
									src={image}
								></img>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
				<div className='flex flex-col gap-2'>
					<div className='flex gap-2'>
						<Badge variant='secondary'>{formattedDate}</Badge>
						<Badge variant='secondary'>
							{formattedStartTime} - {formattedEndTime}
						</Badge>
						<Badge variant='secondary'>до {event.memberLimit} участников</Badge>
					</div>
					<Badge>{event.place}</Badge>
				</div>
				<div className='flex flex-col gap-1'>
					<h1 className='text-2xl font-bold text-zinc-100'>{event.name}</h1>
					<h2 className='text-l font-regular text-zinc-400'>
						{event.description}
					</h2>
				</div>
				<div className='flex flex-col w-full justify-center'>
					<Button size='lg'>Зарегистрироваться</Button>
				</div>
				<div className='flex flex-col gap-2 w-full justify-center'>
					<Button size='lg' variant='destructive'>
						Отменить регистрацию
					</Button>
					<Button size='lg' variant='outline'>
						<CalendarPlusIcon /> Экспорт в календарь
					</Button>
				</div>
			</div>
		</Container>
	)
}

export default EventDetailPage
