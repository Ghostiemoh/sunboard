import React from 'react';
import { Composition, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { ShadowSketchScene } from '../components/ShadowSketchScene';

export const GhostlyShadowSeries: React.FC = () => {
	const FPS = 30;

	return (
		<TransitionSeries>
			{/* Part 1: The Spark */}
			<TransitionSeries.Sequence durationInFrames={10 * FPS}>
				<ShadowSketchScene 
					imageSrc={staticFile('ghostly_shadow_story_1_spark.png')}
					title="The Spark"
					subtitle="It started with the data. A pattern in the noise."
				/>
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				timing={linearTiming({ durationInFrames: 15 })}
				presentation={fade()}
			/>

			{/* Part 2: The Build */}
			<TransitionSeries.Sequence durationInFrames={10 * FPS}>
				<ShadowSketchScene 
					imageSrc={staticFile('ghostly_shadow_story_2_build_clean.png')}
					title="The Build"
					subtitle="Architecture isn't just about code. It's about settlement."
				/>
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				timing={linearTiming({ durationInFrames: 15 })}
				presentation={fade()}
			/>

			{/* Part 3: The Finish */}
			<TransitionSeries.Sequence durationInFrames={10 * FPS}>
				<ShadowSketchScene 
					imageSrc={staticFile('ghostly_shadow_story_3_finish_clean.png')}
					title="The Finish"
					subtitle="Ghostly Shadow. The standard for institutional infrastructure."
				/>
			</TransitionSeries.Sequence>
		</TransitionSeries>
	);
};
