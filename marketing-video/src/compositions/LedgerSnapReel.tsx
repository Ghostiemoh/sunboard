import React from "react";
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import {
	ArrowDownRight,
	ArrowRight,
	ArrowUpRight,
	BarChart3,
	Camera,
	Check,
	ChevronRight,
	FileText,
	Fingerprint,
	Globe,
	Inbox,
	Lock,
	PieChart,
	Receipt,
	ScanLine,
	ShieldCheck,
	Sparkles,
	TrendingDown,
	TrendingUp,
	Upload,
	Wallet,
	Zap,
} from "lucide-react";

/* ─── Design Tokens (from LedgerSnap's Material You palette) ─── */
const PRIMARY = "#005ab3";
const PRIMARY_CONTAINER = "#0073e0";
const SECONDARY = "#006e28";
const SECONDARY_CONTAINER = "#6ffb85";
const ERROR = "#ba1a1a";
const TERTIARY = "#9a4100";
const SURFACE = "#f9f9fe";
const SURFACE_DIM = "#d9dade";
const ON_SURFACE = "#1a1c1f";
const OUTLINE = "#717786";
const OUTLINE_VARIANT = "#c0c6d6";
const INVERSE_SURFACE = "#2e3034";
const INVERSE_ON_SURFACE = "#f0f0f5";

/* ─── Shared Primitives ─── */

const DotGrid: React.FC = () => (
	<div
		className="absolute inset-0 pointer-events-none"
		style={{
			backgroundImage: `radial-gradient(circle at 1px 1px, ${OUTLINE}18 1px, transparent 0)`,
			backgroundSize: "24px 24px",
		}}
	/>
);

const GlowOrb: React.FC<{
	color: string;
	size: number;
	top?: string;
	left?: string;
	right?: string;
	bottom?: string;
	opacity?: number;
}> = ({ color, size, top, left, right, bottom, opacity = 0.12 }) => (
	<div
		className="absolute rounded-full pointer-events-none"
		style={{
			width: size,
			height: size,
			background: color,
			filter: `blur(${size * 0.5}px)`,
			opacity,
			top,
			left,
			right,
			bottom,
		}}
	/>
);

const LedgerSnapWordmark: React.FC<{ size?: number; dark?: boolean }> = ({
	size = 42,
	dark = false,
}) => (
	<span
		className="font-black tracking-tighter"
		style={{
			fontSize: size,
			lineHeight: 1,
			color: dark ? "#fff" : ON_SURFACE,
			fontFamily: "Inter, system-ui, sans-serif",
		}}
	>
		Ledger<span style={{ color: PRIMARY }}>Snap</span>
	</span>
);

