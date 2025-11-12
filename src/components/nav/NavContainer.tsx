import { type PropsWithChildren } from 'react'

const NavContainer = ({ children }: PropsWithChildren<{}>) => (
	<div className='fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50'>
		{children}
	</div>
)

export default NavContainer
