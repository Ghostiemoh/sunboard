import React from "react";
import {
	AbsoluteFill,
	Audio,
	Img,
	interpolate,
	Sequence,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

// ─── Brand ──────────────────────────────────────────────────────────────────
const C = {
	bg: "#080b14",
	cyan: "#22d3ee",
	violet: "#8b5cf6",
	emerald: "#10b981",
	red: "#ef4444",
	amber: "#f59e0b",
	text: "#f0f4ff",
	dim: "rgba(240,244,255,0.55)",
	faint: "rgba(240,244,255,0.2)",
	glass: "rgba(255,255,255,0.04)",
	border: "rgba(255,255,255,0.09)",
};

// ─── Helpers ────────────────────────────────────────────────────────────────
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const fadeIn = (frame: number, start: number, dur = 20) =>
	clamp(interpolate(frame, [start, start + dur], [0, 1]), 0, 1);

// ─── Shared Primitives ──────────────────────────────────────────────────────
const Orb: React.FC<{
	color: string;
	size?: number;
	opacity?: number;
	style?: React.CSSProperties;
}> = ({ color, size = 600, opacity = 0.25, style }) => (
	<div
		style={{
			position: "absolute",
			width: size,
			height: size,
			borderRadius: "50%",
			background: `radial-gradient(circle at 40% 40%, ${color}, transparent 70%)`,
			filter: "blur(80px)",
			opacity,
			pointerEvents: "none",
			...style,
		}}
	/>
);

const Glass: React.FC<{
	children: React.ReactNode;
	accent?: string;
	style?: React.CSSProperties;
}> = ({ children, accent = C.cyan, style }) => (
	<div
		style={{
			background: C.glass,
			border: `1px solid ${C.border}`,
			borderTop: `1px solid ${accent}28`,
			borderRadius: 28,
			padding: "44px 48px",
			backdropFilter: "blur(20px)",
			boxShadow: `0 8px 40px -8px rgba(0,0,0,0.6), 0 0 80px -20px ${accent}20`,
			...style,
		}}
	>
		{children}
	</div>
);

const Tag: React.FC<{
	label: string;
	color?: string;
	opacity?: number;
}> = ({ label, color = C.cyan, opacity = 1 }) => (
	<div
		style={{
			opacity,
			background: `${color}15`,
			border: `1px solid ${color}40`,
			borderRadius: 8,
			padding: "6px 14px",
			fontFamily: "monospace",
			fontSize: 16,
			color,
			fontWeight: 600,
			letterSpacing: "0.03em",
		}}
	>
		{label}
	</div>
);

const SceneLabel: React.FC<{
	n: string;
	label: string;
	color?: string;
	frame: number;
}> = ({ n, label, color = C.cyan, frame }) => (
	<div
		style={{
			position: "absolute",
			top: 56,
			left: 0,
			right: 0,
			textAlign: "center",
			opacity: fadeIn(frame, 0),
		}}
	>
		<p
			style={{
				fontFamily: "sans-serif",
				fontSize: 18,
				color,
				letterSpacing: "0.45em",
				textTransform: "uppercase",
				margin: 0,
				fontWeight: 700,
			}}
		>
			{n} / {label}
		</p>
	</div>
);

// Dip-to-black transitions between scenes
const getTransitionDark = (f: number, cuts: number[], half = 14) => {
	for (const t of cuts) {
		if (f >= t - half && f < t)
			return clamp(interpolate(f, [t - half, t], [0, 1]), 0, 1);
		if (f >= t && f < t + half)
			return clamp(interpolate(f, [t, t + half], [1, 0]), 0, 1);
	}
	return 0;
};

// ─── Scene 1: Hook (0-120) ──────────────────────────────────────────────────
const S1_Hook: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const tickerX = interpolate(frame, [0, 120], [0, -1100]);
	const titleScale = spring({ frame, fps, config: { damping: 200 } });
	const subOpacity = fadeIn(frame, 45);

	const TICKER =
		"SOL +2.1% · WIF -4.3% · JUP +8.7% · BONK +12.4% · JTO -1.2% · PYTH +3.1% · RNDR +18.2% · HNT -0.4% · BOME +33.1% · RAY +2.8% ·  ";

	return (
		<AbsoluteFill style={{ background: C.bg }}>
			<Orb color={C.cyan} size={900} opacity={0.12} style={{ top: -250, left: -250 }} />
			<Orb color={C.violet} size={600} opacity={0.1} style={{ bottom: -100, right: -150 }} />

			{/* Data ticker */}
			<div
				style={{
					position: "absolute",
					top: 56,
					left: 0,
					right: 0,
					height: 32,
					overflow: "hidden",
					opacity: 0.2,
				}}
			>
				<div
					style={{
						transform: `translateX(${tickerX}px)`,
						whiteSpace: "nowrap",
						fontFamily: "monospace",
						fontSize: 20,
						color: C.cyan,
						letterSpacing: "0.1em",
					}}
				>
					{Array(5).fill(TICKER).join("")}
				</div>
			</div>

			{/* Headline */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 28,
				}}
			>
				<div style={{ transform: `scale(${titleScale})`, textAlign: "center" }}>
					<h1
						style={{
							fontFamily: "sans-serif",
							fontSize: 124,
							fontWeight: 900,
							color: C.text,
							textTransform: "uppercase",
							letterSpacing: "-0.045em",
							lineHeight: 0.88,
							margin: 0,
						}}
					>
						The market
						<br />
						<span style={{ color: C.cyan }}>is talking.</span>
					</h1>
				</div>
				<p
					style={{
						opacity: subOpacity,
						fontFamily: "sans-serif",
						fontSize: 34,
						color: C.dim,
						fontWeight: 400,
						margin: 0,
						letterSpacing: "0.06em",
					}}
				>
					Are you even listening?
				</p>
			</div>
		</AbsoluteFill>
	);
};

