import { eventMock1 } from '@/mock'
import { Container } from '@maxhub/max-ui'
import { useParams } from 'react-router-dom'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '@/components/ui/button'
import { CalendarPlusIcon, ImageIcon } from 'lucide-react'
import base64ToImageUrl from '@/utils/image'
import { useEffect, useState } from 'react'
import type { EventUserDTO } from '@/dto/event'
import api from '@/api/api'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

const EventDetailPage = () => {
	const { eventId } = useParams<{ eventId: string }>()

	const [event, setEvent] = useState<EventUserDTO>(eventMock1)

	const { user } = useAuth()

	const formattedStartTime = dayjs(event.start_time).format('HH:mm')
	const formattedEndTime = dayjs(event.end_time).format('HH:mm')
	const formattedDate = dayjs(event.start_time).format('D MMMM')

	const fetchEvent = async () => {
		const response = await api.get<EventUserDTO>(
			`/users/events/${eventId}?user_id=${user?.user_id}`
		)
		setEvent(response.data)
	}

	const registerEvent = async () => {
		await api.post(`/users/events/${eventId}/register?user_id=${user?.user_id}`)
		fetchEvent()
		toast.success('Вы успешно зарегестрировались!', {
			description: 'Будем ждать вас на мероприятии',
		})
	}

	const unregisterEvent = async () => {
		await api.delete(
			`/users/events/${eventId}/register?user_id=${user?.user_id}`
		)
		fetchEvent()
		toast.success('Регистрация успешно отменена!', {
			description: 'Приходите на другие мероприятия',
		})
	}

	const exportToCalendar = async () => {
		await api.get(`/users/events/${eventId}/ics?user_id=${user?.user_id}`)
		toast.success('Событие готово к импорту в календарь', {
			description: 'Откройте чат с ботом и откройте файл .ics',
		})
	}

	useEffect(() => {
		fetchEvent()
	}, [eventId, user])

	return (
		<Container className='bg-black'>
			<div className='w-full flex flex-col gap-3 mb-30'>
				{event.image_base64_list.length > 0 ? (
					<Carousel
						className=''
						plugins={[
							Autoplay({
								delay: 2000,
							}),
						]}
					>
						<CarouselContent>
							{event.image_base64_list.map((image_base64, index) => (
								<CarouselItem key={index}>
									<img
										className='border-1 rounded-2xl h-60 object-cover'
										src={base64ToImageUrl(image_base64)}
									></img>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				) : (
					<div className='flex rounded-xl border-1 h-60 items-center justify-center'>
						<ImageIcon className='stroke-white' />
					</div>
				)}
				<div className='flex flex-col gap-2'>
					<div className='flex gap-2'>
						<Badge variant='secondary'>{formattedDate}</Badge>
						<Badge variant='secondary'>
							{formattedStartTime} - {formattedEndTime}
						</Badge>
						<Badge variant='secondary'>
							до {event.member_limit} участников
						</Badge>
					</div>
					<Badge>{event.place}</Badge>
				</div>
				<div className='flex flex-col gap-1'>
					<h1 className='text-2xl font-bold text-zinc-100'>{event.name}</h1>
					<h2 className='text-l font-regular text-zinc-400'>
						{event.description}
					</h2>
				</div>
				{!event.is_member ? (
					<div className='flex flex-col w-full justify-center'>
						<Button size='lg' onClick={() => registerEvent()}>
							Зарегистрироваться
						</Button>
					</div>
				) : (
					<div className='flex flex-col gap-2 w-full justify-center'>
						<Button
							size='lg'
							onClick={() => unregisterEvent()}
							variant='destructive'
						>
							Отменить регистрацию
						</Button>
						<Button
							size='lg'
							variant='outline'
							onClick={() => exportToCalendar()}
						>
							<CalendarPlusIcon /> Экспорт в календарь
						</Button>
					</div>
				)}
			</div>
		</Container>
	)
}

export default EventDetailPage
