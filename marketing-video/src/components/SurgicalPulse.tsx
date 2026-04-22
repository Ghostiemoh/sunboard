import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Activity, Cpu, Globe, TrendingUp } from "lucide-react";

export const SurgicalPulse: React.FC<{
	status: "syncing" | "optimal";
	latency: number;
	price: number;
}> = ({ status, latency, price }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const opacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: "clamp",
	});

	const scale = spring({
		frame,
		fps,
		config: {
			stiffness: 100,
			damping: 20,
		},
	});

	const pulseOpacity = interpolate(
		Math.sin(frame / 10),
		[-1, 1],
		[0.05, 0.2]
	);

	return (
		<div
			className="bezel-double precision-glass rounded-[40px] p-10 space-y-12 relative overflow-hidden group border border-white/10"
			style={{
				opacity,
				transform: `scale(${scale})`,
			}}
		>
			<div
				className="absolute inset-0 bg-primary/20 pointer-events-none"
				style={{ opacity: status === "optimal" ? pulseOpacity : 0 }}
			/>

			<div className="relative z-10 flex justify-between items-start">
				<div className="space-y-1">
					<p className="text-[12px] font-black uppercase tracking-[0.4em] text-primary">
						Market Snapshot
					</p>
					<h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
						Solana
					</h3>
				</div>
				<div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
					<Activity size={24} />
				</div>
			</div>

			<div className="grid grid-cols-2 gap-8 relative z-10">
				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<TrendingUp size={14} className="text-primary" />
						<p className="text-[11px] font-black uppercase tracking-widest text-white/60">
							SOL price
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-3xl font-black text-white tracking-tighter">
							${price.toFixed(2)}
						</p>
						<p className="text-[11px] text-emerald-500 font-bold uppercase tracking-tighter">
							SOL / USD
						</p>
					</div>
				</div>

				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<Cpu size={14} className="text-primary" />
						<p className="text-[11px] font-black uppercase tracking-widest text-white/60">
							Current slot
						</p>
					</div>
					<div className="space-y-1">
						<p className="text-xl font-black text-white tracking-tighter">
							592,104,221
						</p>
						<p className="text-[11px] text-white/60 font-bold uppercase tracking-tighter">
							RPC view
						</p>
					</div>
				</div>
			</div>

			<div className="space-y-6 pt-6 border-t border-white/5 relative z-10">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-4">
						<div
							className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] transition-colors duration-500 ${
								status === "optimal"
									? "bg-emerald-500 text-emerald-500"
									: "bg-white/20 text-white/20"
							}`}
						/>
						<p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80">
							{status === "optimal" ? "Network: Mainnet" : "Syncing..."}
						</p>
					</div>
					<p className="text-[11px] font-bold text-white/60 uppercase tracking-tighter">
						{latency}ms
					</p>
				</div>

				<div className="flex items-center gap-8 justify-between">
					<div className="flex items-center gap-2">
						<Globe size={14} className="text-white/40" />
						<span className="text-[10px] font-black uppercase text-white/40 tracking-widest">
							On-chain context
						</span>
					</div>
					<div className="h-1 flex-grow bg-white/5 mx-2 rounded-full overflow-hidden">
						<div
							className="h-full bg-primary/40"
							style={{
								width: status === "optimal" ? "100%" : "30%",
								transition: "width 2s ease-in-out",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
