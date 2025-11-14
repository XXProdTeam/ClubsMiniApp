import type { ElementType } from 'react'

interface IconHeaderProps {
	text: string
	icon: ElementType
}

const IconHeader = ({ text, icon: IconComponent }: IconHeaderProps) => {
	return (
		<div className='flex items-center gap-2 px-2'>
			<IconComponent size={24} strokeWidth={2} className='stroke-zinc-200' />
			<h1 className='scroll-m-20 text-2xl font-medium tracking-tight text-balance text-zinc-200'>
				{text}
			</h1>
		</div>
	)
}

export default IconHeader
