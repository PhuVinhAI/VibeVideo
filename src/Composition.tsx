import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const Title = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 20], [50, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="justify-center items-center">
      <div
        style={{ opacity, transform: `translateY(${translateY}px)` }}
        className="text-5xl text-slate-300 font-bold tracking-tight mb-32"
      >
        Tạo video bằng React với
      </div>
    </AbsoluteFill>
  );
};

const RemotionLogoText = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hiệu ứng nảy (spring bounce)
  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.8 },
  });

  return (
    <AbsoluteFill className="justify-center items-center mt-12">
      <div
        style={{ transform: `scale(${scale})` }}
        className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg"
      >
        Remotion
      </div>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <AbsoluteFill className="bg-slate-950 font-sans">
      <Sequence from={5} durationInFrames={115}>
        <Title />
      </Sequence>

      <Sequence from={25} durationInFrames={95}>
        <RemotionLogoText />
      </Sequence>
    </AbsoluteFill>
  );
};