// ─── Scene 2: Problem (120-270) ─────────────────────────────────────────────
const S2_Problem: React.FC = () => {
	const frame = useCurrentFrame();

	const bullets = [
		{ label: "Wash-traded volume — easily faked", delay: 25 },
		{ label: "Zero-liquidity scams — graded like real assets", delay: 45 },
		{ label: "No context. No clustering. No analyst.", delay: 65 },
	];

	const titleScale = clamp(interpolate(frame, [0, 18], [0.92, 1]), 0, 2);

	return (
		<AbsoluteFill style={{ background: C.bg }}>
			<Orb
				color={C.red}
				size={900}
				opacity={0.1}
				style={{ top: -300, left: "50%", transform: "translateX(-50%)" }}
			/>

			<div
				style={{
					position: "absolute",
					inset: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 36,
					padding: "0 200px",
				}}
			>
				<div
					style={{
						transform: `scale(${titleScale})`,
						opacity: fadeIn(frame, 0),
						textAlign: "center",
					}}
				>
					<h1
						style={{
							fontFamily: "sans-serif",
							fontSize: 88,
							fontWeight: 900,
							color: C.text,
							textTransform: "uppercase",
							letterSpacing: "-0.03em",
							lineHeight: 1,
							margin: 0,
						}}
					>
						Trending is a{" "}
						<span style={{ color: C.red, fontStyle: "italic" }}>lie.</span>
					</h1>
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 18,
						width: "100%",
						maxWidth: 900,
					}}
				>
					{bullets.map(({ label, delay }) => (
						<div
							key={label}
							style={{
								opacity: fadeIn(frame, delay),
								transform: `translateX(${clamp(
									interpolate(frame, [delay, delay + 20], [-30, 0]),
									-30,
									0
								)}px)`,
								display: "flex",
								alignItems: "center",
								gap: 20,
							}}
						>
							<div
								style={{
									width: 6,
									height: 6,
									borderRadius: "50%",
									background: C.red,
									flexShrink: 0,
								}}
							/>
							<span
								style={{
									fontFamily: "sans-serif",
									fontSize: 34,
									color: C.dim,
									fontWeight: 500,
								}}
							>
								{label}
							</span>
						</div>
					))}
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ─── Scene 3: Reveal (270-420) ──────────────────────────────────────────────
const S3_Reveal: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
	const nameOpacity = fadeIn(frame, 18);
	const subtitleOpacity = fadeIn(frame, 48);
	const orbOpacity = clamp(interpolate(frame, [0, 50], [0, 1]), 0, 1);

	return (
		<AbsoluteFill style={{ background: C.bg }}>
			<div style={{ opacity: orbOpacity }}>
				<Orb color={C.cyan} size={800} opacity={0.28} style={{ top: -180, left: -200 }} />
				<Orb color={C.violet} size={600} opacity={0.22} style={{ top: "30%", right: -150 }} />
				<Orb color={C.emerald} size={450} opacity={0.18} style={{ bottom: -80, left: "38%" }} />
			</div>

			<div
				style={{
					position: "absolute",
					inset: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 28,
				}}
			>
				{/* Wave icon */}
				<div style={{ transform: `scale(${logoScale})` }}>
					<svg width="80" height="52" viewBox="0 0 80 52" fill="none">
						<path
							d="M4 36 Q16 8 28 28 Q40 48 52 18 Q64 -10 76 18"
							stroke={C.cyan}
							strokeWidth="4.5"
							strokeLinecap="round"
							fill="none"
						/>
					</svg>
				</div>

				{/* Brand name */}
				<div style={{ opacity: nameOpacity, textAlign: "center" }}>
					<h1
						style={{
							fontFamily: "sans-serif",
							fontSize: 148,
							fontWeight: 900,
							color: C.text,
							textTransform: "uppercase",
							letterSpacing: "-0.05em",
							lineHeight: 0.82,
							margin: 0,
						}}
					>
						WAVE
						<span style={{ color: C.cyan }}>FRONT</span>
					</h1>
				</div>

				<p
					style={{
						opacity: subtitleOpacity,
						fontFamily: "sans-serif",
						fontSize: 28,
						color: C.dim,
						fontWeight: 400,
						margin: 0,
						letterSpacing: "0.32em",
						textTransform: "uppercase",
					}}
				>
					Onchain Intelligence for Solana
				</p>
			</div>
		</AbsoluteFill>
	);
};

