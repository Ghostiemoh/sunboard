import React from "react";
import {
	AbsoluteFill,
	Img,
	interpolate,
	Sequence,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import {
	Activity,
	ArrowRight,
	ArrowUpRight,
	Check,
	CreditCard,
	Cpu,
	FileText,
	Globe,
	LayoutGrid,
	Send,
	Shield,
	ShieldCheck,
	TrendingUp,
	User,
	Wallet,
	Zap,
} from "lucide-react";

/* ─── Design Tokens ─── */
const EMERALD = "#00C853";
const VOID = "#0A0A0A";
const SURFACE = "#111111";
const BORDER = "rgba(255,255,255,0.06)";
const MUTED = "rgba(255,255,255,0.4)";

/* ─── Shared Primitives ─── */

const GridBg: React.FC = () => (
	<div
		className="absolute inset-0 pointer-events-none"
		style={{
			backgroundImage:
				"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
			backgroundSize: "28px 28px",
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
}> = ({ color, size, top, left, right, bottom, opacity = 0.15 }) => (
	<div
		className="absolute rounded-full pointer-events-none"
		style={{
			width: size,
			height: size,
			background: color,
			filter: `blur(${size * 0.6}px)`,
			opacity,
			top,
			left,
			right,
			bottom,
		}}
	/>
);

const VertexWordmark: React.FC<{ size?: number; className?: string }> = ({
	size = 42,
	className = "",
}) => (
	<span
		className={`font-black tracking-tighter uppercase ${className}`}
		style={{ fontSize: size, lineHeight: 1, color: "#fff" }}
	>
		VER<span style={{ color: EMERALD, fontStyle: "italic" }}>TEX</span>
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

	const opacity = interpolate(f, [0, 15], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const dirMap = {
		up: { x: 0, y: 30 },
		down: { x: 0, y: -30 },
		left: { x: 30, y: 0 },
		right: { x: -30, y: 0 },
	};

	const translateX = interpolate(f, [0, 18], [dirMap[direction].x, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const translateY = interpolate(f, [0, 18], [dirMap[direction].y, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const s = scale
		? spring({ frame: Math.max(0, f), fps, config: { stiffness: 120, damping: 18 } })
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

/* ─── Scene 1: Opening Hook (0-90 frames, 3s) ─── */
const SceneHook: React.FC = () => {
	const frame = useCurrentFrame();

	const line1Opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
	const line2Opacity = interpolate(frame, [15, 27], [0, 1], { extrapolateRight: "clamp" });
	const line3Opacity = interpolate(frame, [30, 42], [0, 1], { extrapolateRight: "clamp" });

	const flashOpacity = interpolate(frame, [55, 60, 65, 70], [0, 0.15, 0.15, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill
			style={{ background: VOID }}
			className="flex flex-col items-center justify-center overflow-hidden"
		>
			<GridBg />
			<GlowOrb color={EMERALD} size={400} top="-100px" right="-100px" opacity={0.08} />

			{/* Flash */}
			<div
				className="absolute inset-0"
				style={{ background: EMERALD, opacity: flashOpacity }}
			/>

			<div className="relative z-10 text-center px-12 space-y-6">
				<div style={{ opacity: line1Opacity }}>
					<p
						className="font-black uppercase tracking-[0.5em]"
						style={{ fontSize: 13, color: EMERALD, letterSpacing: "0.5em" }}
					>
						Stop chasing payments
					</p>
				</div>

				<div style={{ opacity: line2Opacity }}>
					<h1
						className="font-black uppercase tracking-tighter leading-none"
						style={{ fontSize: 72, color: "#fff" }}
					>
						CRYPTO
						<br />
						INVOICING
					</h1>
				</div>

				<div style={{ opacity: line3Opacity }}>
					<p
						className="font-black uppercase italic tracking-tighter"
						style={{ fontSize: 56, color: `${EMERALD}` }}
					>
						FOR CLIENT WORK.
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

	const taglineOpacity = interpolate(frame, [25, 40], [0, 1], {
		extrapolateRight: "clamp",
	});

	const pulseSize = interpolate(Math.sin(frame / 8), [-1, 1], [280, 340]);
	const pulseOpacity = interpolate(Math.sin(frame / 8), [-1, 1], [0.04, 0.12]);

	return (
		<AbsoluteFill
			style={{ background: VOID }}
			className="flex flex-col items-center justify-center overflow-hidden"
		>
			<GridBg />

			{/* Pulsing ring */}
			<div
				className="absolute rounded-full border-2 pointer-events-none"
				style={{
					width: pulseSize,
					height: pulseSize,
					borderColor: EMERALD,
					opacity: pulseOpacity,
				}}
			/>

			<div
				className="flex flex-col items-center gap-8"
				style={{ transform: `scale(${logoScale})` }}
			>
				<Img
					src={staticFile("logo.png")}
					className="object-contain"
					style={{ width: 200, height: 200 }}
				/>
				<VertexWordmark size={56} />
			</div>

			<div style={{ opacity: taglineOpacity }} className="mt-6">
				<p
					className="font-black uppercase tracking-[0.3em] text-center"
					style={{ fontSize: 14, color: EMERALD }}
				>
					The Point of Finality
				</p>
			</div>
		</AbsoluteFill>
	);
};

/* ─── Scene 3: Feature Cards (180-390 frames, 7s) ─── */
const SceneFeatures: React.FC = () => {
	const frame = useCurrentFrame();

	const features = [
		{
			icon: FileText,
			title: "Create Invoice",
			desc: "Payment-ready PDF with wallet address and shareable link.",
			delay: 0,
		},
		{
			icon: LayoutGrid,
			title: "Draft Agreement",
			desc: "Clean service agreements you can review before sending.",
			delay: 25,
		},
		{
			icon: CreditCard,
			title: "Track Payments",
			desc: "See what's paid, pending, and outstanding — all in one view.",
			delay: 50,
		},
		{
			icon: Globe,
			title: "Manage Clients",
			desc: "Store billing contacts and reuse them across invoices.",
			delay: 75,
		},
		{
			icon: ArrowUpRight,
			title: "Payment Links",
			desc: "Direct payment links — no full invoice required.",
			delay: 100,
		},
	];

	const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill
			style={{ background: VOID }}
			className="flex flex-col overflow-hidden"
		>
			<GridBg />
			<GlowOrb color={EMERALD} size={500} bottom="-200px" left="-100px" opacity={0.06} />

			<div className="flex-1 flex flex-col px-10 py-16">
				<div style={{ opacity: headerOpacity }} className="mb-10">
					<p
						className="font-black uppercase tracking-[0.4em]"
						style={{ fontSize: 11, color: EMERALD, marginBottom: 8 }}
					>
						What You Can Do
					</p>
					<h2
						className="font-black uppercase tracking-tighter leading-none"
						style={{ fontSize: 42, color: "#fff" }}
					>
						Everything
						<br />
						you need.
					</h2>
				</div>

				<div className="flex-1 flex flex-col gap-4 justify-center">
					{features.map((f, i) => (
						<FadeIn key={i} delay={f.delay} direction="left">
							<div
								className="flex items-start gap-5 p-5 rounded-3xl border"
								style={{
									background: "rgba(255,255,255,0.03)",
									borderColor: BORDER,
								}}
							>
								<div
									className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border"
									style={{
										background: i === 0 ? `${EMERALD}22` : "rgba(255,255,255,0.04)",
										borderColor: i === 0 ? `${EMERALD}33` : BORDER,
									}}
								>
									<f.icon
										size={22}
										style={{ color: i === 0 ? EMERALD : MUTED }}
									/>
								</div>
								<div className="flex-1">
									<p
										className="font-black uppercase tracking-tight"
										style={{
											fontSize: 16,
											color: "#fff",
											marginBottom: 3,
										}}
									>
										{f.title}
									</p>
									<p style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>
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

/* ─── Scene 4: Invoice Builder UI (390-630 frames, 8s) ─── */
const SceneInvoice: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Typewriter for amount
	const amountStr = "2,500.00";
	const amountProgress = interpolate(frame, [40, 80], [0, amountStr.length], {
		extrapolateRight: "clamp",
	});
	const displayAmount = amountStr.slice(0, Math.floor(amountProgress));

	// Cursor blink
	const cursorVisible = frame < 85 && frame % 16 < 8;

	// Sign button state
	const signPhase = frame > 130 ? (frame > 155 ? "done" : "signing") : "ready";

	const cardScale = spring({
		frame: Math.max(0, frame - 5),
		fps,
		config: { stiffness: 100, damping: 20 },
	});

	return (
		<AbsoluteFill
			style={{ background: VOID }}
			className="flex flex-col items-center justify-center overflow-hidden"
		>
			<GridBg />
			<GlowOrb color={EMERALD} size={350} top="-80px" left="-80px" opacity={0.08} />

			{/* Section label */}
			<FadeIn delay={0}>
				<p
					className="font-black uppercase tracking-[0.5em] text-center mb-8"
					style={{ fontSize: 11, color: `${EMERALD}99` }}
				>
					Feature 01: Precision Billing
				</p>
			</FadeIn>

			{/* Invoice Card */}
			<div
				className="w-full mx-10 rounded-[36px] border overflow-hidden"
				style={{
					maxWidth: 460,
					background: `${SURFACE}dd`,
					borderColor: BORDER,
					transform: `scale(${cardScale})`,
					boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px -12px rgba(0,0,0,0.6)`,
				}}
			>
				{/* Card Header */}
				<div
					className="flex justify-between items-center px-8 py-6 border-b"
					style={{ borderColor: BORDER }}
				>
					<div className="flex items-center gap-4">
						<div
							className="w-11 h-11 rounded-xl flex items-center justify-center"
							style={{ background: `${EMERALD}22` }}
						>
							<FileText size={20} style={{ color: EMERALD }} />
						</div>
						<div>
							<p
								className="font-black uppercase tracking-tight"
								style={{ fontSize: 16, color: "#fff" }}
							>
								Create Invoice
							</p>
							<p style={{ fontSize: 10, color: MUTED }}>Vertex Invoicing</p>
						</div>
					</div>
					<p
						className="font-black uppercase tracking-widest"
						style={{ fontSize: 9, color: `${EMERALD}66` }}
					>
						INV-2026-4210
					</p>
				</div>

				{/* Card Body */}
				<div className="px-8 py-6 space-y-6">
					{/* Recipient */}
					<FadeIn delay={15}>
						<div>
							<p
								className="font-black uppercase tracking-widest mb-2"
								style={{ fontSize: 9, color: MUTED }}
							>
								Bill To
							</p>
							<div
								className="flex items-center gap-3 p-4 rounded-xl border"
								style={{
									background: "rgba(255,255,255,0.03)",
									borderColor: BORDER,
								}}
							>
								<div
									className="w-8 h-8 rounded-lg flex items-center justify-center"
									style={{ background: "rgba(255,255,255,0.05)" }}
								>
									<User size={14} style={{ color: MUTED }} />
								</div>
								<span
									className="font-bold"
									style={{ fontSize: 14, color: "#fff" }}
								>
									Ghostie Studio Inc.
								</span>
							</div>
						</div>
					</FadeIn>

					{/* Amount */}
					<FadeIn delay={30}>
						<div>
							<p
								className="font-black uppercase tracking-widest mb-2"
								style={{ fontSize: 9, color: MUTED }}
							>
								Amount (USDC)
							</p>
							<div
								className="p-5 rounded-2xl border"
								style={{
									background: "rgba(255,255,255,0.03)",
									borderColor: BORDER,
								}}
							>
								<span
									className="font-black tracking-tighter"
									style={{ fontSize: 38, color: "#fff" }}
								>
									${displayAmount}
									{cursorVisible && (
										<span
											className="inline-block ml-1 align-middle"
											style={{
												width: 3,
												height: 32,
												background: EMERALD,
											}}
										/>
									)}
								</span>
							</div>
						</div>
					</FadeIn>

					{/* Line items hint */}
					<FadeIn delay={55}>
						<div className="space-y-2">
							{[
								{ desc: "Brand Identity Package", amount: "1,800.00" },
								{ desc: "Motion Design (3 assets)", amount: "700.00" },
							].map((item, i) => (
								<div
									key={i}
									className="flex justify-between items-center px-4 py-3 rounded-xl border"
									style={{
										background: "rgba(255,255,255,0.02)",
										borderColor: BORDER,
									}}
								>
									<span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
										{item.desc}
									</span>
									<span
										className="font-bold tracking-tight"
										style={{ fontSize: 12, color: "#fff" }}
									>
										{item.amount}
									</span>
								</div>
							))}
						</div>
					</FadeIn>

					{/* Token selector + Sign button */}
					<FadeIn delay={80}>
						<div className="flex gap-3">
							{/* Token pills */}
							<div
								className="flex gap-1 p-1 rounded-xl border"
								style={{
									background: "rgba(255,255,255,0.03)",
									borderColor: BORDER,
								}}
							>
								{["SOL", "USDC", "USDT"].map((t) => (
									<div
										key={t}
										className="px-3 py-2 rounded-lg font-black uppercase"
										style={{
											fontSize: 9,
											letterSpacing: "0.1em",
											background:
												t === "USDC" ? EMERALD : "transparent",
											color: t === "USDC" ? "#000" : MUTED,
										}}
									>
										{t}
									</div>
								))}
							</div>

							{/* Sign button */}
							<div
								className="flex-1 flex items-center justify-center gap-2 rounded-xl font-black uppercase"
								style={{
									fontSize: 10,
									letterSpacing: "0.15em",
									padding: "12px 16px",
									background:
										signPhase === "done"
											? "#10b981"
											: EMERALD,
									color: "#000",
									boxShadow:
										signPhase === "done"
											? "0 0 30px rgba(16,185,129,0.3)"
											: `0 8px 24px ${EMERALD}33`,
								}}
							>
								{signPhase === "done" ? (
									<>
										<Check size={14} />
										Sent
									</>
								) : signPhase === "signing" ? (
									"Signing..."
								) : (
									<>
										<Send size={14} />
										Sign & Send
									</>
								)}
							</div>
						</div>
					</FadeIn>
				</div>
			</div>
		</AbsoluteFill>
	);
};

/* ─── Scene 5: Dashboard + Pulse (630-870 frames, 8s) ─── */
const SceneDashboard: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Counting up stats
	const revenue = interpolate(frame, [20, 80], [0, 14200], {
		extrapolateRight: "clamp",
	});
	const clients = interpolate(frame, [30, 70], [0, 8], {
		extrapolateRight: "clamp",
	});
	const contracts = interpolate(frame, [40, 80], [0, 12], {
		extrapolateRight: "clamp",
	});

	// Pulse status
	const isOptimal = frame > 100;

	const pulseGlowOpacity = isOptimal
		? interpolate(Math.sin(frame / 10), [-1, 1], [0.05, 0.18])
		: 0;

	return (
		<AbsoluteFill
			style={{ background: VOID }}
			className="flex flex-col overflow-hidden"
		>
			<GridBg />
			<GlowOrb color={EMERALD} size={400} top="-100px" right="-100px" opacity={0.06} />

			<div className="flex-1 flex flex-col px-8 py-14">
				{/* Header */}
				<FadeIn delay={0}>
					<div className="mb-8">
						<div
							className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-4"
							style={{
								background: "rgba(255,255,255,0.03)",
								borderColor: BORDER,
							}}
						>
							<Zap size={10} style={{ color: EMERALD }} />
							<span
								className="font-black uppercase tracking-widest"
								style={{ fontSize: 8, color: EMERALD }}
							>
								Live Workspace
							</span>
						</div>
						<h2
							className="font-black uppercase tracking-tighter leading-none"
							style={{ fontSize: 38, color: "#fff" }}
						>
							PAYMENT{" "}
							<span style={{ color: EMERALD, fontStyle: "italic" }}>
								DASHBOARD
							</span>
						</h2>
					</div>
				</FadeIn>

				{/* Stat Cards */}
				<div className="grid grid-cols-2 gap-3 mb-6">
					{[
						{
							label: "Revenue Received",
							value: `$${Math.round(revenue).toLocaleString()}`,
							icon: TrendingUp,
							iconColor: "#10b981",
							delay: 10,
						},
						{
							label: "Active Clients",
							value: `${Math.round(clients)}`,
							icon: User,
							iconColor: "#a855f7",
							delay: 18,
						},
						{
							label: "Agreements",
							value: `${Math.round(contracts)}`,
							icon: LayoutGrid,
							iconColor: "#3b82f6",
							delay: 26,
						},
						{
							label: "Finality",
							value: "100%",
							icon: ShieldCheck,
							iconColor: EMERALD,
							delay: 34,
						},
					].map((stat, i) => (
						<FadeIn key={i} delay={stat.delay} scale>
							<div
								className="p-5 rounded-3xl border"
								style={{
									background: "rgba(255,255,255,0.025)",
									borderColor: BORDER,
									boxShadow:
										"0 0 0 1px rgba(255,255,255,0.03), 0 4px 16px rgba(0,0,0,0.3)",
								}}
							>
								<div
									className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
									style={{ background: "rgba(255,255,255,0.04)" }}
								>
									<stat.icon size={16} style={{ color: stat.iconColor }} />
								</div>
								<p
									className="font-black uppercase tracking-widest mb-1"
									style={{ fontSize: 8, color: MUTED }}
								>
									{stat.label}
								</p>
								<p
									className="font-black tracking-tighter"
									style={{ fontSize: 26, color: "#fff" }}
								>
									{stat.value}
								</p>
							</div>
						</FadeIn>
					))}
				</div>

				{/* Invoice list snippet */}
				<FadeIn delay={45}>
					<div
						className="rounded-3xl border overflow-hidden mb-6"
						style={{
							background: "rgba(255,255,255,0.02)",
							borderColor: BORDER,
						}}
					>
						<div
							className="px-5 py-4 border-b flex justify-between items-center"
							style={{ borderColor: BORDER }}
						>
							<p
								className="font-black uppercase tracking-tight"
								style={{ fontSize: 13, color: "#fff" }}
							>
								Recent Invoices
							</p>
							<ArrowRight size={14} style={{ color: EMERALD }} />
						</div>
						{[
							{ id: "INV-4210", amount: "2.5 SOL", status: "Paid" },
							{ id: "INV-4211", amount: "500 USDC", status: "Sent" },
							{ id: "INV-4212", amount: "1 SOL", status: "Pending" },
						].map((inv, i) => (
							<div
								key={i}
								className="px-5 py-4 flex justify-between items-center border-b"
								style={{ borderColor: BORDER }}
							>
								<div className="flex items-center gap-3">
									<div
										className="w-8 h-8 rounded-lg flex items-center justify-center"
										style={{
											background: "rgba(255,255,255,0.04)",
										}}
									>
										<FileText
											size={14}
											style={{ color: "rgba(255,255,255,0.2)" }}
										/>
									</div>
									<span
										className="font-bold"
										style={{ fontSize: 12, color: "#fff" }}
									>
										#{inv.id}
									</span>
								</div>
								<div className="flex items-center gap-3">
									<span
										className="font-bold tracking-tight"
										style={{ fontSize: 12, color: "#fff" }}
									>
										{inv.amount}
									</span>
									<span
										className="px-2 py-0.5 rounded-full font-black uppercase tracking-widest"
										style={{
											fontSize: 8,
											background:
												inv.status === "Paid"
													? EMERALD
													: "rgba(255,255,255,0.06)",
											color:
												inv.status === "Paid" ? "#000" : MUTED,
										}}
									>
										{inv.status}
									</span>
								</div>
							</div>
						))}
					</div>
				</FadeIn>

				{/* Surgical Pulse Widget */}
				<FadeIn delay={60}>
					<div
						className="rounded-3xl border p-6 relative overflow-hidden"
						style={{
							background: "rgba(255,255,255,0.02)",
							borderColor: BORDER,
							boxShadow:
								"0 0 0 1px rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.4)",
						}}
					>
						{/* Pulse glow */}
						<div
							className="absolute inset-0 pointer-events-none"
							style={{
								background: EMERALD,
								opacity: pulseGlowOpacity,
							}}
						/>

						<div className="relative z-10 flex justify-between items-start mb-4">
							<div>
								<p
									className="font-black uppercase tracking-[0.4em]"
									style={{ fontSize: 9, color: EMERALD }}
								>
									Market Snapshot
								</p>
								<p
									className="font-black uppercase italic tracking-tighter"
									style={{ fontSize: 28, color: "#fff" }}
								>
									Solana
								</p>
							</div>
							<div
								className="w-10 h-10 rounded-xl flex items-center justify-center border"
								style={{
									background: "rgba(255,255,255,0.04)",
									borderColor: BORDER,
								}}
							>
								<Activity size={18} style={{ color: EMERALD }} />
							</div>
						</div>

						<div className="relative z-10 grid grid-cols-2 gap-4 mb-4">
							<div>
								<div className="flex items-center gap-1.5 mb-1">
									<TrendingUp size={10} style={{ color: EMERALD }} />
									<span
										className="font-black uppercase tracking-widest"
										style={{ fontSize: 8, color: MUTED }}
									>
										SOL Price
									</span>
								</div>
								<p
									className="font-black tracking-tighter"
									style={{ fontSize: 22, color: "#fff" }}
								>
									{isOptimal ? "$142.21" : "---"}
								</p>
							</div>
							<div>
								<div className="flex items-center gap-1.5 mb-1">
									<Cpu size={10} style={{ color: EMERALD }} />
									<span
										className="font-black uppercase tracking-widest"
										style={{ fontSize: 8, color: MUTED }}
									>
										Slot
									</span>
								</div>
								<p
									className="font-black tracking-tighter"
									style={{ fontSize: 16, color: "#fff" }}
								>
									{isOptimal ? "592,104,221" : "---"}
								</p>
							</div>
						</div>

						<div
							className="relative z-10 flex items-center gap-3 pt-3 border-t"
							style={{ borderColor: BORDER }}
						>
							<div
								className="w-2 h-2 rounded-full"
								style={{
									background: isOptimal ? EMERALD : "rgba(255,255,255,0.2)",
									boxShadow: isOptimal
										? `0 0 8px ${EMERALD}`
										: "none",
								}}
							/>
							<span
								className="font-black uppercase tracking-[0.2em]"
								style={{
									fontSize: 9,
									color: "rgba(255,255,255,0.7)",
								}}
							>
								{isOptimal ? "Network: Mainnet" : "Syncing..."}
							</span>
							<span
								className="font-bold uppercase tracking-tighter ml-auto"
								style={{ fontSize: 9, color: MUTED }}
							>
								{isOptimal ? "388ms" : "---"}
							</span>
						</div>
					</div>
				</FadeIn>
			</div>
		</AbsoluteFill>
	);
};

/* ─── Scene 6: Trust Pillars (870-1020 frames, 5s) ─── */
const SceneTrust: React.FC = () => {
	const frame = useCurrentFrame();

	const pillars = [
		{
			icon: ShieldCheck,
			title: "Wallet-signed documents",
			desc: "Proof of authorship on every invoice.",
		},
		{
			icon: Wallet,
			title: "SOL · USDC · USDT",
			desc: "Request payment in any major Solana token.",
		},
		{
			icon: Shield,
			title: "On-chain finality",
			desc: "Instant, immutable settlement on the SVM.",
		},
	];

	return (
		<AbsoluteFill
			style={{ background: VOID }}
			className="flex flex-col items-center justify-center overflow-hidden"
		>
			<GridBg />
			<GlowOrb color="#3b82f6" size={300} bottom="-100px" right="-80px" opacity={0.06} />

			<FadeIn delay={0}>
				<p
					className="font-black uppercase tracking-[0.5em] text-center mb-4"
					style={{ fontSize: 11, color: EMERALD }}
				>
					Why Vertex
				</p>
			</FadeIn>

			<FadeIn delay={8}>
				<h2
					className="font-black uppercase tracking-tighter text-center mb-12 leading-none px-8"
					style={{ fontSize: 38, color: "#fff" }}
				>
					Clear payment
					<br />
					requests.
					<br />
					<span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>
						Clearer client
						<br />
						conversations.
					</span>
				</h2>
			</FadeIn>

			<div className="w-full px-10 space-y-4">
				{pillars.map((p, i) => (
					<FadeIn key={i} delay={20 + i * 18} direction="right">
						<div
							className="flex items-center gap-5 p-5 rounded-3xl border"
							style={{
								background: "rgba(255,255,255,0.025)",
								borderColor: BORDER,
							}}
						>
							<div
								className="w-12 h-12 rounded-2xl flex items-center justify-center border flex-shrink-0"
								style={{
									background: `${EMERALD}11`,
									borderColor: `${EMERALD}22`,
								}}
							>
								<p.icon size={22} style={{ color: EMERALD }} />
							</div>
							<div>
								<p
									className="font-black uppercase tracking-tight"
									style={{ fontSize: 14, color: "#fff", marginBottom: 2 }}
								>
									{p.title}
								</p>
								<p style={{ fontSize: 11, color: MUTED }}>{p.desc}</p>
							</div>
						</div>
					</FadeIn>
				))}
			</div>
		</AbsoluteFill>
	);
};

/* ─── Scene 7: CTA & Outro (1020-1200 frames, 6s) ─── */
const SceneCta: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const ctaScale = spring({
		frame: Math.max(0, frame - 40),
		fps,
		config: { stiffness: 80, damping: 14 },
	});

	const glowPulse = interpolate(Math.sin(frame / 12), [-1, 1], [0.06, 0.16]);

	return (
		<AbsoluteFill
			style={{ background: VOID }}
			className="flex flex-col items-center justify-center overflow-hidden"
		>
			<GridBg />

			{/* Big glow behind CTA */}
			<div
				className="absolute rounded-full pointer-events-none"
				style={{
					width: 500,
					height: 500,
					background: EMERALD,
					filter: "blur(200px)",
					opacity: glowPulse,
				}}
			/>

			<div className="relative z-10 text-center px-10 space-y-10">
				<FadeIn delay={0}>
					<ShieldCheck size={56} style={{ color: EMERALD, margin: "0 auto" }} />
				</FadeIn>

				<FadeIn delay={10}>
					<h2
						className="font-black uppercase tracking-tighter leading-none"
						style={{ fontSize: 46, color: "#fff" }}
					>
						Professional
						<br />
						payments.
						<br />
						<span style={{ color: EMERALD, fontStyle: "italic" }}>
							Institutional
							<br />
							trust.
						</span>
					</h2>
				</FadeIn>

				<FadeIn delay={25}>
					<p
						className="font-medium leading-relaxed"
						style={{ fontSize: 16, color: MUTED, maxWidth: 340, margin: "0 auto" }}
					>
						Create invoices, share payment links, and settle on-chain
						with absolute clarity.
					</p>
				</FadeIn>

				<FadeIn delay={35} scale>
					<div
						className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black uppercase tracking-widest"
						style={{
							fontSize: 12,
							background: EMERALD,
							color: "#000",
							boxShadow: `0 16px 48px ${EMERALD}44`,
							transform: `scale(${ctaScale})`,
						}}
					>
						Create Your First Invoice
						<ArrowRight size={16} />
					</div>
				</FadeIn>

				<FadeIn delay={50}>
					<div className="flex flex-col items-center gap-4 pt-4">
						<VertexWordmark size={32} />
						<p
							className="font-bold tracking-widest uppercase"
							style={{ fontSize: 9, color: MUTED }}
						>
							vertex.vercel.app
						</p>
					</div>
				</FadeIn>
			</div>
		</AbsoluteFill>
	);
};

/* ─── Main Composition ─── */
export const VertexReel: React.FC = () => {
	return (
		<AbsoluteFill style={{ background: VOID, fontFamily: "system-ui, sans-serif" }}>
			{/* Scene 1 → Hook: 0-90 (3s) */}
			<Sequence durationInFrames={90} name="Hook">
				<SceneHook />
			</Sequence>

			{/* Scene 2 → Brand: 90-180 (3s) */}
			<Sequence from={90} durationInFrames={90} name="Brand">
				<SceneBrand />
			</Sequence>

			{/* Scene 3 → Features: 180-390 (7s) */}
			<Sequence from={180} durationInFrames={210} name="Features">
				<SceneFeatures />
			</Sequence>

			{/* Scene 4 → Invoice: 390-630 (8s) */}
			<Sequence from={390} durationInFrames={240} name="Invoice">
				<SceneInvoice />
			</Sequence>

			{/* Scene 5 → Dashboard + Pulse: 630-870 (8s) */}
			<Sequence from={630} durationInFrames={240} name="Dashboard">
				<SceneDashboard />
			</Sequence>

			{/* Scene 6 → Trust Pillars: 870-1020 (5s) */}
			<Sequence from={870} durationInFrames={150} name="Trust">
				<SceneTrust />
			</Sequence>

			{/* Scene 7 → CTA: 1020-1200 (6s) */}
			<Sequence from={1020} durationInFrames={180} name="CTA">
				<SceneCta />
			</Sequence>
		</AbsoluteFill>
	);
};
