import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import { noise2D } from '@remotion/noise';

interface ShadowSketchSceneProps {
	imageSrc: string;
	title: string;
	subtitle: string;
}

export const ShadowSketchScene: React.FC<ShadowSketchSceneProps> = ({
	imageSrc,
	title,
	subtitle,
}) => {
	const frame = useCurrentFrame();
	const { fps, width, height } = useVideoConfig();

	// Mastered Spring Physics: "The Elastic Reveal"
	const entrance = spring({
		frame,
		fps,
		config: {
			stiffness: 100,
			damping: 12,
			mass: 0.5,
		},
	});

	// Living Texture: Subtle noise for the paper background
	const noiseX = noise2D('ghostly-shadow-x', frame * 0.1, 0);
	const noiseY = noise2D('ghostly-shadow-y', 0, frame * 0.1);

	const scale = interpolate(entrance, [0, 1], [0.8, 1]);
	const opacity = interpolate(entrance, [0, 1], [0, 1]);
	const textY = interpolate(entrance, [0, 1], [50, 0]);

	return (
		<AbsoluteFill className="bg-[#F5F2EA] items-center justify-center font-sans">
			{/* Living Paper Texture */}
			<div 
				className="absolute inset-0 opacity-10 pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
					backgroundSize: '20px 20px',
					transform: `translate(${noiseX * 2}px, ${noiseY * 2}px)`,
				}}
			/>

			{/* Main Content Container */}
			<div 
				style={{
					opacity,
					transform: `scale(${scale})`,
					width: '80%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{/* The Shadow Sketch */}
				<img 
					src={imageSrc} 
					className="w-full h-auto shadow-2xl rounded-sm border-[1px] border-black/10"
					alt="Shadow Sketch"
				/>

				{/* Kinetic Typography */}
				<div 
					className="mt-12 text-center"
					style={{ transform: `translateY(${textY}px)` }}
				>
					<h1 className="text-7xl font-bold text-black mb-4 tracking-tighter uppercase">
						{title}
					</h1>
					<div className="inline-block border-[1px] border-black px-6 py-2">
						<p className="text-3xl italic font-serif text-black/80">
							{subtitle}
						</p>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