// ─── Scene 4: Narrative Clustering (420-630) ────────────────────────────────
const S4_Narrative: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const imgX = interpolate(
		spring({ frame, fps, config: { damping: 200 } }),
		[0, 1],
		[-960, 0]
	);
	const cardOpacity = fadeIn(frame, 35);
	const cardX = clamp(
		interpolate(spring({ frame: frame - 25, fps, config: { damping: 200 } }), [0, 1], [80, 0]),
		0,
		80
	);

	const chips = [
		{ label: "AI Infrastructure", color: C.cyan, delay: 70 },
		{ label: "DePIN", color: C.emerald, delay: 88 },
		{ label: "Gaming", color: C.violet, delay: 106 },
		{ label: "Meme", color: "#f59e0b", delay: 124 },
		{ label: "RWA", color: "#f97316", delay: 142 },
		{ label: "DeFi", color: "#ec4899", delay: 160 },
	];

	return (
		<AbsoluteFill style={{ background: C.bg }}>
			<Orb color={C.cyan} size={500} opacity={0.18} style={{ top: -80, left: -80 }} />
			<Orb color={C.violet} size={400} opacity={0.13} style={{ bottom: -60, right: 180 }} />

			<SceneLabel n="01" label="Narrative Clustering" color={C.cyan} frame={frame} />

			{/* Screenshot — left */}
			<div
				style={{
					position: "absolute",
					left: 80,
					top: 130,
					bottom: 100,
					width: 780,
					transform: `translateX(${imgX}px)`,
					borderRadius: 22,
					overflow: "hidden",
					border: `1px solid ${C.border}`,
					boxShadow: `0 0 80px -12px ${C.cyan}50`,
				}}
			>
				<Img
					src={staticFile("wavefront/02-feed.png")}
					style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
				/>
				<div
					style={{
						position: "absolute",
						inset: 0,
						background: `linear-gradient(to right, transparent 65%, ${C.bg} 100%)`,
					}}
				/>
			</div>

			{/* Info card — right */}
			<div
				style={{
					position: "absolute",
					right: 72,
					top: "50%",
					transform: `translateY(-50%) translateX(${cardX}px)`,
					width: 580,
					opacity: cardOpacity,
				}}
			>
				<Glass accent={C.cyan}>
					<h2
						style={{
							fontFamily: "sans-serif",
							fontSize: 52,
							fontWeight: 900,
							color: C.text,
							margin: "0 0 6px 0",
							textTransform: "uppercase",
							letterSpacing: "-0.025em",
							lineHeight: 0.92,
						}}
					>
						Narrative
						<br />
						<span style={{ color: C.cyan }}>Clustering</span>
					</h2>
					<p
						style={{
							fontFamily: "sans-serif",
							fontSize: 21,
							color: C.dim,
							margin: "18px 0 28px",
							lineHeight: 1.55,
						}}
					>
						Detects emerging themes before they trend.
						<br />
						Ranked by cluster-wide volume velocity.
					</p>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
						{chips.map(({ label, color, delay }) => (
							<Tag
								key={label}
								label={label}
								color={color}
								opacity={fadeIn(frame, delay)}
							/>
						))}
					</div>
				</Glass>
			</div>
		</AbsoluteFill>
	);
};

