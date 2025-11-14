import { useNavigate } from 'react-router-dom'
import NavItem from './NavItem'
import { PlusCircleIcon } from 'lucide-react'

export const NavAddEvent = () => {
	const navigate = useNavigate()
	return (
		<NavItem onClick={() => navigate('/event/new')}>
			<PlusCircleIcon className='size-8'></PlusCircleIcon>
		</NavItem>
	)
}
