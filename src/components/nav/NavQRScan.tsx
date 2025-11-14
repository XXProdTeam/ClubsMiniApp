import { useWebApp } from '@/hooks/useWebApp'
import NavItem from './NavItem'
import { ScanQrCodeIcon } from 'lucide-react'

export const QRScan = () => {
	const { webApp } = useWebApp()
	return (
		<NavItem
			onClick={() => {
				const res = webApp.openCodeReader()
				console.log(res)
			}}
		>
			<ScanQrCodeIcon className='size-8'></ScanQrCodeIcon>
		</NavItem>
	)
}
