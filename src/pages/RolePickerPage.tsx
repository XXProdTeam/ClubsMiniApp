import api from '@/api/api'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/dto/user'
import { useBackButton } from '@/hooks/useBackButton'
import { Container } from '@maxhub/max-ui'
import { CalendarDaysIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeInScale = {
	initial: { opacity: 0, scale: 0.95 },
	animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
}

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.15,
		},
	},
}

const RolePickerPage = () => {
	const navigate = useNavigate()
	useBackButton(true)
	const { user, updateUserRole } = useAuth()

	const chooseRole = async (role: UserRole) => {
		updateUserRole(role)
	}

	return (
		<Container className='mt-10 bg-black'>
			<motion.div
				className='flex flex-col items-center gap-8'
				variants={staggerContainer}
				initial='initial'
				animate='animate'
			>
				{/* Header */}
				<motion.div
					className='flex flex-col items-center gap-3'
					variants={fadeInScale}
				>
					<div className='p-10 border-2 rounded-full'>
						<CalendarDaysIcon className='stroke-white' size={40} />
					</div>
					<div className='flex flex-col items-center'>
						<h1 className='scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-white'>
							Добро пожаловать в ВУЗ Клабс
						</h1>
					</div>
				</motion.div>

				{/* Role buttons */}
				<motion.div
					className='flex flex-col items-center gap-3'
					variants={fadeInScale}
				>
					<p className='text-l text-zinc-100 font-medium'>Похоже, что вы...</p>
					<motion.div
						className='flex flex-col items-center gap-2 w-full'
						variants={staggerContainer}
					>
						<motion.div variants={fadeInScale} className='w-full'>
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
						</motion.div>

						<motion.div variants={fadeInScale} className='w-full'>
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
						</motion.div>
					</motion.div>
					<p className='text-gray-500 text-l my-2'> - или - </p>

					<motion.div variants={fadeInScale} className='w-full'>
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
					</motion.div>
				</motion.div>
			</motion.div>
		</Container>
	)
}

export default RolePickerPage
