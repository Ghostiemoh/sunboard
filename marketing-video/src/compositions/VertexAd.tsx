import React from "react";
import {
	AbsoluteFill,
	Audio,
	interpolate,
	Sequence,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { ArchitectGrid, VertexLogo } from "../components/UIPrimitives";
import { InvoiceDemo } from "../components/InvoiceDemo";
import { SurgicalPulse } from "../components/SurgicalPulse";

export const VertexAd: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	return (
		<AbsoluteFill className="bg-background architect-surface font-sans overflow-hidden">
			{/* ─── Shared Background ─── */}
			<ArchitectGrid />

			{/* ─── Audio Layer ─── */}
			<Audio src={staticFile("drone.mp3")} volume={0.3} playbackRate={1} />
			
			<Sequence from={10} durationInFrames={230} name="VO 0">
				<Audio src={staticFile("vo_0.mp3")} volume={1} />
			</Sequence>
			
			<Sequence from={240} durationInFrames={240} name="VO 1">
				<Audio src={staticFile("vo_1.mp3")} volume={1} />
				<Audio src={staticFile("whoosh.mp3")} volume={0.5} />
			</Sequence>

			<Sequence from={480} durationInFrames={420} name="VO 2">
				<Audio src={staticFile("vo_2.mp3")} volume={1} />
				<Sequence from={10}><Audio src={staticFile("tick.mp3")} volume={0.6} /></Sequence>
			</Sequence>

			<Sequence from={900} durationInFrames={450} name="VO 3">
				<Audio src={staticFile("vo_3.mp3")} volume={1} />
				<Sequence from={100}><Audio src={staticFile("chime.mp3")} volume={0.5} /></Sequence>
			</Sequence>

			<Sequence from={1350} durationInFrames={450} name="VO 4">
				<Audio src={staticFile("vo_4.mp3")} volume={1} />
				<Audio src={staticFile("whoosh.mp3")} volume={0.4} />
			</Sequence>

			{/* ─── Scene 1: The Problem (0-240 frames, 0-8s) ─── */}
			<Sequence durationInFrames={240} name="Chaos">
				<div className="flex flex-col items-center justify-center h-full space-y-4">
					<div className="absolute top-20 left-20 border border-white/5 p-4 rounded-xl rotate-[-5deg] scale-75 opacity-20">
						<p className="text-white/40 text-xs">Spreadsheet_v2_final_final.xlsx</p>
					</div>
					<div className="absolute bottom-40 right-10 border border-white/5 p-4 rounded-xl rotate-[12deg] scale-90 opacity-20 bg-red-900/10 border-red-500/20">
						<p className="text-white/40 text-xs text-right">
							TxFailed: "Insufficient Funds / Slippage"
						</p>
						<p className="text-white/20 text-[10px]">High Latency detected</p>
					</div>

					<h1 className="text-8xl font-black text-white italic tracking-tighter text-center uppercase leading-none">
						The System is
						<br />
						<span className="text-red-500/80">Fragmented.</span>
					</h1>
					<div className="mt-8 text-center" style={{ opacity: interpolate(frame, [0, 90], [0, 1]) }}>
						<p className="text-xl font-bold text-white/50 tracking-wide uppercase italic">
							Slow. Unpredictable.
						</p>
					</div>
				</div>
			</Sequence>

			{/* ─── Scene 2: The Reveal (240-480 frames, 8-16s) ─── */}
			<Sequence from={240} durationInFrames={240} name="Reveal">
				<div className="flex flex-col items-center justify-center h-full relative">
					<div
						className="absolute inset-0 bg-primary/5 animate-pulse"
						style={{ opacity: 0.15 }}
					/>
					<div style={{ transform: `scale(${spring({ frame: frame - 240, fps, config: { damping: 12 } })})` }}>
						<VertexLogo className="w-64 mb-8 mx-auto" />
					</div>
					<h2 className="text-2xl font-black tracking-[0.6em] text-primary uppercase text-center mt-6">
						Layer-Zero Settlement
					</h2>
				</div>
			</Sequence>

			{/* ─── Scene 3: Surgical Execution (480-900 frames, 16-30s) ─── */}
			<Sequence from={480} durationInFrames={420} name="Execution">
				<div className="flex flex-col items-center justify-center h-full relative">
					<div className="absolute top-24 left-0 right-0 text-center">
						<p className="text-xs font-black uppercase tracking-[0.5em] text-primary/60">
							Surgical Performance
						</p>
					</div>
					<div className="w-full max-w-2xl transform scale-125 origin-center">
						<SurgicalPulse
							status={frame - 480 > 150 ? "optimal" : "syncing"}
							latency={frame - 480 > 150 ? 46 : 2840}
							price={frame - 480 > 150 ? 142.21 : 0}
						/>
					</div>
					<div className="absolute bottom-24 left-0 right-0 text-center" style={{ opacity: interpolate(frame - 480, [150, 180], [0, 1]) }}>
						<p className="text-3xl font-black text-white italic tracking-tight uppercase">
							Sub-Second Finality
						</p>
					</div>
				</div>
			</Sequence>

			{/* ─── Scene 4: Invoice Generation (900-1350 frames, 30-45s) ─── */}
			<Sequence from={900} durationInFrames={450} name="Invoicing">
				<div className="flex flex-col items-center justify-center h-full">
					<div className="absolute top-20 left-0 right-0 text-center">
						<p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">
							Cross-chain Cryptographic Certainty
						</p>
					</div>
					<div style={{ transform: `scale(${spring({ frame: frame - 900, fps, config: { damping: 14 } })})` }}>
						<InvoiceDemo />
					</div>
				</div>
			</Sequence>

			{/* ─── Scene 5: Outro (1350-1800 frames, 45-60s) ─── */}
			<Sequence from={1350} durationInFrames={450} name="Outro">
				<div className="flex flex-col items-center justify-center h-full space-y-12">
					<div className="text-center space-y-4" style={{ transform: `scale(${spring({ frame: frame - 1350, fps, config: { damping: 15 } })})` }}>
						<h2 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
							Vertex.
							<br />
							<span className="text-primary italic">Start Building.</span>
						</h2>
						<p className="text-xl text-white/40 font-medium">
							Architect the future of commerce today.
						</p>
					</div>

					<div className="flex gap-6 mt-8" style={{ opacity: interpolate(frame - 1350, [60, 90], [0, 1]) }}>
						<div className="px-12 py-6 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/20">
							Deploy Protocol
						</div>
					</div>

					<VertexLogo className="w-48 opacity-10 grayscale brightness-200 mt-16" />
				</div>
			</Sequence>
		</AbsoluteFill>
	);
};