// ─── Scene 5: Risk Scoring (630-840) ────────────────────────────────────────
const S5_Risk: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const imgX = clamp(
		interpolate(
			spring({ frame, fps, config: { damping: 200 } }),
			[0, 1],
			[960, 0]
		),
		0,
		960
	);
	const cardOpacity = fadeIn(frame, 35);
	const gradeScale = spring({ frame: frame - 25, fps, config: { damping: 12, stiffness: 90 } });

	const dims = [
		{ label: "Liquidity Depth", score: 75, weight: "30%", color: C.emerald },
		{ label: "Holder Distribution", score: 38, weight: "25%", color: C.red },
		{ label: "Volume Authenticity", score: 95, weight: "20%", color: C.cyan },
		{ label: "Security Flags", score: 30, weight: "25%", color: C.amber },
	];

	const barScale = (i: number) =>
		clamp(
			spring({ frame: frame - 60 - i * 16, fps, config: { damping: 200 } }),
			0,
			1.05
		);

	return (
		<AbsoluteFill style={{ background: C.bg }}>
			<Orb color={C.amber} size={500} opacity={0.14} style={{ top: 80, right: -80 }} />
			<Orb color={C.violet} size={400} opacity={0.13} style={{ bottom: 0, left: 80 }} />

			<SceneLabel n="02" label="Risk Scoring Engine" color={C.amber} frame={frame} />

			{/* Info card — left */}
			<div
				style={{
					position: "absolute",
					left: 72,
					top: "50%",
					transform: "translateY(-50%)",
					width: 580,
					opacity: cardOpacity,
				}}
			>
				<Glass accent={C.amber}>
					{/* Grade chip + title */}
					<div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 30 }}>
						<div
							style={{
								transform: `scale(${gradeScale})`,
								width: 76,
								height: 76,
								borderRadius: 16,
								background: `${C.amber}18`,
								border: `2px solid ${C.amber}55`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontFamily: "sans-serif",
								fontSize: 34,
								fontWeight: 900,
								color: C.amber,
								flexShrink: 0,
							}}
						>
							C+
						</div>
						<div>
							<h2
								style={{
									fontFamily: "sans-serif",
									fontSize: 36,
									fontWeight: 900,
									color: C.text,
									margin: 0,
									textTransform: "uppercase",
									letterSpacing: "-0.02em",
								}}
							>
								Risk <span style={{ color: C.amber }}>Autopsy</span>
							</h2>
							<p
								style={{
									fontFamily: "sans-serif",
									fontSize: 17,
									color: C.dim,
									margin: "4px 0 0",
								}}
							>
								A+ to F · 4-axis composite grade
							</p>
						</div>
					</div>

					{/* Score bars */}
					<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
						{dims.map((d, i) => (
							<div key={d.label}>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: 5,
									}}
								>
									<span
										style={{
											fontFamily: "sans-serif",
											fontSize: 15,
											color: C.dim,
											fontWeight: 600,
										}}
									>
										{d.label}
									</span>
									<span
										style={{
											fontFamily: "monospace",
											fontSize: 15,
											color: d.color,
											fontWeight: 700,
										}}
									>
										{d.score}/100 · {d.weight}
									</span>
								</div>
								<div
									style={{
										height: 7,
										borderRadius: 4,
										background: "rgba(255,255,255,0.07)",
									}}
								>
									<div
										style={{
											height: "100%",
											width: `${barScale(i) * d.score}%`,
											background: d.color,
											borderRadius: 4,
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</Glass>
			</div>

			{/* Screenshot — right */}
			<div
				style={{
					position: "absolute",
					right: 80,
					top: 130,
					bottom: 100,
					width: 780,
					transform: `translateX(${imgX}px)`,
					borderRadius: 22,
					overflow: "hidden",
					border: `1px solid ${C.border}`,
					boxShadow: `0 0 80px -12px ${C.amber}50`,
				}}
			>
				<Img
					src={staticFile("wavefront/03-verdict-a.png")}
					style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
				/>
				<div
					style={{
						position: "absolute",
						inset: 0,
						background: `linear-gradient(to left, transparent 60%, ${C.bg} 100%)`,
					}}
				/>
			</div>
		</AbsoluteFill>
	);
};

// ─── Scene 6: AI Copilot (840-1050) ─────────────────────────────────────────
const S6_Copilot: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const archOpacity = fadeIn(frame, 0, 40);
	const archScale = clamp(
		spring({ frame, fps, config: { damping: 200 } }),
		0,
		1.02
	);
	const cardOpacity = fadeIn(frame, 45);

	const bullets = [
		{ text: "Pre-loaded with live risk + security data", delay: 75 },
		{ text: "Liquidity, holders, freeze-authority flags", delay: 95 },
		{ text: "Answers with real numbers. Not guesses.", delay: 115 },
	];

	return (
		<AbsoluteFill style={{ background: C.bg }}>
			<Orb color={C.violet} size={700} opacity={0.18} style={{ top: -120, right: -100 }} />
			<Orb color={C.cyan} size={400} opacity={0.12} style={{ bottom: -40, left: 120 }} />

			<SceneLabel n="03" label="Gemini AI Copilot" color={C.violet} frame={frame} />

			{/* Architecture diagram — left */}
			<div
				style={{
					position: "absolute",
					left: 80,
					top: 130,
					bottom: 100,
					width: 760,
					opacity: archOpacity,
					transform: `scale(${archScale})`,
					transformOrigin: "left center",
					borderRadius: 22,
					overflow: "hidden",
					border: `1px solid ${C.border}`,
					boxShadow: `0 0 80px -12px ${C.violet}50`,
				}}
			>
				<Img
					src={staticFile("wavefront/06-architecture.png")}
					style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
				/>
			</div>

			{/* Info card — right */}
			<div
				style={{
					position: "absolute",
					right: 72,
					top: "50%",
					transform: "translateY(-50%)",
					width: 580,
					opacity: cardOpacity,
				}}
			>
				<Glass accent={C.violet}>
					<h2
						style={{
							fontFamily: "sans-serif",
							fontSize: 52,
							fontWeight: 900,
							color: C.text,
							margin: "0 0 6px 0",
							textTransform: "uppercase",
							letterSpacing: "-0.025em",
							lineHeight: 0.92,
						}}
					>
						Gemini AI
						<br />
						<span style={{ color: C.violet }}>Copilot</span>
					</h2>
					<p
						style={{
							fontFamily: "sans-serif",
							fontSize: 21,
							color: C.dim,
							margin: "18px 0 28px",
							lineHeight: 1.55,
						}}
					>
						The analyst that never sleeps — and already
						<br />
						knows every number before you ask.
					</p>
					<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
						{bullets.map(({ text, delay }) => (
							<div
								key={text}
								style={{
									opacity: fadeIn(frame, delay),
									transform: `translateX(${clamp(
										interpolate(frame, [delay, delay + 18], [-20, 0]),
										-20,
										0
									)}px)`,
									display: "flex",
									alignItems: "center",
									gap: 14,
								}}
							>
								<div
									style={{
										width: 6,
										height: 6,
										borderRadius: "50%",
										background: C.violet,
										flexShrink: 0,
									}}
								/>
								<span
									style={{
										fontFamily: "sans-serif",
										fontSize: 20,
										color: C.dim,
									}}
								>
									{text}
								</span>
							</div>
						))}
					</div>
				</Glass>
			</div>
		</AbsoluteFill>
	);
};

