import "./index.css";
import { Composition } from "remotion";
import { WavefrontAd } from "./compositions/WavefrontAd";
import { VertexAd } from "./compositions/VertexAd";
import { VertexDemo } from "./compositions/VertexDemo";
import { VertexReel } from "./compositions/VertexReel";
import { LedgerSnapReel } from "./compositions/LedgerSnapReel";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="WavefrontAd"
				component={WavefrontAd}
				durationInFrames={1350}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="VertexAd"
				component={VertexAd}
				durationInFrames={1800}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="VertexDemo"
				component={VertexDemo}
				durationInFrames={1350}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="VertexReel"
				component={VertexReel}
				durationInFrames={1200}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="LedgerSnapReel"
				component={LedgerSnapReel}
				durationInFrames={1350}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
