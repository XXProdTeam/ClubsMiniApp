import { Badge } from './ui/badge'

const EventCard = () => (
	<div className='flex p-3 w-full rounded-3xl border justify-between gap-2'>
		<img
			src='https://pro-interactive.ru/netcat_files/multifile/160/60116/chuchelo_maslenitsy_3_5_m_1.jpg'
			className='rounded-xl w-2/5 h-60 object-cover'
		/>
		<div className='flex flex-col gap-1 justify-between w-3/5'>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-col gap-1'>
					<h1 className='text-xl font-medium tracking-tight text-balance text-gray-200'>
						Вырезка православных т
					</h1>
					<Badge>Главный корпус ЦУ</Badge>
				</div>
				<p className='text-sm font-regular tracking-tight text-balance text-gray-400'>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text
				</p>
			</div>
			<div className='flex gap-1'>
				<Badge>19 Октября</Badge>
				<Badge variant='secondary'>18:00 - 17:00</Badge>
			</div>
		</div>
	</div>
)

export default EventCard