// ─── Scene 7: CTA (1050-1350) ────────────────────────────────────────────────
const S7_CTA: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const orbOpacity = clamp(interpolate(frame, [0, 60], [0, 1]), 0, 1);
	const titleScale = spring({ frame, fps, config: { damping: 200 } });
	const urlOpacity = fadeIn(frame, 50);
	const taglineOpacity = fadeIn(frame, 90);
	const ctaScale = spring({ frame: frame - 110, fps, config: { damping: 12, stiffness: 90 } });

	// Typewriter URL
	const URL_STR = "wavefront-gray.vercel.app";
	const charsVisible = Math.floor(
		clamp(interpolate(frame, [50, 115], [0, URL_STR.length]), 0, URL_STR.length)
	);
	const cursor = frame % 30 < 15 ? "|" : "";

	// Feature pills
	const pills = [
		{ text: "Narrative Clustering", color: C.cyan, delay: 130 },
		{ text: "Risk Scoring A+→F", color: C.amber, delay: 148 },
		{ text: "Gemini AI Copilot", color: C.violet, delay: 166 },
	];

	return (
		<AbsoluteFill style={{ background: C.bg }}>
			<div style={{ opacity: orbOpacity }}>
				<Orb color={C.cyan} size={900} opacity={0.22} style={{ top: -220, left: -250 }} />
				<Orb color={C.violet} size={700} opacity={0.18} style={{ top: "30%", right: -200 }} />
				<Orb color={C.emerald} size={500} opacity={0.15} style={{ bottom: -100, left: "40%" }} />
			</div>

			<div
				style={{
					position: "absolute",
					inset: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 22,
				}}
			>
				{/* Wave icon */}
				<div style={{ transform: `scale(${titleScale})` }}>
					<svg width="72" height="48" viewBox="0 0 80 52" fill="none">
						<path
							d="M4 36 Q16 8 28 28 Q40 48 52 18 Q64 -10 76 18"
							stroke={C.cyan}
							strokeWidth="4.5"
							strokeLinecap="round"
							fill="none"
						/>
					</svg>
				</div>

				{/* Brand */}
				<div style={{ transform: `scale(${titleScale})`, textAlign: "center" }}>
					<h1
						style={{
							fontFamily: "sans-serif",
							fontSize: 130,
							fontWeight: 900,
							color: C.text,
							textTransform: "uppercase",
							letterSpacing: "-0.05em",
							lineHeight: 0.82,
							margin: 0,
						}}
					>
						WAVE<span style={{ color: C.cyan }}>FRONT</span>
					</h1>
				</div>

				{/* URL */}
				<p
					style={{
						opacity: urlOpacity,
						fontFamily: "monospace",
						fontSize: 36,
						color: C.cyan,
						margin: 0,
						letterSpacing: "0.04em",
					}}
				>
					{URL_STR.slice(0, charsVisible)}
					<span style={{ opacity: charsVisible < URL_STR.length ? 1 : frame % 40 < 20 ? 1 : 0 }}>
						{cursor}
					</span>
				</p>

				{/* Tagline */}
				<p
					style={{
						opacity: taglineOpacity,
						fontFamily: "sans-serif",
						fontSize: 22,
						color: C.faint,
						margin: 0,
						letterSpacing: "0.22em",
						textTransform: "uppercase",
					}}
				>
					Built for Birdeye Data BIP Competition
				</p>

				{/* Feature pills */}
				<div style={{ display: "flex", gap: 14, marginTop: 8 }}>
					{pills.map(({ text, color, delay }) => (
						<Tag key={text} label={text} color={color} opacity={fadeIn(frame, delay)} />
					))}
				</div>

				{/* Live Now CTA */}
				{frame > 110 && (
					<div
						style={{
							transform: `scale(${ctaScale})`,
							marginTop: 10,
							background: `${C.cyan}15`,
							border: `1px solid ${C.cyan}45`,
							borderRadius: 50,
							padding: "16px 52px",
							fontFamily: "sans-serif",
							fontSize: 22,
							fontWeight: 700,
							color: C.cyan,
							letterSpacing: "0.16em",
							textTransform: "uppercase",
						}}
					>
						Try It Live →
					</div>
				)}
			</div>
		</AbsoluteFill>
	);
};

