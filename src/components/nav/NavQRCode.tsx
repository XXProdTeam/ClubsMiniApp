import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { QrCode } from 'lucide-react'
import type { QrDTO } from '@/dto/qr'
import NavItem from './NavItem'

const QRCode = ({
	qr,
	firstName,
	lastName,
}: {
	qr: QrDTO
	firstName: string
	lastName: string
}) => (
	<Drawer>
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
						{firstName} {lastName}
					</p>
					<img
						src={qr.base64}
						alt='Ваш личный QR-код'
						className='mx-auto rounded-lg size-60'
					/>
					<p className='text-xl font-medium'>
						{firstName} {lastName}
					</p>
				</div>
			</div>
		</DrawerContent>
	</Drawer>
)

export default QRCode
