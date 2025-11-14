import { useWebApp } from '@/hooks/useWebApp'
import NavItem from './NavItem'
import { CircleCheckIcon, ScanQrCodeIcon } from 'lucide-react'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../ui/drawer'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import type { UserDTO } from '@/dto/user'
import { useAuth } from '@/contexts/AuthContext'
import api from '@/api/api'
import type { EventDTO } from '@/dto/event'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

export const QRScan = ({ eventId }: { eventId: number }) => {
	const { webApp } = useWebApp()

	const { user } = useAuth()

	const [scannedUser, setScannedUser] = useState<UserDTO | null>(null)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (scannedUser) {
			setOpen(true)
			const registerUser = async () => {
				try {
					const response = await api.post(
						`/events/${eventId}/register/${scannedUser.user_id}`
					)
					if (response.status == 200) {
						toast.success(
							`Пользователь ${scannedUser.first_name} ${scannedUser.last_name} успешно отмечен на мероприятии`
						)
					}
				} catch (err: any) {
					const axErr = err as AxiosError
					if (axErr.status == 400) {
						toast.error(
							`Пользователь ${scannedUser.first_name} ${scannedUser.last_name} уже был отмечен на мероприятии`
						)
					}
					if (axErr.status == 404) {
						toast.error(
							`Пользователь ${scannedUser.first_name} ${scannedUser.last_name} не был найден в списке участников`
						)
					}
				}
			}
			registerUser()
		}
	}, [eventId, scannedUser])

	const handleScan = async () => {
		try {
			const qr = await webApp.openCodeReader()
			if (!qr?.value) return
			const fixed = qr.value.replace(/'/g, '"')
			const parsed = JSON.parse(fixed)
			setScannedUser(parsed as UserDTO)
		} catch (err) {
			console.error('Ошибка парсинга QR:', err)
			toast.error('Не удалось обработать QR-код')
		}
	}

	const closeDrawer = () => {
		setOpen(false)
		setTimeout(() => setScannedUser(null), 300)
	}

	return (
		<>
			<NavItem onClick={handleScan}>
				<ScanQrCodeIcon className='size-8' />
			</NavItem>

			<Drawer open={open} onOpenChange={state => !state && closeDrawer()}>
				<DrawerContent className='bg-zinc-900 border-zinc-800 text-zinc-200'>
					{scannedUser && (
						<div className='mx-auto w-full max-w-sm text-center'>
							<DrawerHeader>
								<DrawerTitle>
									{scannedUser.first_name} {scannedUser.last_name}
								</DrawerTitle>
							</DrawerHeader>
						</div>
					)}
				</DrawerContent>
			</Drawer>
		</>
	)
}
