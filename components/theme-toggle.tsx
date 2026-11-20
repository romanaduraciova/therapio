'use client';

import { useTheme } from 'next-themes';

import { AnimatedThemeToggler } from './ui/animated-theme-toggler';

const ThemeToggle = () => {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<AnimatedThemeToggler
			theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
			onThemeChange={setTheme}
			size="icon-sm"
		/>
	);
};

export { ThemeToggle };
