'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface TimePicker24hProps {
	value: string // "HH:mm"
	onChange: (val: string) => void
}

export function TimePicker24h({ value, onChange }: TimePicker24hProps) {
	const [hours, setHours] = React.useState<number>(
		parseInt(value.split(':')[0]) || 0
	)
	const [minutes, setMinutes] = React.useState<number>(
		parseInt(value.split(':')[1]) || 0
	)

	const handleHourSelect = (h: number) => {
		setHours(h)
		onChange(
			`${h.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
		)
	}

	const handleMinuteSelect = (m: number) => {
		setMinutes(m)
		onChange(
			`${hours.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
		)
	}

	return (
		<div className='flex gap-4'>
			{/* Часы */}
			<ScrollArea className='h-30 w-20 border rounded-2xl'>
				<div className='flex flex-col p-1'>
					{Array.from({ length: 24 }, (_, i) => i).map(h => (
						<Button
							key={h}
							size='sm'
							variant={hours === h ? 'default' : 'ghost'}
							className='w-full'
							onClick={() => handleHourSelect(h)}
						>
							{h.toString().padStart(2, '0')}
						</Button>
					))}
				</div>
				<ScrollBar orientation='vertical' />
			</ScrollArea>

			{/* Минуты с шагом 5 */}
			<ScrollArea className='h-30 w-20 border rounded-2xl'>
				<div className='flex flex-col p-1'>
					{Array.from({ length: 12 }, (_, i) => i * 5).map(m => (
						<Button
							key={m}
							size='sm'
							variant={minutes === m ? 'default' : 'ghost'}
							className='w-full'
							onClick={() => handleMinuteSelect(m)}
						>
							{m.toString().padStart(2, '0')}
						</Button>
					))}
				</div>
				<ScrollBar orientation='vertical' />
			</ScrollArea>
		</div>
	)
}
