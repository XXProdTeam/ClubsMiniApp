import { useNavigate } from 'react-router-dom'
import NavItem from './NavItem'
import { HomeIcon } from 'lucide-react'

export const NavMe = () => {
	const navigate = useNavigate()
	return (
		<NavItem onClick={() => navigate('/me')}>
			<HomeIcon className='size-8'></HomeIcon>
		</NavItem>
	)
}
