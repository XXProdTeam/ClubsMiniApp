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
import type { UserRole } from '@/dto/user' // Убедитесь, что путь корректен
import api from '@/api/api' // Предполагаем, что у вас есть настроенный api-клиент
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

// Тип для данных формы
interface EventFormData {
	name: string
	description: string
	place: string
	date: string
	startTime: string
	endTime: string
	audience: UserRole[]
	memberLimit: number | ''
	images: string[] // массив Base64 строк
}

// Тип для объекта ошибок
type FormErrors = Partial<Record<keyof EventFormData | 'time', string>>

const EventNewPage = () => {
	useBackButton(true)
	const { user } = useAuth()
	const navigate = useNavigate()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const [formData, setFormData] = useState<EventFormData>({
		name: '',
		description: '',
		place: '',
		date: '',
		startTime: '',
		endTime: '',
		audience: [],
		memberLimit: '',
		images: [],
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

	// --- Валидация и отправка ---

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {}

		if (!formData.name.trim())
			newErrors.name = 'Название обязательно для заполнения'

		if (formData.memberLimit === '') {
			newErrors.memberLimit = 'Количество участников обязательно'
		} else if (Number(formData.memberLimit) < 1) {
			newErrors.memberLimit = 'Минимум 1 участник'
		}

		if (!formData.date) {
			newErrors.date = 'Дата обязательна'
		} else {
			const today = new Date()
			today.setHours(0, 0, 0, 0)
			const selectedDate = new Date(formData.date)
			if (selectedDate < today) {
				newErrors.date = 'Дата не может быть в прошлом'
			}
		}

		if (!formData.startTime || !formData.endTime) {
			newErrors.time = 'Время начала и конца обязательны'
		} else if (formData.startTime > formData.endTime) {
			newErrors.time = 'Время начала не может быть позже времени окончания'
		}

		if (formData.audience.length === 0) {
			newErrors.audience = 'Выберите хотя бы одну целевую аудиторию'
		}

		setErrors(newErrors)
		const isValid = Object.keys(newErrors).length === 0

		// Если форма невалидна, показываем toast для каждой ошибки
		if (!isValid) {
			Object.values(newErrors).forEach(error => {
				if (error) {
					toast.error(error)
				}
			})
		}

		return isValid
	}

	const handleSubmit = async () => {
		if (!validateForm()) return

		setIsSubmitting(true)

		const eventDTO = {
			name: formData.name.trim(),
			description: formData.description.trim() || null,
			place: formData.place.trim() || null,
			start_time: new Date(`${formData.date}T${formData.startTime}`),
			end_time: new Date(`${formData.date}T${formData.endTime}`),
			image_base64_list: formData.images,
			audience: formData.audience,
			member_limit: Number(formData.memberLimit),
		}

		try {
			await api.post('/events/', eventDTO)
			toast.success('Мероприятие успешно создано!')
			navigate('/events') // Перенаправление после успеха
		} catch (error) {
			console.error('Ошибка при создании мероприятия:', error)
			toast.error('Ошибка при создании мероприятия. Попробуйте позже.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Container className='bg-black'>
			<div className='flex flex-col gap-6 pb-24'>
				<IconHeader text='Создание мероприятия' icon={PlusCircleIcon} />

				{/* --- Поля формы --- */}
				<Field text='Название мероприятия' required={true} error={errors.name}>
					<Input
						name='name'
						value={formData.name}
						placeholder='Введите название'
						onChange={handleChange}
					/>
				</Field>

				<Field text='Описание' error={errors.description}>
					<Input
						name='description'
						value={formData.description}
						placeholder='Введите описание'
						onChange={handleChange}
					/>
				</Field>

				<Field text='Место' error={errors.place}>
					<Input
						name='place'
						value={formData.place}
						placeholder='Введите место'
						onChange={handleChange}
					/>
				</Field>

				<Field text='Дата' required={true} error={errors.date}>
					<Input
						name='date'
						value={formData.date}
						onChange={handleChange}
						type='date'
					/>
				</Field>

				<Field text='Время' required={true} error={errors.time}>
					<div className='flex gap-4 items-center w-full justify-between'>
						<div className='flex items-center gap-2 w-full'>
							<p className='text-zinc-400'>С</p>
							<Input
								name='startTime'
								value={formData.startTime}
								onChange={handleChange}
								type='time'
							/>
						</div>
						<div className='flex items-center gap-2 w-full'>
							<p className='text-zinc-400'>До</p>
							<Input
								name='endTime'
								value={formData.endTime}
								onChange={handleChange}
								type='time'
							/>
						</div>
					</div>
				</Field>

				<Field text='Для кого' required={true} error={errors.audience}>
					<div className='flex flex-col gap-3'>
						<div className='flex items-center gap-4'>
							<Checkbox
								id='students'
								checked={formData.audience.includes('student')}
								onCheckedChange={() => handleAudienceChange('student')}
								className='size-6'
							/>
							<label
								htmlFor='students'
								className='text-l font-medium text-zinc-300'
							>
								Студенты
							</label>
						</div>
						<div className='flex items-center gap-4'>
							<Checkbox
								id='applicants'
								checked={formData.audience.includes('applicant')}
								onCheckedChange={() => handleAudienceChange('applicant')}
								className='size-6'
							/>
							<label
								htmlFor='applicants'
								className='text-l font-medium text-zinc-300'
							>
								Абитуриенты
							</label>
						</div>
					</div>
				</Field>

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

				<Field text='Фотографии' error={errors.images}>
					<div className='flex flex-wrap gap-4'>
						{formData.images.map((base64, index) => (
							<div key={index} className='relative h-32 w-32'>
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
							</div>
						))}

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
			</div>
		</Container>
	)
}

export default EventNewPage
