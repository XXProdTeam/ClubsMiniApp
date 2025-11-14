import {
	CalendarHeartIcon,
	CalendarPlusIcon,
	CompassIcon,
	CalendarClockIcon,
} from 'lucide-react'
import UnifiedEventPage from './UnifiedEventPage'
import { Button } from '@/components/ui/button'
import { NavDiscovery } from '@/components/nav/NavDiscovery'
import { NavMe } from '@/components/nav/NavMe'
import { NavAddEvent } from '@/components/nav/NavAddEvent'
import QRCode from '@/components/nav/NavQRCode'

export const EventMePage = () => (
	<UnifiedEventPage
		title='Мои мероприятия'
		icon={CalendarHeartIcon}
		fetchUrl='/users/me/events'
		queryParamUserId
		emptyStateContent={
			<div className='flex flex-col w-full items-center justify-center gap-3'>
				<CalendarPlusIcon
					size={24}
					strokeWidth={2}
					className='stroke-zinc-400'
				/>
				<p className='text-zinc-400 text-center'>Здесь пока ничего нет</p>
				<Button onClick={() => (window.location.href = '/events')}>
					Найти мероприятия
				</Button>
			</div>
		}
		navbar={
			<>
				<NavDiscovery />
				<QRCode />
			</>
		}
	/>
)

export const EventDiscoveryPage = () => (
	<UnifiedEventPage
		title='Актуальные события'
		icon={CompassIcon}
		fetchUrl='/users/events'
		queryParamUserId
		placeholder='Название мероприятия...'
		navbar={
			<>
				<NavMe />
				<QRCode />
			</>
		}
	/>
)

export const EventAdminPage = () => (
	<UnifiedEventPage
		title='Текущие события'
		icon={CompassIcon}
		fetchUrl='/events/'
		placeholder='Название мероприятия...'
		navbar={<NavAddEvent />}
	/>
)
