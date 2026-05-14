import React from "react";
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
	staticFile,
	Audio,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Zap, Shield, TrendingUp, Search, BarChart3, ArrowRight } from "lucide-react";
import { ArchitectGrid, PrecisionCard } from "../components/UIPrimitives";

const Headline: React.FC<{ children: React.ReactNode; className?: string }> = ({
	children,
	className,
}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
	const translateY = interpolate(frame, [0, 15], [20, 0], {
		extrapolateRight: "clamp",
	});

	return (
		<h1
			className={`text-5xl font-black uppercase tracking-tighter italic text-white text-center px-6 ${className}`}
			style={{ opacity, transform: `translateY(${translateY}px)` }}
		>
			{children}
		</h1>
	);
};

const SubHeadline: React.FC<{ children: React.ReactNode; className?: string }> = ({
	children,
	className,
}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [10, 20], [0, 0.7], {
		extrapolateRight: "clamp",
	});

	return (
		<p
			className={`text-sm font-bold tracking-[0.2em] text-sunrise text-center uppercase ${className}`}
			style={{ opacity }}
		>
			{children}
		</p>
	);
};

const ReelMetric: React.FC<{
	label: string;
	value: string;
	icon: React.ReactNode;
	delay?: number;
}> = ({ label, value, icon, delay = 0 }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const scale = spring({
		frame: frame - delay,
		fps,
		config: { damping: 12, stiffness: 100 },
	});

	return (
		<PrecisionCard
			className="w-full max-w-[300px] flex items-center gap-6 py-4 px-6 border-l-4 border-l-sunrise"
			style={{ transform: `scale(${scale})` }}
		>
			<div className="text-sunrise">{icon}</div>
			<div>
				<div className="text-[8px] uppercase tracking-widest text-white/40">
					{label}
				</div>
				<div className="text-xl font-black text-white">{value}</div>
			</div>
		</PrecisionCard>
	);
};

const Scene1: React.FC = () => {
	return (
		<AbsoluteFill className="bg-background flex flex-col items-center justify-center p-10">
			<Audio src={staticFile("sunboard_vo_0.wav")} />
			<ArchitectGrid />
			<div className="bg-sunrise/10 p-6 rounded-full mb-8">
				<Zap size={64} className="text-sunrise" />
			</div>
			<Headline className="text-6xl">Alpha<br/>Detected.</Headline>
			<div className="w-32 h-1 bg-sunrise mt-8" />
		</AbsoluteFill>
	);
};

const Scene2: React.FC = () => {
	return (
		<AbsoluteFill className="bg-background flex flex-col items-center justify-center p-10 gap-8">
			<Audio src={staticFile("sunboard_vo_1.wav")} />
			<ArchitectGrid />
			<Headline className="text-4xl mb-4">
				The market moves at <span className="text-sunrise">400ms.</span>
			</Headline>
			<div className="flex flex-col gap-4 w-full items-center">
				<ReelMetric label="Manual Research" value="Too Slow" icon={<Search size={24}/>} delay={10}/>
				<ReelMetric label="Market Data" value="Fragmented" icon={<BarChart3 size={24}/>} delay={20}/>
				<ReelMetric label="Alpha" value="Missed" icon={<TrendingUp size={24}/>} delay={30}/>
			</div>
		</AbsoluteFill>
	);
};

const Scene3: React.FC = () => {
	const frame = useCurrentFrame();
	const scrollY = interpolate(frame, [0, 150], [0, -400]);

	return (
		<AbsoluteFill className="bg-background flex flex-col pt-20">
			<Audio src={staticFile("sunboard_vo_2.wav")} />
			<ArchitectGrid />
			<div className="px-10 mb-10 flex flex-col items-center gap-2">
				<SubHeadline>THE NEW STANDARD</SubHeadline>
				<Headline className="text-4xl">Sunrise Intel</Headline>
			</div>
			<div className="flex-1 overflow-hidden mx-6 rounded-[32px] bezel-double precision-glass">
				<div style={{ transform: `translateY(${scrollY}px)` }}>
					<Img src={staticFile("sunboard_matrix.png")} className="w-full h-auto" />
				</div>
			</div>
		</AbsoluteFill>
	);
};

const Scene4: React.FC = () => {
	const frame = useCurrentFrame();
	const scoreScale = spring({ frame: frame - 20, fps: 30 });
	const scoreValue = Math.round(interpolate(frame, [30, 60], [0, 94], { extrapolateRight: "clamp" }));

	return (
		<AbsoluteFill className="bg-background flex flex-col items-center justify-center p-10 gap-10">
			<Audio src={staticFile("sunboard_vo_3.wav")} />
			<ArchitectGrid />
			<div className="flex flex-col items-center gap-2">
				<Headline className="text-5xl">Intel to<br/><span className="text-sunrise">Execution.</span></Headline>
			</div>
			
			<div className="relative w-full aspect-square flex items-center justify-center" style={{ transform: `scale(${scoreScale})` }}>
				<div className="absolute inset-0 bg-sunrise/20 blur-3xl rounded-full" />
				<div className="relative z-10 w-full overflow-hidden rounded-[40px] shadow-2xl border border-white/10">
					<Img src={staticFile("sunboard_score.png")} className="w-full h-auto" />
					<div className="absolute top-[48%] right-[5%] bg-sunrise text-black font-black text-2xl w-16 h-16 rounded-full flex items-center justify-center border-4 border-background">
						{scoreValue}
					</div>
				</div>
			</div>
			
			<div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 text-xs font-bold text-white/70 flex items-center gap-3">
				<Zap size={16} className="text-sunrise" /> SPEED: 400MS
			</div>
		</AbsoluteFill>
	);
};

const Scene5: React.FC = () => {
	return (
		<AbsoluteFill className="bg-background flex flex-col items-center justify-center p-10 gap-12">
			<Audio src={staticFile("sunboard_vo_4.wav")} />
			<ArchitectGrid />
			<div className="bg-sunrise p-6 rounded-[32px] shadow-2xl shadow-sunrise/30">
				<Img src={staticFile("logo.svg")} className="w-20 h-20" />
			</div>
			<div className="flex flex-col items-center gap-4">
				<Headline className="text-5xl">Sunboard</Headline>
				<div className="px-8 py-4 bg-sunrise text-black font-black text-sm uppercase tracking-widest rounded-2xl flex items-center gap-3">
					GET STARTED <ArrowRight size={20} />
				</div>
			</div>
			<div className="text-white/40 font-mono text-xs tracking-widest uppercase mt-8">
				sunboard.vercel.app
			</div>
		</AbsoluteFill>
	);
};

export const SunboardReel: React.FC = () => {
	return (
		<TransitionSeries>
			<TransitionSeries.Sequence durationInFrames={90}>
				<Scene1 />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				presentation={fade()}
				timing={linearTiming({ durationInFrames: 15 })}
			/>
			<TransitionSeries.Sequence durationInFrames={150}>
				<Scene2 />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				presentation={fade()}
				timing={linearTiming({ durationInFrames: 15 })}
			/>
			<TransitionSeries.Sequence durationInFrames={210}>
				<Scene3 />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				presentation={fade()}
				timing={linearTiming({ durationInFrames: 15 })}
			/>
			<TransitionSeries.Sequence durationInFrames={210}>
				<Scene4 />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				presentation={fade()}
				timing={linearTiming({ durationInFrames: 15 })}
			/>
			<TransitionSeries.Sequence durationInFrames={180}>
				<Scene5 />
			</TransitionSeries.Sequence>
		</TransitionSeries>
	);
};
