import { useState, useRef, type ChangeEvent } from 'react'
import { Container } from '@maxhub/max-ui'
import { ImagePlusIcon, PlusCircleIcon, XCircleIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import IconHeader from '@/components/IconHeader'
import { useBackButton } from '@/hooks/useBackButton'
import { Checkbox } from '@/components/ui/checkbox'
import Field from '@/components/form/Field'
import { Button } from '@/components/ui/button'
import type { UserRole } from '@/dto/user'
import api from '@/api/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Calendar } from '@/components/ui/calendar'
import { TimePicker24h } from '@/components/TimePicker24h'
import { motion, AnimatePresence } from 'framer-motion'

interface EventFormData {
	name: string
	description: string
	place: string
	date: Date
	startTime: string
	endTime: string
	audience: UserRole[]
	memberLimit: number | ''
	images: string[]
	feedbackText: string
	feedbackLink: string
}

type FormErrors = Partial<Record<keyof EventFormData | 'time', string>>

const fadeInScale = {
	initial: { opacity: 0, scale: 0.95 },
	animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
	exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

const staggerContainer = {
	animate: { transition: { staggerChildren: 0.1 } },
}

const EventNewPage = () => {
	useBackButton(true)
	const { user } = useAuth()
	const navigate = useNavigate()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const [formData, setFormData] = useState<EventFormData>({
		name: '',
		description: '',
		place: '',
		date: new Date(),
		startTime: '10:00',
		endTime: '12:00',
		audience: [],
		memberLimit: '',
		images: [],
		feedbackText: '',
		feedbackLink: '',
	})

	const [errors, setErrors] = useState<FormErrors>({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleAudienceChange = (role: UserRole) => {
		setFormData(prev => {
			const newAudience = prev.audience.includes(role)
				? prev.audience.filter(r => r !== role)
				: [...prev.audience, role]
			return { ...prev, audience: newAudience }
		})
	}

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		const files = Array.from(e.target.files)
		files.forEach(file => {
			const reader = new FileReader()
			reader.onloadend = () => {
				setFormData(prev => ({
					...prev,
					images: [...prev.images, reader.result as string],
				}))
			}
			reader.readAsDataURL(file)
		})
	}

	const handleRemoveImage = (indexToRemove: number) => {
		setFormData(prev => ({
			...prev,
			images: prev.images.filter((_, index) => index !== indexToRemove),
		}))
	}

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {}
		if (!formData.name.trim())
			newErrors.name = 'Название обязательно для заполнения'
		if (formData.memberLimit === '')
			newErrors.memberLimit = 'Количество участников обязательно'
		else if (Number(formData.memberLimit) < 1)
			newErrors.memberLimit = 'Минимум 1 участник'
		if (!formData.date) newErrors.date = 'Дата обязательна'
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		if (formData.date < today) newErrors.date = 'Дата не может быть в прошлом'
		if (!formData.startTime || !formData.endTime)
			newErrors.time = 'Время начала и конца обязательны'
		else if (formData.startTime > formData.endTime)
			newErrors.time = 'Время начала не может быть позже времени окончания'
		if (formData.audience.length === 0)
			newErrors.audience = 'Выберите хотя бы одну целевую аудиторию'
		if (formData.feedbackText.trim() || formData.feedbackLink.trim()) {
			if (!formData.feedbackText.trim())
				newErrors.feedbackText = 'Введите текст обратной связи'
			if (!formData.feedbackLink.trim())
				newErrors.feedbackLink = 'Введите ссылку для обратной связи'
		}
		setErrors(newErrors)
		const isValid = Object.keys(newErrors).length === 0
		if (!isValid)
			Object.values(newErrors).forEach(error => error && toast.error(error))
		return isValid
	}

	const formatDate = (date: Date) => {
		const y = date.getFullYear()
		const m = (date.getMonth() + 1).toString().padStart(2, '0')
		const d = date.getDate().toString().padStart(2, '0')
		return `${y}-${m}-${d}`
	}

	const handleSubmit = async () => {
		if (!validateForm()) return
		setIsSubmitting(true)
		const eventDTO = {
			name: formData.name.trim(),
			description: formData.description.trim() || null,
			place: formData.place.trim() || null,
			start_time: new Date(
				`${formatDate(formData.date)}T${formData.startTime}`
			),
			end_time: new Date(`${formatDate(formData.date)}T${formData.endTime}`),
			image_base64_list: formData.images,
			audience: formData.audience,
			member_limit: Number(formData.memberLimit),
			feedback_text: formData.feedbackText || '',
			feedback_link: formData.feedbackLink || '',
		}
		try {
			await api.post('/events/', eventDTO)
			toast.success('Мероприятие успешно создано!')
			navigate('/admin')
		} catch (error) {
			console.error('Ошибка при создании мероприятия:', error)
			toast.error('Ошибка при создании мероприятия. Попробуйте позже.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Container className='bg-black'>
			<motion.div
				className='flex flex-col gap-6 pb-24'
				variants={staggerContainer}
				initial='initial'
				animate='animate'
			>
				<motion.div variants={fadeInScale}>
					<IconHeader text='Создание мероприятия' icon={PlusCircleIcon} />
				</motion.div>

				{['name', 'description', 'place'].map((field, idx) => (
					<motion.div key={field} variants={fadeInScale}>
						<Field
							text={
								field === 'name'
									? 'Название мероприятия'
									: field === 'description'
									? 'Описание'
									: 'Место'
							}
							required={field === 'name'}
							error={errors[field as keyof EventFormData]}
						>
							<Input
								name={field}
								value={formData[field as keyof EventFormData] as string}
								placeholder=''
								onChange={handleChange}
							/>
						</Field>
					</motion.div>
				))}

				<motion.div variants={fadeInScale}>
					<Field text='Дата' required={true} error={errors.date}>
						<Calendar
							mode='single'
							selected={formData.date}
							buttonVariant='ghost'
							onSelect={date =>
								date && setFormData(prev => ({ ...prev, date }))
							}
							className='w-full rounded-lg border'
						/>
					</Field>
				</motion.div>

				<motion.div variants={fadeInScale}>
					<Field text='Время' required={true} error={errors.time}>
						<div className='flex gap-4 items-center w-full justify-between'>
							<TimePicker24h
								value={formData.startTime}
								onChange={val =>
									setFormData(prev => ({ ...prev, startTime: val }))
								}
							/>
							<TimePicker24h
								value={formData.endTime}
								onChange={val =>
									setFormData(prev => ({ ...prev, endTime: val }))
								}
							/>
						</div>
					</Field>
				</motion.div>

				<motion.div variants={fadeInScale}>
					<Field text='Для кого' required={true} error={errors.audience}>
						<div className='flex flex-col gap-3'>
							{['student', 'applicant'].map(role => (
								<div key={role} className='flex items-center gap-4'>
									<Checkbox
										id={role}
										checked={formData.audience.includes(role as UserRole)}
										onCheckedChange={() =>
											handleAudienceChange(role as UserRole)
										}
										className='size-6'
									/>
									<label
										htmlFor={role}
										className='text-l font-medium text-zinc-300'
									>
										{role === 'student' ? 'Студенты' : 'Абитуриенты'}
									</label>
								</div>
							))}
						</div>
					</Field>
				</motion.div>

				<motion.div variants={fadeInScale}>
					<Field
						text='Количество участников'
						required={true}
						error={errors.memberLimit}
					>
						<Input
							name='memberLimit'
							value={formData.memberLimit}
							placeholder='100'
							onChange={handleChange}
							type='number'
							min='1'
						/>
					</Field>
				</motion.div>

				<motion.div variants={fadeInScale}>
					<Field text='Фотографии' error={errors.images}>
						<div className='flex flex-wrap gap-4'>
							<AnimatePresence>
								{formData.images.map((base64, index) => (
									<motion.div
										key={index}
										className='relative h-32 w-32'
										variants={fadeInScale}
										initial='initial'
										animate='animate'
										exit='exit'
									>
										<img
											src={base64}
											alt={`upload-preview-${index}`}
											className='h-full w-full object-cover rounded-lg'
										/>
										<button
											onClick={() => handleRemoveImage(index)}
											className='absolute -top-2 -right-2 bg-black rounded-full'
										>
											<XCircleIcon className='text-red-500' />
										</button>
									</motion.div>
								))}
							</AnimatePresence>

							<input
								type='file'
								ref={fileInputRef}
								onChange={handleImageChange}
								accept='image/*'
								multiple
								hidden
							/>
							<Button
								type='button'
								variant='outline'
								onClick={() => fileInputRef.current?.click()}
								className='h-32 w-32 border-dashed border-2 rounded-lg border-zinc-400 flex items-center justify-center'
							>
								<ImagePlusIcon className='stroke-zinc-400' size={40} />
							</Button>
						</div>
					</Field>
				</motion.div>

				{/* Обратная связь */}
				{['feedbackText', 'feedbackLink'].map((field, idx) => (
					<motion.div key={field} variants={fadeInScale}>
						<Field
							text={
								field === 'feedbackText'
									? 'Текст обратной связи'
									: 'Ссылка для обратной связи'
							}
							error={errors[field as keyof EventFormData]}
						>
							<Input
								name={field}
								value={formData[field as keyof EventFormData] as string}
								placeholder={field === 'feedbackText' ? '' : ''}
								onChange={handleChange}
							/>
						</Field>
					</motion.div>
				))}

				<motion.div variants={fadeInScale}>
					<Button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className='w-full mt-4'
					>
						{isSubmitting ? (
							'Создание...'
						) : (
							<>
								<PlusCircleIcon className='mr-2' />
								Создать
							</>
						)}
					</Button>
				</motion.div>
			</motion.div>
		</Container>
	)
}

export default EventNewPage