// ─── Root Composition ────────────────────────────────────────────────────────
const CUTS = [120, 270, 420, 630, 840, 1050];

export const WavefrontAd: React.FC = () => {
	const frame = useCurrentFrame();

	const transitionDark = getTransitionDark(frame, CUTS, 14);

	return (
		<AbsoluteFill style={{ background: C.bg }}>
			{/* Ambient drone */}
			<Audio src={staticFile("drone.mp3")} volume={0.22} />

			{/* Scene-cut SFX */}
			<Sequence from={0} durationInFrames={30}>
				<Audio src={staticFile("chime.mp3")} volume={0.35} />
			</Sequence>
			<Sequence from={270} durationInFrames={25}>
				<Audio src={staticFile("chime.mp3")} volume={0.45} />
			</Sequence>
			{[420, 630, 840].map((f) => (
				<Sequence key={f} from={f} durationInFrames={25}>
					<Audio src={staticFile("tick.mp3")} volume={0.55} />
				</Sequence>
			))}
			<Sequence from={1050} durationInFrames={30}>
				<Audio src={staticFile("chime.mp3")} volume={0.6} />
			</Sequence>

			{/* Scenes */}
			<Sequence from={0} durationInFrames={120} name="Hook">
				<S1_Hook />
			</Sequence>
			<Sequence from={120} durationInFrames={150} name="Problem">
				<S2_Problem />
			</Sequence>
			<Sequence from={270} durationInFrames={150} name="Reveal">
				<S3_Reveal />
			</Sequence>
			<Sequence from={420} durationInFrames={210} name="Narrative">
				<S4_Narrative />
			</Sequence>
			<Sequence from={630} durationInFrames={210} name="Risk">
				<S5_Risk />
			</Sequence>
			<Sequence from={840} durationInFrames={210} name="Copilot">
				<S6_Copilot />
			</Sequence>
			<Sequence from={1050} durationInFrames={300} name="CTA">
				<S7_CTA />
			</Sequence>

			{/* Dip-to-black transitions */}
			<AbsoluteFill
				style={{
					background: C.bg,
					opacity: transitionDark,
					pointerEvents: "none",
				}}
			/>
		</AbsoluteFill>
	);
};
