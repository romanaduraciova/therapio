import { BlobShape } from '@/components/blob-shape';

const courses = [
	{
		year: 2023,
		name: 'Cognitive Behavioural Therapy – advanced training',
		institution: 'Czech Society for CBT'
	},
	{
		year: 2021,
		name: 'Emotionally Focused Therapy for couples',
		institution: 'ICEEFT Prague'
	},
	{
		year: 2019,
		name: 'Psychotherapy training (5 years)',
		institution: 'Institute of Systemic Experience'
	},
	{
		year: 2014,
		name: 'Master’s degree in Psychology',
		institution: 'Masaryk University, Brno'
	}
];

export const AboutSection = () => (
	<section className="bg-muted relative isolate grid gap-10 px-8 py-12 md:grid-cols-2 md:rounded-none md:bg-transparent md:p-24 lg:gap-16">
		<BlobShape className="text-muted left-1/2 hidden -translate-x-1/2 md:block md:w-[calc(100%+2rem)] xl:w-[calc(100%+8rem)] 2xl:w-[calc(100%+20rem)]" />
		<div className="flex flex-col gap-4">
			<h2 className="font-heading text-2xl font-bold md:text-3xl">About</h2>
			<p className="text-foreground/80">
				I am Mgr. Jana Nováková, a psychotherapist with over ten years of
				experience working with individuals and couples.
			</p>
			<p className="text-foreground/80">
				My aim is to offer a safe, unhurried space where you can slow down,
				understand what you are going through and find your own way forward. I
				focus on anxiety, burnout, relationship difficulties and life
				transitions, combining a systemic approach with practical tools from
				Cognitive Behavioral Therapy (CBT).
			</p>
		</div>
		<div className="flex flex-col gap-6">
			<h2 className="font-heading text-2xl font-bold md:text-3xl">
				Education &amp; Courses
			</h2>
			<ol className="border-foreground/20 flex flex-col gap-6 border-l">
				{courses.map(course => (
					<li key={course.name} className="relative pl-5">
						<span className="bg-primary absolute top-0.5 -left-1.5 size-3 rounded-full" />
						<p className="text-foreground/70 text-sm font-semibold">
							{course.year}
						</p>
						<p className="font-semibold">{course.name}</p>
						<p className="text-foreground/70 text-sm">{course.institution}</p>
					</li>
				))}
			</ol>
		</div>
	</section>
);