const FadeIn: React.FC<{
	children: React.ReactNode;
	delay?: number;
	direction?: "up" | "down" | "left" | "right";
	scale?: boolean;
}> = ({ children, delay = 0, direction = "up", scale = false }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const f = frame - delay;

	const opacity = interpolate(f, [0, 14], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const dirMap = {
		up: { x: 0, y: 28 },
		down: { x: 0, y: -28 },
		left: { x: 28, y: 0 },
		right: { x: -28, y: 0 },
	};

	const translateX = interpolate(f, [0, 16], [dirMap[direction].x, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const translateY = interpolate(f, [0, 16], [dirMap[direction].y, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const s = scale
		? spring({
				frame: Math.max(0, f),
				fps,
				config: { stiffness: 120, damping: 18 },
			})
		: 1;

	return (
		<div
			style={{
				opacity,
				transform: `translate(${translateX}px, ${translateY}px) scale(${s})`,
			}}
		>
			{children}
		</div>
	);
};

/* ─── Scene 1: Pain Point Hook (0-90 frames, 3s) ─── */
const ScenePain: React.FC = () => {
	const frame = useCurrentFrame();

	const line1 = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
	const line2 = interpolate(frame, [15, 27], [0, 1], { extrapolateRight: "clamp" });
	const line3 = interpolate(frame, [35, 47], [0, 1], { extrapolateRight: "clamp" });

	const flashOpacity = interpolate(frame, [55, 60, 68, 72], [0, 0.08, 0.08, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill
			style={{ background: INVERSE_SURFACE, fontFamily: "Inter, system-ui, sans-serif" }}
			className="flex flex-col items-center justify-center overflow-hidden"
		>
			<DotGrid />
			<GlowOrb color={PRIMARY} size={400} top="-120px" right="-80px" opacity={0.06} />

			<div className="absolute inset-0" style={{ background: PRIMARY, opacity: flashOpacity }} />

			<div className="relative z-10 text-center px-12 space-y-5">
				<div style={{ opacity: line1 }}>
					<p
						className="font-black uppercase"
						style={{
							fontSize: 12,
							color: `${PRIMARY_CONTAINER}`,
							letterSpacing: "0.5em",
						}}
					>
						lost receipts. messy finances.
					</p>
				</div>

				<div style={{ opacity: line2 }}>
					<h1
						className="font-black uppercase tracking-tighter leading-none"
						style={{ fontSize: 68, color: "#fff" }}
					>
						SNAP IT.
						<br />
						<span style={{ color: SECONDARY_CONTAINER }}>TRACK IT.</span>
					</h1>
				</div>

				<div style={{ opacity: line3 }}>
					<p
						className="font-medium"
						style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 320, margin: "0 auto" }}
					>
						AI-powered expense tracking for Nigerian businesses.
					</p>
				</div>
			</div>
		</AbsoluteFill>
	);
};

/* ─── Scene 2: Brand Reveal (90-180 frames, 3s) ─── */
const SceneBrand: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const logoScale = spring({
		frame,
		fps,
		config: { stiffness: 80, damping: 15 },
	});

	const taglineOpacity = interpolate(frame, [28, 42], [0, 1], {
		extrapolateRight: "clamp",
	});

	const orbPulse = interpolate(Math.sin(frame / 10), [-1, 1], [260, 320]);
	const orbOpacity = interpolate(Math.sin(frame / 10), [-1, 1], [0.03, 0.08]);

	return (
		<AbsoluteFill
			style={{ background: SURFACE, fontFamily: "Inter, system-ui, sans-serif" }}
			className="flex flex-col items-center justify-center overflow-hidden"
		>
			<DotGrid />

			{/* Pulsing orbital ring */}
			<div
				className="absolute rounded-full border-2 pointer-events-none"
				style={{
					width: orbPulse,
					height: orbPulse,
					borderColor: PRIMARY,
					opacity: orbOpacity,
				}}
			/>

			<div className="flex flex-col items-center gap-6" style={{ transform: `scale(${logoScale})` }}>
				{/* Logo icon stand-in */}
				<div
					className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center"
					style={{
						background: PRIMARY,
						boxShadow: `0 20px 60px ${PRIMARY}44`,
					}}
				>
					<Receipt size={56} color="#fff" strokeWidth={2.5} />
				</div>
				<LedgerSnapWordmark size={48} />
			</div>

			<div style={{ opacity: taglineOpacity }} className="mt-5">
				<p
					className="font-black uppercase text-center"
					style={{ fontSize: 12, color: PRIMARY, letterSpacing: "0.4em" }}
				>
					Smart Financial Ledger
				</p>
			</div>
		</AbsoluteFill>
	);
};

/* ─── Scene 3: Core Features (180-420 frames, 8s) ─── */
const SceneFeatures: React.FC = () => {
	const frame = useCurrentFrame();

	const features = [
		{
			icon: Camera,
			title: "Snap Receipts",
			desc: "AI extracts amounts, vendors, and categories from any receipt photo.",
			accent: PRIMARY,
			delay: 0,
		},
		{
			icon: BarChart3,
			title: "Deep Insights",
			desc: "Bento-grid analytics with flow charts, category breakdowns, and liquidity health.",
			accent: SECONDARY,
			delay: 28,
		},
		{
			icon: Inbox,
			title: "Smart Inbox",
			desc: "AI-captured receipts land in your inbox to review before archiving.",
			accent: PRIMARY_CONTAINER,
			delay: 56,
		},
		{
			icon: FileText,
			title: "Full Ledger",
			desc: "Search, filter, and export your complete transaction archive as CSV.",
			accent: TERTIARY,
			delay: 84,
		},
		{
			icon: Globe,
			title: "Built for Nigeria",
			desc: "Naira-native tracking. OPay, GTBank, and local merchant support.",
			accent: SECONDARY,
			delay: 112,
		},
	];

	const headerOpacity = interpolate(frame, [0, 14], [0, 1], {
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill
			style={{ background: SURFACE, fontFamily: "Inter, system-ui, sans-serif" }}
			className="flex flex-col overflow-hidden"
		>
			<DotGrid />
			<GlowOrb color={PRIMARY} size={400} bottom="-150px" left="-100px" opacity={0.05} />

			<div className="flex-1 flex flex-col px-10 py-14">
				<div style={{ opacity: headerOpacity }} className="mb-8">
					<p
						className="font-black uppercase"
						style={{ fontSize: 10, color: PRIMARY, letterSpacing: "0.5em", marginBottom: 8 }}
					>
						Core Capabilities
					</p>
					<h2
						className="font-black uppercase tracking-tighter leading-none"
						style={{ fontSize: 40, color: ON_SURFACE }}
					>
						Everything
						<br />
						<span style={{ color: OUTLINE }}>you need.</span>
					</h2>
				</div>

				<div className="flex-1 flex flex-col gap-3.5 justify-center">
					{features.map((f, i) => (
						<FadeIn key={i} delay={f.delay} direction="left">
							<div
								className="flex items-start gap-4 p-4 rounded-[1.75rem]"
								style={{
									background: `${ON_SURFACE}05`,
									border: `1px solid ${OUTLINE_VARIANT}30`,
								}}
							>
								<div
									className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
									style={{
										background: `${f.accent}15`,
										border: `1px solid ${f.accent}25`,
									}}
								>
									<f.icon size={20} style={{ color: f.accent }} />
								</div>
								<div className="flex-1">
									<p
										className="font-black tracking-tight"
										style={{ fontSize: 15, color: ON_SURFACE, marginBottom: 2 }}
									>
										{f.title}
									</p>
									<p style={{ fontSize: 11, color: OUTLINE, lineHeight: 1.5 }}>
										{f.desc}
									</p>
								</div>
							</div>
						</FadeIn>
					))}
				</div>
			</div>
		</AbsoluteFill>
	);
};

/* ─── Scene 4: OCR Capture Demo (420-690 frames, 9s) ─── */
const SceneCapture: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Phase 1: Camera viewfinder (0-60)
	// Phase 2: Processing overlay (60-140)
	// Phase 3: Extraction result (140-270)

	const scanProgress = interpolate(frame, [60, 130], [0, 100], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const resultOpacity = interpolate(frame, [145, 160], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const scanLineY = interpolate(frame, [65, 125], [0, 100], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const cardScale = spring({
		frame: Math.max(0, frame - 5),
		fps,
		config: { stiffness: 100, damping: 20 },
	});

	return (
		<AbsoluteFill
			style={{ background: SURFACE, fontFamily: "Inter, system-ui, sans-serif" }}
			className="flex flex-col items-center justify-center overflow-hidden"
		>
			<DotGrid />
			<GlowOrb color={PRIMARY} size={300} top="-80px" right="-60px" opacity={0.06} />

			{/* Section label */}
			<FadeIn delay={0}>
				<p
					className="font-black uppercase text-center mb-6"
					style={{ fontSize: 10, color: `${PRIMARY}99`, letterSpacing: "0.5em" }}
				>
					Feature 01: AI Receipt Capture
				</p>
			</FadeIn>

			{/* Capture Card */}
			<div
				className="w-full mx-10 rounded-[2.5rem] overflow-hidden"
				style={{
					maxWidth: 440,
					background: INVERSE_SURFACE,
					transform: `scale(${cardScale})`,
					boxShadow: `0 30px 80px rgba(0,0,0,0.25)`,
				}}
			>
				{/* Viewfinder header */}
				<div className="flex justify-between items-center px-7 py-5">
					<div className="flex items-center gap-3">
						<div
							className="w-10 h-10 rounded-xl flex items-center justify-center"
							style={{ background: "rgba(255,255,255,0.08)" }}
						>
							<Camera size={20} color="#fff" />
						</div>
						<div>
							<p className="font-black text-white" style={{ fontSize: 14 }}>
								{frame < 60 ? "Viewfinder Active" : frame < 140 ? "Extracting Data..." : "Extraction Complete"}
							</p>
							<p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>
								AI Architect Engine v3
							</p>
						</div>
					</div>
					{frame >= 140 && (
						<div
							className="w-8 h-8 rounded-lg flex items-center justify-center"
							style={{ background: SECONDARY }}
						>
							<Check size={16} color="#fff" />
						</div>
					)}
				</div>

				{/* Receipt simulation area */}
				<div
					className="mx-5 mb-5 rounded-3xl overflow-hidden relative"
					style={{
						background: "rgba(255,255,255,0.04)",
						border: "1px solid rgba(255,255,255,0.08)",
						height: 280,
					}}
				>
					{/* Static receipt content */}
					<FadeIn delay={8}>
						<div className="p-6 space-y-3">
							<div className="flex justify-between items-center">
								<span className="font-black text-white/60" style={{ fontSize: 11 }}>
									SHOPRITE IKEJA
								</span>
								<span className="text-white/30" style={{ fontSize: 9 }}>
									APR 07 2026
								</span>
							</div>
							<div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
							{[
								{ item: "Premium Rice 5kg", price: "₦8,200" },
								{ item: "Vegetable Oil 3L", price: "₦4,750" },
								{ item: "Chicken Wings 1kg", price: "₦2,500" },
							].map((line, i) => (
								<div key={i} className="flex justify-between items-center py-1">
									<span className="text-white/40" style={{ fontSize: 11 }}>
										{line.item}
									</span>
									<span className="font-bold text-white/50" style={{ fontSize: 11 }}>
										{line.price}
									</span>
								</div>
							))}
							<div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
							<div className="flex justify-between items-center">
								<span className="font-black uppercase text-white/60" style={{ fontSize: 10, letterSpacing: "0.3em" }}>
									Total
								</span>
								<span className="font-black text-white tracking-tight" style={{ fontSize: 22 }}>
									₦15,450
								</span>
							</div>
						</div>
					</FadeIn>

					{/* Scan line sweep */}
					{frame >= 65 && frame < 130 && (
						<div
							className="absolute left-0 right-0 h-0.5 pointer-events-none"
							style={{
								top: `${scanLineY}%`,
								background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
								boxShadow: `0 0 12px ${PRIMARY}`,
							}}
						/>
					)}
				</div>

				{/* Progress / Result */}
				<div className="px-7 pb-6">
					{frame < 140 ? (
						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<span
									className="font-black uppercase text-white/40"
									style={{ fontSize: 9, letterSpacing: "0.3em" }}
								>
									{scanProgress < 40 ? "Analyzing Pixel Grid" : scanProgress < 80 ? "Deconstructing Metadata" : "Finalizing Sums"}
								</span>
								<span className="font-black text-white" style={{ fontSize: 14 }}>
									{Math.round(scanProgress)}%
								</span>
							</div>
							<div
								className="h-1.5 rounded-full overflow-hidden"
								style={{ background: "rgba(255,255,255,0.06)" }}
							>
								<div
									className="h-full rounded-full"
									style={{
										width: `${scanProgress}%`,
										background: PRIMARY,
										transition: "width 0.1s linear",
									}}
								/>
							</div>
						</div>
					) : (
						<div style={{ opacity: resultOpacity }} className="space-y-4">
							<div className="grid grid-cols-3 gap-3">
								{[
									{ label: "Vendor", value: "Shoprite" },
									{ label: "Category", value: "Groceries" },
									{ label: "Amount", value: "₦15,450" },
								].map((detail, i) => (
									<div
										key={i}
										className="p-3 rounded-2xl text-center"
										style={{
											background: "rgba(255,255,255,0.04)",
											border: "1px solid rgba(255,255,255,0.06)",
										}}
									>
										<p
											className="font-black uppercase text-white/30"
											style={{ fontSize: 7, letterSpacing: "0.2em", marginBottom: 3 }}
										>
											{detail.label}
										</p>
										<p className="font-black text-white" style={{ fontSize: 12 }}>
											{detail.value}
										</p>
									</div>
								))}
							</div>

							<div
								className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black uppercase"
								style={{
									fontSize: 10,
									letterSpacing: "0.15em",
									background: SECONDARY,
									color: "#fff",
									boxShadow: `0 8px 24px ${SECONDARY}44`,
								}}
							>
								<Check size={14} />
								Archived to Ledger
							</div>
						</div>
					)}
				</div>
			</div>
		</AbsoluteFill>
	);
};

/* ─── Scene 5: Dashboard + Insights (690-960 frames, 9s) ─── */
const SceneDashboard: React.FC = () => {
	const frame = useCurrentFrame();

	// Counting up stats
	const balance = interpolate(frame, [20, 80], [0, 329800], {
		extrapolateRight: "clamp",
	});
	const inflow = interpolate(frame, [25, 75], [0, 350000], {
		extrapolateRight: "clamp",
	});
	const outflow = interpolate(frame, [30, 80], [0, 20200], {
		extrapolateRight: "clamp",
	});

	// Bar chart animation
	const chartBars = [
		{ day: "MON", inc: 65, exp: 40 },
		{ day: "TUE", inc: 85, exp: 20 },
		{ day: "WED", inc: 45, exp: 60 },
		{ day: "THU", inc: 95, exp: 30 },
		{ day: "FRI", inc: 55, exp: 80 },
	];

	return (
		<AbsoluteFill
			style={{ background: SURFACE, fontFamily: "Inter, system-ui, sans-serif" }}
			className="flex flex-col overflow-hidden"
		>
			<DotGrid />
			<GlowOrb color={PRIMARY} size={350} top="-100px" left="-80px" opacity={0.05} />

			<div className="flex-1 flex flex-col px-8 py-12">
				{/* Header */}
				<FadeIn delay={0}>
					<div className="mb-6">
						<p
							className="font-black uppercase mb-2"
							style={{ fontSize: 10, color: PRIMARY, letterSpacing: "0.5em" }}
						>
							Ledger Archive
						</p>
						<h2
							className="font-black tracking-tighter leading-none"
							style={{ fontSize: 36, color: ON_SURFACE }}
						>
							Snapshot <span style={{ color: PRIMARY }}>Overview</span>
						</h2>
					</div>
				</FadeIn>

				{/* Net Balance — Hero Card */}
				<FadeIn delay={8} scale>
					<div
						className="p-7 rounded-[2.5rem] mb-5 relative overflow-hidden"
						style={{
							background: ON_SURFACE,
							boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
						}}
					>
						<GlowOrb color={PRIMARY} size={200} top="-60px" right="-40px" opacity={0.15} />
						<div className="relative z-10">
							<div className="flex items-center gap-2 mb-3">
								<div
									className="w-2 h-2 rounded-full"
									style={{
										background: SECONDARY_CONTAINER,
										boxShadow: `0 0 8px ${SECONDARY_CONTAINER}`,
									}}
								/>
								<span
									className="font-black uppercase text-white/50"
									style={{ fontSize: 9, letterSpacing: "0.4em" }}
								>
									Verified Net Capital
								</span>
							</div>
							<div className="flex items-baseline gap-2">
								<span className="text-white/30 font-black" style={{ fontSize: 24 }}>
									₦
								</span>
								<span className="font-black text-white tracking-tighter" style={{ fontSize: 48 }}>
									{Math.round(balance).toLocaleString()}
								</span>
							</div>

							<div className="flex gap-3 mt-5">
								<div
									className="px-4 py-2.5 rounded-xl"
									style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
								>
									<p className="font-black uppercase text-white/40" style={{ fontSize: 8, letterSpacing: "0.2em" }}>
										Sync
									</p>
									<p className="font-bold text-white" style={{ fontSize: 12 }}>
										99.8%
									</p>
								</div>
								<div
									className="px-4 py-2.5 rounded-xl"
									style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
								>
									<p className="font-black uppercase text-white/40" style={{ fontSize: 8, letterSpacing: "0.2em" }}>
										Directives
									</p>
									<p className="font-bold text-white" style={{ fontSize: 12 }}>
										2 Pending
									</p>
								</div>
							</div>
						</div>
					</div>
				</FadeIn>

				{/* Inflow / Outflow */}
				<div className="grid grid-cols-2 gap-3 mb-5">
					<FadeIn delay={20} scale>
						<div
							className="p-5 rounded-[2rem]"
							style={{
								background: "#fff",
								border: `1px solid ${OUTLINE_VARIANT}20`,
								boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
							}}
						>
							<span
								className="font-black uppercase"
								style={{ fontSize: 9, color: SECONDARY, letterSpacing: "0.3em" }}
							>
								Inflow
							</span>
							<p className="font-black tracking-tighter mt-2" style={{ fontSize: 22, color: ON_SURFACE }}>
								₦{Math.round(inflow).toLocaleString()}
							</p>
							<div className="flex justify-end mt-3">
								<div
									className="w-9 h-9 rounded-xl flex items-center justify-center"
									style={{ background: `${SECONDARY}12` }}
								>
									<ArrowDownRight size={16} style={{ color: SECONDARY }} />
								</div>
							</div>
						</div>
					</FadeIn>

					<FadeIn delay={28} scale>
						<div
							className="p-5 rounded-[2rem]"
							style={{
								background: "#fff",
								border: `1px solid ${OUTLINE_VARIANT}20`,
								boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
							}}
						>
							<span
								className="font-black uppercase"
								style={{ fontSize: 9, color: ERROR, letterSpacing: "0.3em" }}
							>
								Outflow
							</span>
							<p className="font-black tracking-tighter mt-2" style={{ fontSize: 22, color: ON_SURFACE }}>
								₦{Math.round(outflow).toLocaleString()}
							</p>
							<div className="flex justify-end mt-3">
								<div
									className="w-9 h-9 rounded-xl flex items-center justify-center"
									style={{ background: `${ERROR}12` }}
								>
									<ArrowUpRight size={16} style={{ color: ERROR }} />
								</div>
							</div>
						</div>
					</FadeIn>
				</div>

				{/* Transaction List */}
				<FadeIn delay={40}>
					<div
						className="rounded-[2rem] overflow-hidden mb-5"
						style={{
							background: "#fff",
							border: `1px solid ${OUTLINE_VARIANT}20`,
							boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
						}}
					>
						<div
							className="px-5 py-3.5 flex justify-between items-center"
							style={{ borderBottom: `1px solid ${OUTLINE_VARIANT}20` }}
						>
							<p className="font-black uppercase" style={{ fontSize: 10, color: OUTLINE, letterSpacing: "0.3em" }}>
								Recent Archive
							</p>
							<ChevronRight size={14} style={{ color: PRIMARY }} />
						</div>
						{[
							{ name: "Shoprite Ikeja", cat: "Groceries", amount: "-₦15,450", icon: "🛒", positive: false },
							{ name: "Client: Project Omega", cat: "Invoice", amount: "+₦350,000", icon: "💳", positive: true },
							{ name: "Cafe Neo V.I.", cat: "Lifestyle", amount: "-₦4,750", icon: "☕", positive: false },
						].map((tx, i) => (
							<div
								key={i}
								className="px-5 py-4 flex justify-between items-center"
								style={{ borderBottom: `1px solid ${OUTLINE_VARIANT}12` }}
							>
								<div className="flex items-center gap-3">
									<div
										className="w-10 h-10 rounded-xl flex items-center justify-center"
										style={{
											background: tx.positive ? `${SECONDARY}10` : `${OUTLINE_VARIANT}20`,
										}}
									>
										<span style={{ fontSize: 18 }}>{tx.icon}</span>
									</div>
									<div>
										<p className="font-black tracking-tight" style={{ fontSize: 13, color: ON_SURFACE }}>
											{tx.name}
										</p>
										<p className="font-black uppercase" style={{ fontSize: 8, color: OUTLINE, letterSpacing: "0.2em" }}>
											{tx.cat}
										</p>
									</div>
								</div>
								<span
									className="font-black tracking-tight"
									style={{ fontSize: 14, color: tx.positive ? SECONDARY : ON_SURFACE }}
								>
									{tx.amount}
								</span>
							</div>
						))}
					</div>
				</FadeIn>

				{/* Mini Chart */}
				<FadeIn delay={55}>
					<div
						className="rounded-[2rem] p-5"
						style={{
							background: "#fff",
							border: `1px solid ${OUTLINE_VARIANT}20`,
							boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
						}}
					>
						<div className="flex items-center justify-between mb-4">
							<span className="font-black uppercase" style={{ fontSize: 9, color: PRIMARY, letterSpacing: "0.4em" }}>
								Flow Trajectory
							</span>
							<div className="flex gap-3">
								<div className="flex items-center gap-1.5">
									<div className="w-2 h-2 rounded-full" style={{ background: PRIMARY }} />
									<span style={{ fontSize: 8, color: OUTLINE }}>In</span>
								</div>
								<div className="flex items-center gap-1.5">
									<div className="w-2 h-2 rounded-full" style={{ background: ERROR }} />
									<span style={{ fontSize: 8, color: OUTLINE }}>Out</span>
								</div>
							</div>
						</div>
						<div className="flex items-end gap-3 h-20">
							{chartBars.map((bar, i) => {
								const barGrow = interpolate(frame, [60 + i * 6, 90 + i * 6], [0, 1], {
									extrapolateLeft: "clamp",
									extrapolateRight: "clamp",
								});
								return (
									<div key={i} className="flex-1 flex items-end gap-1">
										<div
											className="flex-1 rounded-full"
											style={{
												height: `${bar.inc * barGrow}%`,
												background: i === 3 ? PRIMARY : `${PRIMARY}30`,
											}}
										/>
										<div
											className="flex-1 rounded-full"
											style={{
												height: `${bar.exp * barGrow}%`,
												background: i === 3 ? ERROR : `${ERROR}30`,
											}}
										/>
									</div>
								);
							})}
						</div>
						<div className="flex justify-between mt-2">
							{chartBars.map((bar, i) => (
								<span
									key={i}
									className="flex-1 text-center font-black uppercase"
									style={{ fontSize: 7, color: i === 3 ? PRIMARY : OUTLINE, letterSpacing: "0.2em" }}
								>
									{bar.day}
								</span>
							))}
						</div>
					</div>
				</FadeIn>
			</div>
		</AbsoluteFill>
	);
};

/* ─── Scene 6: Trust & Security (960-1110 frames, 5s) ─── */
const SceneTrust: React.FC = () => {
	const pillars = [
		{
			icon: Lock,
			title: "100% Local Processing",
			desc: "Your data never leaves your device. Zero external telemetry.",
		},
		{
			icon: ScanLine,
			title: "Tesseract AI Engine",
			desc: "Military-grade OCR with millisecond-grade precision.",
		},
		{
			icon: Fingerprint,
			title: "Secure Archival Protocol",
			desc: "Encrypted local persistence with full data sovereignty.",
		},
	];

	return (
		<AbsoluteFill
			style={{ background: SURFACE, fontFamily: "Inter, system-ui, sans-serif" }}
			className="flex flex-col items-center justify-center overflow-hidden"
		>
			<DotGrid />
			<GlowOrb color={PRIMARY} size={300} bottom="-100px" left="-60px" opacity={0.04} />

			<FadeIn delay={0}>
				<p
					className="font-black uppercase text-center mb-3"
					style={{ fontSize: 10, color: PRIMARY, letterSpacing: "0.5em" }}
				>
					Security Architecture
				</p>
			</FadeIn>

			<FadeIn delay={8}>
				<h2
					className="font-black tracking-tighter text-center mb-10 leading-none px-8"
					style={{ fontSize: 36, color: ON_SURFACE }}
				>
					Your finances.
					<br />
					<span style={{ color: OUTLINE }}>
						Your device.
						<br />
						Your rules.
					</span>
				</h2>
			</FadeIn>

			<div className="w-full px-10 space-y-4">
				{pillars.map((p, i) => (
					<FadeIn key={i} delay={18 + i * 16} direction="right">
						<div
							className="flex items-center gap-4 p-5 rounded-[2rem]"
							style={{
								background: "#fff",
								border: `1px solid ${OUTLINE_VARIANT}20`,
								boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
							}}
						>
							<div
								className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
								style={{ background: `${PRIMARY}10`, border: `1px solid ${PRIMARY}18` }}
							>
								<p.icon size={22} style={{ color: PRIMARY }} />
							</div>
							<div>
								<p className="font-black tracking-tight" style={{ fontSize: 14, color: ON_SURFACE, marginBottom: 2 }}>
									{p.title}
								</p>
								<p style={{ fontSize: 11, color: OUTLINE }}>{p.desc}</p>
							</div>
						</div>
					</FadeIn>
				))}
			</div>
		</AbsoluteFill>
	);
};

/* ─── Scene 7: CTA & Outro (1110-1350 frames, 8s) ─── */
const SceneCta: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const ctaScale = spring({
		frame: Math.max(0, frame - 45),
		fps,
		config: { stiffness: 80, damping: 14 },
	});

	const glowPulse = interpolate(Math.sin(frame / 14), [-1, 1], [0.04, 0.12]);

	return (
		<AbsoluteFill
			style={{ background: INVERSE_SURFACE, fontFamily: "Inter, system-ui, sans-serif" }}
			className="flex flex-col items-center justify-center overflow-hidden"
		>
			<DotGrid />

			<div
				className="absolute rounded-full pointer-events-none"
				style={{
					width: 500,
					height: 500,
					background: PRIMARY,
					filter: "blur(200px)",
					opacity: glowPulse,
				}}
			/>

			<div className="relative z-10 text-center px-10 space-y-8">
				<FadeIn delay={0}>
					<div
						className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto"
						style={{ background: PRIMARY, boxShadow: `0 16px 48px ${PRIMARY}55` }}
					>
						<Receipt size={36} color="#fff" />
					</div>
				</FadeIn>

				<FadeIn delay={10}>
					<h2
						className="font-black tracking-tighter leading-none"
						style={{ fontSize: 44, color: "#fff" }}
					>
						Stop losing
						<br />
						receipts.
						<br />
						<span style={{ color: SECONDARY_CONTAINER, fontStyle: "italic" }}>
							Start building
							<br />
							clarity.
						</span>
					</h2>
				</FadeIn>

				<FadeIn delay={25}>
					<p
						className="font-medium leading-relaxed"
						style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 320, margin: "0 auto" }}
					>
						Snap receipts. Get AI extraction. Track every naira of your business.
					</p>
				</FadeIn>

				<FadeIn delay={38} scale>
					<div
						className="inline-flex items-center gap-3 px-10 py-5 rounded-[1.5rem] font-black uppercase"
						style={{
							fontSize: 11,
							letterSpacing: "0.2em",
							background: PRIMARY,
							color: "#fff",
							boxShadow: `0 16px 48px ${PRIMARY}55`,
							transform: `scale(${ctaScale})`,
						}}
					>
						Try LedgerSnap Free
						<ArrowRight size={16} />
					</div>
				</FadeIn>

				<FadeIn delay={50}>
					<div className="flex flex-col items-center gap-3 pt-4">
						<LedgerSnapWordmark size={30} dark />
						<p
							className="font-bold uppercase"
							style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em" }}
						>
							The Smart Financial Ledger
						</p>
					</div>
				</FadeIn>
			</div>
		</AbsoluteFill>
	);
};

/* ─── Main Composition ─── */
export const LedgerSnapReel: React.FC = () => {
	return (
		<AbsoluteFill style={{ background: SURFACE, fontFamily: "Inter, system-ui, sans-serif" }}>
			{/* ─── Audio Layer ─── */}
			<Audio src={staticFile("drone.mp3")} volume={0.35} />
			<Sequence from={0} durationInFrames={10} name="Tick-Hook">
				<Audio src={staticFile("tick.mp3")} volume={0.6} />
			</Sequence>
			<Sequence from={88} durationInFrames={10} name="Whoosh-Brand">
				<Audio src={staticFile("whoosh.mp3")} volume={0.5} />
			</Sequence>
			<Sequence from={178} durationInFrames={10} name="Tick-Features">
				<Audio src={staticFile("tick.mp3")} volume={0.5} />
			</Sequence>
			<Sequence from={418} durationInFrames={10} name="Whoosh-Capture">
				<Audio src={staticFile("whoosh.mp3")} volume={0.4} />
			</Sequence>
			<Sequence from={560} durationInFrames={10} name="Chime-Archive">
				<Audio src={staticFile("chime.mp3")} volume={0.55} />
			</Sequence>
			<Sequence from={688} durationInFrames={10} name="Tick-Dashboard">
				<Audio src={staticFile("tick.mp3")} volume={0.5} />
			</Sequence>
			<Sequence from={958} durationInFrames={10} name="Whoosh-Trust">
				<Audio src={staticFile("whoosh.mp3")} volume={0.4} />
			</Sequence>
			<Sequence from={1108} durationInFrames={10} name="Chime-CTA">
				<Audio src={staticFile("chime.mp3")} volume={0.55} />
			</Sequence>

			{/* ─── Visual Scenes ─── */}
			{/* Scene 1 → Pain Point Hook: 0-90 (3s) */}
			<Sequence durationInFrames={90} name="Pain-Hook">
				<ScenePain />
			</Sequence>

			{/* Scene 2 → Brand Reveal: 90-180 (3s) */}
			<Sequence from={90} durationInFrames={90} name="Brand">
				<SceneBrand />
			</Sequence>

			{/* Scene 3 → Features: 180-420 (8s) */}
			<Sequence from={180} durationInFrames={240} name="Features">
				<SceneFeatures />
			</Sequence>

			{/* Scene 4 → AI Capture: 420-690 (9s) */}
			<Sequence from={420} durationInFrames={270} name="Capture">
				<SceneCapture />
			</Sequence>

			{/* Scene 5 → Dashboard + Insights: 690-960 (9s) */}
			<Sequence from={690} durationInFrames={270} name="Dashboard">
				<SceneDashboard />
			</Sequence>

			{/* Scene 6 → Trust: 960-1110 (5s) */}
			<Sequence from={960} durationInFrames={150} name="Trust">
				<SceneTrust />
			</Sequence>

			{/* Scene 7 → CTA: 1110-1350 (8s) */}
			<Sequence from={1110} durationInFrames={240} name="CTA">
				<SceneCta />
			</Sequence>
		</AbsoluteFill>
	);
};
