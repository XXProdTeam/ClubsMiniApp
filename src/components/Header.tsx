import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from '@/components/ui/icons/akar-icons-calendar'
import { Container } from '@maxhub/max-ui'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/dto/user'

const UserRoleDisplay: Record<UserRole, string> = {
	[UserRole.admin]: 'Организатор',
	[UserRole.student]: 'Студент',
	[UserRole.applicant]: 'Абитуриент',
}

const Header = () => {
	const navigate = useNavigate()
	const { user } = useAuth()

	const roleDisplayName = user && UserRoleDisplay[user.role]

	return (
		<div className='flex p-5 w-full rounded-3xl border justify-between items-center'>
			<div className='flex flex-col gap-2'>
				<h1 className='scroll-m-5 text-3xl font-bold tracking-tight text-balance text-white'>
					{user?.first_name} {user?.last_name}
				</h1>
				<Badge>{roleDisplayName}</Badge>
			</div>
			<Button variant='outline' onClick={() => navigate('/')}>
				Смена Роли
			</Button>
		</div>
	)
}

export default Header
