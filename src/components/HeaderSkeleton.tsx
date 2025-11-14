import { Button } from '@/components/ui/button'
import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton'

const HeaderSkeleton = () => {
	return (
		<div className='flex p-5 w-full rounded-3xl border justify-between items-center'>
			<div className='flex flex-col gap-2'>
				<Skeleton className='h-7 w-[170px] rounded-full' />
				<Skeleton className='h-5 w-[100px] rounded-full' />
			</div>
			<Button variant='outline' onClick={() => {}}>
				Смена Роли
			</Button>
		</div>
	)
}

export default HeaderSkeleton
