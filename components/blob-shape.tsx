import { cn } from '@/lib/utils';

export const BlobShape = ({ className }: { className?: string }) => (
	<svg
		viewBox="0 0 200 200"
		preserveAspectRatio="none"
		aria-hidden
		className={cn('absolute inset-0 -z-10 size-full', className)}
	>
		<path
			fill="currentColor"
			d="M22 28C50 2 140 0 176 16C198 28 200 110 190 152C180 190 120 200 68 194C24 188 0 158 2 104C4 62 4 44 22 28Z"
		/>
	</svg>
);
