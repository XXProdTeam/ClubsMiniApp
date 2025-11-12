import { type ReactNode, type MouseEventHandler } from 'react'
import { Button } from '../ui/button'

interface NavItemProps {
	children: ReactNode
	onClick: MouseEventHandler<HTMLButtonElement>
}

const NavItem = ({ children, onClick }: NavItemProps) => (
	<Button
		variant='secondary'
		className='size-18 border-1 rounded-3xl'
		onClick={onClick}
	>
		{children}
	</Button>
)

export default NavItem
