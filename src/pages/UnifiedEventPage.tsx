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
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '@/utils/anim'
import { XCircleIcon } from 'lucide-react'

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

	const fetchEvents = async () => {
		setLoading(true)
		setError(null)
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

	useEffect(() => {
		if (user || !queryParamUserId) fetchEvents()
	}, [user, fetchUrl, queryParamUserId])

	const filteredEvents = searchEnabled
		? events.filter(event =>
				event.name.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: events

	if (loading) {
		return (
			<Container className='bg-black flex items-center justify-center h-[70vh]'>
				<div className='w-12 h-12 border-4 border-t-transparent border-zinc-400 rounded-full animate-spin'></div>
			</Container>
		)
	}

	if (error) {
		return (
			<Container className='bg-black flex items-center justify-center h-[70vh]'>
				<p className='text-red-500'>{error}</p>
			</Container>
		)
	}

	return (
		<Container className='bg-black'>
			<motion.div
				className='flex flex-wrap items-center gap-4 pb-24'
				initial='initial'
				animate='animate'
				exit='exit'
				variants={fadeUp}
			>
				<IconHeader text={title} icon={icon} />

				{searchEnabled && (
					<motion.div
						className='w-full'
						variants={fadeUp}
						transition={{ delay: 0.1 }}
					>
						<Input
							placeholder={placeholder}
							onChange={e => setSearchQuery(e.target.value)}
						/>
					</motion.div>
				)}

				<EventList events={filteredEvents}>
					<AnimatePresence>
						{filteredEvents.length === 0 && (
							<motion.div
								className='flex flex-col w-full items-center justify-center gap-3 mt-30'
								variants={fadeUp}
								initial='initial'
								animate='animate'
								exit='exit'
							>
								{emptyStateContent ?? (
									<>
										<XCircleIcon size={32} className='stroke-zinc-400' />
										<p className='text-zinc-400 text-center'>
											{searchQuery
												? 'Ничего не найдено'
												: 'Здесь пока ничего нет'}
										</p>
									</>
								)}
							</motion.div>
						)}
					</AnimatePresence>
				</EventList>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<NavContainer>{navbar ?? <QRCode />}</NavContainer>
			</motion.div>
		</Container>
	)
}

export default UnifiedEventPage
