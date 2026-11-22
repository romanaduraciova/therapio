const currentYear = new Date().getFullYear();

export const SiteFooter = () => (
	<footer className="bg-background border-t">
		<div className="mx-auto flex h-16 max-w-6xl items-center px-4">
			<p className="text-muted-foreground text-sm">
				&copy; {currentYear} Therapio. All rights reserved.
			</p>
		</div>
	</footer>
);
