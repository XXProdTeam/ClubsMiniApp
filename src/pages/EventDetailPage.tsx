import { eventMock1 } from '@/mock'
import { Container } from '@maxhub/max-ui'
import { useNavigate, useParams } from 'react-router-dom'
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
import { useBackButton } from '@/hooks/useBackButton'
import { UserRole } from '@/dto/user'
import NavContainer from '@/components/nav/NavContainer'
import { QRScan } from '@/components/nav/NavQRScan'
import { NavMembers } from '@/components/nav/NavMembers'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { motion, AnimatePresence } from 'framer-motion'

const fadeInScale = {
	initial: { opacity: 0, scale: 0.95 },
	animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
	exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
}

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const EventDetailPage = () => {
	useBackButton(true)
	const navigate = useNavigate()
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

	const [isExporting, setIsExporting] = useState(false)
	const exportToCalendar = async () => {
		if (isExporting) return
		setIsExporting(true)
		try {
			await api.get(`/users/events/${eventId}/ics?user_id=${user?.user_id}`)
			toast.success('Событие готово к импорту в календарь', {
				description: 'Откройте чат с ботом и откройте файл .ics',
			})
		} catch (err) {
			console.error(err)
			toast.error('Не удалось экспортировать событие')
		} finally {
			setIsExporting(false)
		}
	}

	useEffect(() => {
		fetchEvent()
	}, [eventId, user])

	const deleteEvent = async () => {
		await api.delete(`/events/${event.event_id}`)
		navigate(-1)
	}

	return (
		<Container className='bg-black'>
			<motion.div
				className='flex flex-col gap-3 mb-30'
				variants={staggerContainer}
				initial='initial'
				animate='animate'
				exit='exit'
			>
				{/* Карусель изображений */}
				<motion.div variants={fadeInScale}>
					{event.image_base64_list.length > 0 ? (
						<Carousel plugins={[Autoplay({ delay: 2000 })]}>
							<CarouselContent>
								{event.image_base64_list.map((image_base64, index) => (
									<CarouselItem key={index}>
										<img
											className='border-1 rounded-2xl h-60 object-cover w-full'
											src={base64ToImageUrl(image_base64)}
										/>
									</CarouselItem>
								))}
							</CarouselContent>
						</Carousel>
					) : (
						<div className='flex rounded-xl border-1 h-60 items-center justify-center'>
							<ImageIcon className='stroke-white' />
						</div>
					)}
				</motion.div>

				{/* Badges */}
				<motion.div className='flex flex-col gap-2' variants={fadeInScale}>
					<div className='flex gap-2'>
						<Badge variant='secondary'>{formattedDate}</Badge>
						<Badge variant='secondary'>
							{formattedStartTime} - {formattedEndTime}
						</Badge>
						<Badge variant='secondary'>
							до {event.member_limit} участников
						</Badge>
					</div>
					{event.place && <Badge>{event.place}</Badge>}
				</motion.div>

				{/* Заголовки */}
				<motion.div className='flex flex-col gap-1' variants={fadeInScale}>
					<h1 className='text-2xl font-bold text-zinc-100'>{event.name}</h1>
					<h2 className='text-l font-regular text-zinc-400'>
						{event.description}
					</h2>
				</motion.div>

				{/* Кнопки регистрации/экспорта */}
				<motion.div
					className='flex flex-col gap-2 w-full justify-center'
					variants={fadeInScale}
				>
					{user?.role != UserRole.admin &&
						(!event.is_member ? (
							<Button size='lg' onClick={() => registerEvent()}>
								Зарегистрироваться
							</Button>
						) : (
							<>
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
									disabled={isExporting}
								>
									<>
										<CalendarPlusIcon />
										{isExporting
											? 'Экспортируем в календарь...'
											: 'Экспорт в календарь'}
									</>
								</Button>
							</>
						))}
				</motion.div>

				{/* Админ кнопка */}
				{user?.role == UserRole.admin && (
					<motion.div
						className='flex flex-col gap-2 w-full justify-center'
						variants={fadeInScale}
					>
						<AlertDialog>
							<AlertDialogTrigger className='w-full'>
								<Button size='lg' variant='destructive'>
									Отменить мероприятие
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Вы действительно хотите отменить мероприятие?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Это мероприятие будет удалено без возможности возвращения
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Назад</AlertDialogCancel>
									<AlertDialogAction onClick={() => deleteEvent()}>
										Отменить мероприятие
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</motion.div>
				)}
			</motion.div>

			{/* Navbar */}
			{user?.role == UserRole.admin && (
				<motion.div variants={fadeInScale}>
					<NavContainer>
						<NavMembers eventId={event.event_id} />
						<QRScan eventId={event.event_id} />
					</NavContainer>
				</motion.div>
			)}
		</Container>
	)
}

export default EventDetailPage
