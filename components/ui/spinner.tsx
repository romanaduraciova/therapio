import { cn } from 'cn';
import { Loader2Icon } from 'lucide-react';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
	return (
		<output data-slot="spinner" aria-label="Loading" className="inline-flex">
			<Loader2Icon
				aria-hidden
				className={cn('size-4 animate-spin', className)}
				{...props}
			/>
		</output>
	);
}

export { Spinner };
