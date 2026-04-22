import React from "react";
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { ArchitectGrid, VertexLogo } from "../components/UIPrimitives";
import { InvoiceDemo } from "../components/InvoiceDemo";
import { SurgicalPulse } from "../components/SurgicalPulse";

const Caption: React.FC<{ text: string }> = ({ text }) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 10], [0, 1], {
		extrapolateRight: "clamp",
	});

	return (
		<div
			className="absolute bottom-20 left-0 right-0 text-center px-10"
			style={{ opacity }}
		>
			<div className="inline-block px-8 py-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl">
				<p className="text-xl font-bold text-white tracking-wide uppercase italic">
					"{text}"
				</p>
			</div>
		</div>
	);
};

export const VertexDemo: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill className="bg-background architect-surface font-sans overflow-hidden">
			<ArchitectGrid />

			{/* Scene 1: The Chaos (0-150 frames, 0-5s) */}
			<Sequence durationInFrames={150} name="Chaos">
				<div className="flex flex-col items-center justify-center h-full space-y-4">
					<div className="absolute top-20 left-20 border border-white/5 p-4 rounded-xl rotate-[-5deg] scale-75 opacity-20">
						<p className="text-white/40 text-xs">Spreadsheet_v2_final_final.xlsx</p>
					</div>
					<div className="absolute bottom-40 right-10 border border-white/5 p-4 rounded-xl rotate-[12deg] scale-90 opacity-20">
						<p className="text-white/40 text-xs text-right">
							Client: "What's your wallet address again?"
						</p>
						<p className="text-white/20 text-[10px]">10:42 PM - Yesterday</p>
					</div>

					<h1 className="text-8xl font-black text-white italic tracking-tighter text-center uppercase leading-none">
						Chaos in the
						<br />
						<span className="text-white/20">paper trail.</span>
					</h1>
					<Caption text="Tired of hunting for invoices across Discord DMs?" />
				</div>
			</Sequence>

			{/* Scene 2: The Branding (150-300 frames, 5-10s) */}
			<Sequence from={150} durationInFrames={150} name="Branding">
				<div className="flex flex-col items-center justify-center h-full relative">
					<div
						className="absolute inset-0 bg-primary/5 animate-pulse"
						style={{ opacity: 0.1 }}
					/>
					<VertexLogo className="w-1/2 mb-8" />
					<h2 className="text-lg font-black tracking-[0.6em] text-primary uppercase">
						The Point of Finality
					</h2>
					<Caption text="Meet Vertex. Professional payments. On-chain finality." />
				</div>
			</Sequence>

			{/* Scene 3: The Precision (Invoicing) (300-750 frames, 10-25s) */}
			<Sequence from={300} durationInFrames={450} name="Invoicing">
				<div className="flex flex-col items-center justify-center h-full">
					<div className="absolute top-20 left-0 right-0 text-center">
						<p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">
							Feature 01: Precision Billing
						</p>
					</div>
					<InvoiceDemo />
					<Caption text="Create payment-ready invoices in 30 seconds." />
				</div>
			</Sequence>

			{/* Scene 4: The Finality (Pulse) (750-1100 frames, 25-36s) */}
			<Sequence from={750} durationInFrames={350} name="Finality">
				<div className="flex flex-col items-center justify-center h-full">
					<div className="absolute top-20 left-0 right-0 text-center">
						<p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">
							Feature 02: On-Chain Settlement
						</p>
					</div>
					<div className="w-full max-w-xl">
						<SurgicalPulse
							status={frame > 900 ? "optimal" : "syncing"}
							latency={frame > 900 ? 388 : 0}
							price={frame > 900 ? 142.21 : 0}
						/>
					</div>
					<Caption text="Get paid instantly on the SVM. Verified at the vertex of agreement." />
				</div>
			</Sequence>

			{/* Scene 5: Outro (1100-1350 frames, 36-45s) */}
			<Sequence from={1100} durationInFrames={250} name="Outro">
				<div className="flex flex-col items-center justify-center h-full space-y-12">
					<div className="text-center space-y-4">
						<h2 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
							Institutional Trust.
							<br />
							<span className="text-primary italic">Absolute Agency.</span>
						</h2>
						<p className="text-xl text-white/40 font-medium">
							Join the Vertex of client work.
						</p>
					</div>

					<div className="flex gap-6">
						<div className="px-12 py-6 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl">
							Create Invoice
						</div>
						<div className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl">
							Learn More
						</div>
					</div>

					<Caption text="Never lose the paper trail again. Visit Vertex today." />
					<VertexLogo className="w-32 opacity-20 grayscale brightness-200" />
				</div>
			</Sequence>
		</AbsoluteFill>
	);
};
