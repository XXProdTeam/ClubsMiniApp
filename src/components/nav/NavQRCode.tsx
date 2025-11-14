import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { QrCode } from 'lucide-react'
import NavItem from './NavItem'
import { useAuth } from '@/contexts/AuthContext'
import { useQrCode } from '@/contexts/QRContext'
import base64ToImageUrl, { base64ToImageUrlFix } from '@/utils/image'
import { useEffect } from 'react'

const QRCode = () => {
	const { user } = useAuth()
	const { qrCode, loading, error, fetchQrCode } = useQrCode()

	const handleOpenChange = (open: boolean) => {
		if (open) {
			fetchQrCode()
		}
	}

	return (
		<Drawer onOpenChange={handleOpenChange}>
			<DrawerTrigger asChild>
				<NavItem>
					<QrCode className='size-8' />
				</NavItem>
			</DrawerTrigger>

			<DrawerContent className='bg-zinc-900 border-zinc-800 text-zinc-200'>
				<div className='mx-auto w-full max-w-sm text-center'>
					<DrawerHeader>
						<DrawerTitle>Ваш QR-код для входа</DrawerTitle>
						<DrawerDescription>
							Покажите этот код на входе для регистрации
						</DrawerDescription>
					</DrawerHeader>
					<div className='flex flex-col p-4 pb-8 gap-1'>
						<p className='text-xl font-medium rotate-180'>
							{user?.first_name} {user?.last_name}
						</p>
						<img
							src={base64ToImageUrlFix(qrCode)}
							alt='Ваш личный QR-код'
							className='mx-auto rounded-lg size-60'
						/>
						<p className='text-xl font-medium'>
							{user?.first_name} {user?.last_name}
						</p>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default QRCode
