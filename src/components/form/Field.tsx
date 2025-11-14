import type { ReactNode } from 'react'

interface FieldProps {
	text: string
	required?: boolean
	children: ReactNode
}

const Field = ({ text, required = false, children }: FieldProps) => {
	return (
		<div className='flex flex-col w-full gap-2'>
			<div className='flex gap-1'>
				<p className='text-xl font-medium text-zinc-50'>{text}</p>

				{required && <p className='text-xl font-medium text-rose-500'>*</p>}
			</div>

			{children}
		</div>
	)
}

export default Field
