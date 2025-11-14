import api from '@/api/api'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/dto/user'
import { useBackButton } from '@/hooks/useBackButton'
import { useWebApp } from '@/hooks/useWebApp'
import { Container } from '@maxhub/max-ui'
import { CalendarDaysIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const RolePickerPage = () => {
	const navigate = useNavigate()
	useBackButton(true)

	const { user, updateUserRole } = useAuth()

	const chooseRole = async (role: UserRole) => {
		updateUserRole(role)
	}

	return (
		<Container className='mt-10 bg-black'>
			<div className='flex flex-wrap flex-col items-center gap-8'>
				<div className='flex flex-wrap flex-col items-center gap-3'>
					<div className='p-10 border-2 rounded-full'>
						<CalendarDaysIcon className='stroke-white' size={40} />
					</div>
					<div className='flex flex-wrap flex-col items-center'>
						<h1 className='scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance text-white'>
							Добро пожаловать в ВУЗ Клабс
						</h1>
					</div>
				</div>

				<div className='flex flex-wrap flex-col items-center gap-3'>
					<p className='text-l text-zinc-100 font-medium'>Похоже, что вы...</p>
					<div className='flex flex-wrap flex-col items-center gap-2'>
						<Button
							variant='outline'
							className='w-full px-10 py-6 rounded-2xl'
							onClick={() => {
								chooseRole(UserRole.applicant)
								navigate('/me')
							}}
						>
							Абитуриент
						</Button>
						<Button
							variant='outline'
							className='w-full px-10 py-6 rounded-2xl'
							onClick={() => {
								chooseRole(UserRole.student)
								navigate('/me')
							}}
						>
							Студент
						</Button>
					</div>
					<p className='text-gray-500 text-l'> - или - </p>
					<Button
						variant='default'
						className='w-full px-10 py-6 rounded-2xl'
						onClick={() => {
							chooseRole(UserRole.admin)
							navigate('/admin')
						}}
					>
						Организатор
					</Button>
				</div>
			</div>
		</Container>
	)
}

export default RolePickerPage
