import { AboutSection } from '@/components/home/about-section';
import { BlogSection } from '@/components/home/blog-section';
import { HeroSection } from '@/components/home/hero-section';

const HomePage = () => (
	<div className="flex flex-col gap-12 md:gap-20">
		<HeroSection />
		<AboutSection />
		<BlogSection />
	</div>
);

export default HomePage;
