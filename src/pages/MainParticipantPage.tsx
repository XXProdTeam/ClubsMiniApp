import EventCard from '@/components/Event'
import Header from '@/components/Header'
import { CalendarIcon } from '@/components/ui/icons/akar-icons-calendar'
import { Container } from '@maxhub/max-ui'

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { QrCode } from 'lucide-react'

const MainParticipantPage = () => (
	<Drawer>
		<Container className='mt-5 bg-black'>
			<div className='flex flex-wrap items-center gap-4 pb-24'>
				<Header />
				<div className='flex items-center gap-2 px-5'>
					<CalendarIcon size={24} strokeWidth={3} className='stroke-zinc-200' />
					<h1 className='scroll-m-20 text-2xl font-bold tracking-tight text-balance text-zinc-200'>
						Мои мероприятия
					</h1>
				</div>

				<EventCard />
				<EventCard />
				<EventCard />
				<EventCard />
				<EventCard />
			</div>
		</Container>

		<DrawerTrigger asChild>
			<Button
				variant='secondary'
				className='fixed bottom-8 left-1/2 -translate-x-1/2 size-18 z-50 border-1 rounded-3xl'
			>
				<QrCode className='size-8' />
			</Button>
		</DrawerTrigger>

		<DrawerContent className='bg-zinc-900 border-zinc-800 text-zinc-200'>
			<div className='mx-auto w-full max-w-sm text-center'>
				<DrawerHeader>
					<DrawerTitle>Ваш QR-код для входа</DrawerTitle>
					<DrawerDescription>
						Покажите этот код на входе для регистрации
					</DrawerDescription>
				</DrawerHeader>
				<div className='p-4 pb-8'>
					<img
						src='https://images.viblo.asia/f96109f8-e2b2-4944-88ef-071ce79a50a8.png'
						alt='Ваш личный QR-код'
						className='mx-auto rounded-lg'
					/>
				</div>
			</div>
		</DrawerContent>
	</Drawer>
)

export default MainParticipantPage
