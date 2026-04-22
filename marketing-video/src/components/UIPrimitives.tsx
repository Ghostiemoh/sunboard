import { staticFile, Img } from "remotion";

export const VertexLogo: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<Img
			src={staticFile("logo.png")}
			alt="Vertex Logo"
			className={`${className} object-contain`}
		/>
	);
};

export const ArchitectGrid: React.FC = () => {
	return (
		<div className="absolute inset-0 architect-grid pointer-events-none opacity-20" />
	);
};

export const VertexButton: React.FC<{
	label: string;
	variant?: "primary" | "outline";
	icon?: React.ReactNode;
	className?: string;
}> = ({ label, variant = "primary", icon, className }) => {
	const baseClass =
		"px-8 py-4 font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all";
	const variantClass =
		variant === "primary"
			? "bg-primary text-black shadow-2xl shadow-primary/20"
			: "bg-white/5 border border-white/10 text-white";

	return (
		<div className={`${baseClass} ${variantClass} ${className}`}>
			{label}
			{icon}
		</div>
	);
};

export const PrecisionCard: React.FC<{
	children: React.ReactNode;
	className?: string;
}> = ({ children, className }) => {
	return (
		<div
			className={`bezel-double precision-glass rounded-[32px] p-8 ${className}`}
		>
			{children}
		</div>
	);
};
