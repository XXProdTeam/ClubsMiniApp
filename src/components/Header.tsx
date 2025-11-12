import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from '@/components/ui/icons/akar-icons-calendar'
import { Container } from '@maxhub/max-ui'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Header = () => {
	const navigate = useNavigate()
	return (
		<div className='flex p-5 w-full rounded-3xl border justify-between items-center'>
			<div className='flex flex-col gap-2'>
				<h1 className='scroll-m-5 text-3xl font-bold tracking-tight text-balance text-white'>
					Егор Фадеев
				</h1>
				<Badge>Студент</Badge>
			</div>
			<Button variant='outline' onClick={() => navigate('/')}>
				Смена Роли
			</Button>
		</div>
	)
}

export default Header
