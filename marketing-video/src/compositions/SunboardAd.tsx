import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
	staticFile,
	Sequence,
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
			className={`text-6xl font-black uppercase tracking-tighter italic text-white ${className}`}
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
			className={`text-xl font-medium tracking-wide text-white/70 ${className}`}
			style={{ opacity }}
		>
			{children}
		</p>
	);
};

const MetricCard: React.FC<{
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

	const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
		extrapolateRight: "clamp",
	});

	return (
		<PrecisionCard
			className="w-64 flex flex-col gap-4 border-l-4 border-l-sunrise"
			style={{ opacity, transform: `scale(${scale})` }}
		>
			<div className="text-sunrise">{icon}</div>
			<div>
				<div className="text-[10px] uppercase tracking-widest text-white/50 mb-1">
					{label}
				</div>
				<div className="text-2xl font-black text-white">{value}</div>
			</div>
		</PrecisionCard>
	);
};

const Scene1: React.FC = () => {
	return (
		<AbsoluteFill className="bg-background flex items-center justify-center">
			<Audio src={staticFile("sunboard_vo_0.wav")} />
			<ArchitectGrid />
			<div className="flex flex-col items-center gap-2">
				<Headline className="text-7xl">Alpha Detected.</Headline>
				<div className="w-full h-1 bg-sunrise/50 mt-4 overflow-hidden">
					<div className="h-full bg-sunrise animate-pulse w-full" />
				</div>
			</div>
		</AbsoluteFill>
	);
};

const Scene2: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 10], [0, 1]);

	return (
		<AbsoluteFill className="bg-background flex items-center justify-center">
			<Audio src={staticFile("sunboard_vo_1.wav")} />
			<ArchitectGrid />
			<div className="flex flex-col items-center gap-12 max-w-4xl px-20">
				<Headline className="text-center leading-tight">
					The market moves at <span className="text-sunrise">400ms.</span>
				</Headline>
				<div className="flex gap-8" style={{ opacity }}>
					<MetricCard
						label="Manual Research"
						value="Too Slow"
						icon={<Search size={32} />}
						delay={10}
					/>
					<MetricCard
						label="Market Data"
						value="Fragmented"
						icon={<BarChart3 size={32} />}
						delay={15}
					/>
					<MetricCard
						label="Alpha"
						value="Missed"
						icon={<TrendingUp size={32} />}
						delay={20}
					/>
				</div>
			</div>
		</AbsoluteFill>
	);
};

const Scene3: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const scale = interpolate(frame, [0, 60], [1.2, 1], {
		extrapolateRight: "clamp",
	});

	const translateY = interpolate(frame, [0, 30], [50, 0], {
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill className="bg-background">
			<Audio src={staticFile("sunboard_vo_2.wav")} />
			<ArchitectGrid />
			<div className="p-20 flex flex-col gap-12 h-full">
				<div className="flex justify-between items-end">
					<div className="flex flex-col gap-2">
						<SubHeadline>MEET THE NEW STANDARD</SubHeadline>
						<Headline>Sunrise Intelligence.</Headline>
					</div>
					<div className="bg-sunrise p-4 rounded-2xl shadow-2xl shadow-sunrise/20">
						<Img src={staticFile("logo.svg")} className="w-12 h-12" />
					</div>
				</div>

				<div
					className="flex-1 overflow-hidden rounded-[32px] bezel-double precision-glass relative"
					style={{ transform: `scale(${scale}) translateY(${translateY}px)` }}
				>
					<Img src={staticFile("sunboard_matrix.png")} className="w-full h-auto" />
					<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
				</div>
			</div>
		</AbsoluteFill>
	);
};

const Scene4: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const scoreScale = spring({
		frame: frame - 15,
		fps,
		config: { damping: 10, stiffness: 100 },
	});

	const scoreValue = Math.round(interpolate(frame, [20, 50], [0, 94], {
		extrapolateRight: "clamp",
	}));

	return (
		<AbsoluteFill className="bg-background">
			<Audio src={staticFile("sunboard_vo_3.wav")} />
			<ArchitectGrid />
			<div className="flex h-full">
				<div className="w-1/2 p-20 flex flex-col justify-center gap-8">
					<Headline className="text-7xl leading-none">
						Intel to <br />
						<span className="text-sunrise">Execution.</span>
					</Headline>
					<p className="text-white/60 text-xl max-w-md">
						Proprietary algorithmic scoring based on price velocity, liquidity depth, and on-chain flow.
					</p>
					<div className="flex gap-4">
						<div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white/70">
							<Zap size={14} className="text-sunrise" /> SPEED: 400MS
						</div>
						<div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white/70">
							<Shield size={14} className="text-sunrise" /> RISK: LOW
						</div>
					</div>
				</div>
				<div className="w-1/2 relative flex items-center justify-center p-20">
					<div
						className="relative z-10 w-full overflow-hidden rounded-[40px] shadow-2xl shadow-sunrise/10"
						style={{ transform: `scale(${scoreScale})` }}
					>
						<Img src={staticFile("sunboard_score.png")} className="w-full h-auto" />
						<div className="absolute top-[48%] right-[5%] bg-sunrise text-black font-black text-4xl w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-8 border-background">
							{scoreValue}
						</div>
					</div>
					<div className="absolute inset-0 flex items-center justify-center opacity-20 blur-3xl">
						<div className="w-96 h-96 bg-sunrise rounded-full" />
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

const Scene5: React.FC = () => {
	const frame = useCurrentFrame();
	const scale = spring({ frame, fps: 30, config: { damping: 12 } });

	return (
		<AbsoluteFill className="bg-background flex flex-col items-center justify-center gap-12">
			<Audio src={staticFile("sunboard_vo_4.wav")} />
			<ArchitectGrid />
			<div className="flex flex-col items-center gap-6" style={{ transform: `scale(${scale})` }}>
				<div className="bg-sunrise p-8 rounded-[40px] shadow-2xl shadow-sunrise/30 mb-4">
					<Img src={staticFile("logo.svg")} className="w-24 h-24" />
				</div>
				<Headline className="text-6xl text-center">Sunboard Terminal</Headline>
				<SubHeadline className="text-2xl">PRECISION DATA. ZERO FRICTION.</SubHeadline>
			</div>

			<div className="mt-8 flex flex-col items-center gap-4">
				<div className="px-12 py-6 bg-sunrise text-black font-black text-xl uppercase tracking-widest rounded-2xl flex items-center gap-4 shadow-2xl shadow-sunrise/20 cursor-pointer">
					GO TO TERMINAL <ArrowRight size={24} />
				</div>
				<div className="text-white/40 font-mono text-sm tracking-widest uppercase">
					sunboard.vercel.app
				</div>
			</div>
		</AbsoluteFill>
	);
};

export const SunboardAd: React.FC = () => {
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
				presentation={slide({ direction: "from-right" })}
				timing={linearTiming({ durationInFrames: 20 })}
			/>
			<TransitionSeries.Sequence durationInFrames={210}>
				<Scene3 />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				presentation={fade()}
				timing={linearTiming({ durationInFrames: 20 })}
			/>
			<TransitionSeries.Sequence durationInFrames={210}>
				<Scene4 />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				presentation={slide({ direction: "from-bottom" })}
				timing={linearTiming({ durationInFrames: 20 })}
			/>
			<TransitionSeries.Sequence durationInFrames={180}>
				<Scene5 />
			</TransitionSeries.Sequence>
		</TransitionSeries>
	);
};
