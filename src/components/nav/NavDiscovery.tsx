import { useNavigate } from 'react-router-dom'
import NavItem from './NavItem'
import { CompassIcon } from 'lucide-react'

export const NavDiscovery = () => {
	const navigate = useNavigate()
	return (
		<NavItem onClick={() => navigate('/events')}>
			<CompassIcon className='size-8'></CompassIcon>
		</NavItem>
	)
}
