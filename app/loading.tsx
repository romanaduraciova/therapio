import { Spinner } from '@/components/ui/spinner';

const Loading = () => (
	<div className="flex flex-1 items-center justify-center py-16">
		<Spinner className="text-muted-foreground size-8" />
	</div>
);

export default Loading;
