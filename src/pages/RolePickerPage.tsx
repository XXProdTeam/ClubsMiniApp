import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Container } from '@maxhub/max-ui'
import { useNavigate } from 'react-router-dom'

const RolePickerPage = () => {
	const navigate = useNavigate()

	return (
		<Container className='mt-10 bg-black'>
			<div className='flex flex-wrap flex-col items-center gap-12'>
				<div className='flex flex-wrap flex-col items-center gap-6'>
					<Avatar className='size-48'>
						<AvatarFallback className='text-4xl'>CL</AvatarFallback>
					</Avatar>
					<div className='flex flex-wrap flex-col items-center'>
						<h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance text-white'>
							Добро пожаловать в Clubs
						</h1>
						<p className='text-xl'>Кто вы?</p>
					</div>
				</div>

				<div className='flex flex-wrap flex-col items-center gap-5'>
					<div className='flex flex-wrap flex-col items-center gap-3'>
						<Button
							variant='outline'
							className='w-full text-xl px-10 py-7 rounded-2xl'
							onClick={() => navigate('/me')}
						>
							Абитуриент
						</Button>
						<Button
							variant='outline'
							className='w-full text-xl px-10 py-7 rounded-2xl'
							onClick={() => navigate('/me')}
						>
							Студент
						</Button>
					</div>
					<p className='text-gray-500'> - или - </p>
					<Button
						variant='default'
						className='w-full text-xl px-10 py-7 rounded-2xl'
						onClick={() => navigate('/admin')}
					>
						Организатор
					</Button>
				</div>
			</div>
		</Container>
	)
}

export default RolePickerPage
