import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Check, FileText, Send, User } from "lucide-react";
import { PrecisionCard } from "./UIPrimitives";

export const InvoiceDemo: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const opacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: "clamp",
	});

	const cardScale = spring({
		frame,
		fps,
		config: { stiffness: 100, damping: 20 },
	});

	// Typewriter for amount
	const amount = "$1,500.00";
	const amountProgress = interpolate(frame, [30, 60], [0, amount.length], {
		extrapolateRight: "clamp",
	});
	const displayAmount = amount.slice(0, Math.floor(amountProgress));

	// Signature animation
	const signatureStart = 90;
	const signatureProgress = interpolate(
		frame,
		[signatureStart, signatureStart + 30],
		[0, 1],
		{ extrapolateRight: "clamp" }
	);

	return (
		<div
			className="w-full h-full flex items-center justify-center p-20"
			style={{ opacity }}
		>
			<PrecisionCard
				className="w-full max-w-2xl bg-slate-900/80"
				style={{ transform: `scale(${cardScale})` }}
			>
				<div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
					<div className="flex items-center gap-4">
						<div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
							<FileText size={20} />
						</div>
						<h3 className="text-xl font-black text-white uppercase tracking-tighter">
							Create Invoice
						</h3>
					</div>
					<div className="text-[10px] font-black uppercase tracking-widest text-primary/60">
						REF: VT-8821
					</div>
				</div>

				<div className="space-y-8">
					<div className="space-y-2">
						<p className="text-[10px] font-black uppercase tracking-widest text-white/40">
							Recipient
						</p>
						<div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
							<div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60">
								<User size={16} />
							</div>
							<span className="text-sm font-bold text-white">
								Ghostie Studio Inc.
							</span>
						</div>
					</div>

					<div className="space-y-2">
						<p className="text-[10px] font-black uppercase tracking-widest text-white/40">
							Amount (USDC)
						</p>
						<div className="p-6 rounded-2xl bg-white/5 border border-white/5">
							<span className="text-4xl font-black text-white tracking-tighter">
								{displayAmount}
								{frame % 20 < 10 && (
									<span className="bg-primary w-1 h-8 inline-block ml-1 align-middle" />
								)}
							</span>
						</div>
					</div>

					<div className="flex gap-4 pt-6">
						<div className="flex-1 px-8 py-5 bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-3">
							Draft Saved
						</div>
						<div
							className={`flex-1 px-8 py-5 font-bold text-[10px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all ${
								frame > signatureStart
									? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
									: "bg-primary text-black"
							}`}
						>
							{frame > signatureStart + 35 ? (
								<>
									Sent Successfully
									<Check size={14} />
								</>
							) : frame > signatureStart ? (
								"Authorizing..."
							) : (
								<>
									Sign & Send
									<Send size={14} />
								</>
							)}
						</div>
					</div>
				</div>

				{/* Signature Overlay Effect */}
				{frame > signatureStart && frame < signatureStart + 40 && (
					<div
						className="absolute inset-0 bg-primary/20 pointer-events-none flex items-center justify-center overflow-hidden"
						style={{ opacity: 1 - signatureProgress }}
					>
						<div className="w-full h-1 bg-primary shadow-[0_0_20px_#00C853] animate-pulse" />
					</div>
				)}
			</PrecisionCard>
		</div>
	);
};
