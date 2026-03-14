import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";

const Background = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const moveX1 = interpolate(Math.sin(frame / 60), [-1, 1], [-300, 300]);
  const moveY1 = interpolate(Math.cos(frame / 50), [-1, 1], [-200, 200]);

  const moveX2 = interpolate(Math.sin(frame / 40 + 2), [-1, 1], [300, -300]);
  const moveY2 = interpolate(Math.cos(frame / 70 + 1), [-1, 1], [200, -200]);

  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      <div
        className="absolute rounded-full bg-blue-700/40 blur-[120px]"
        style={{
          width: 800,
          height: 800,
          left: width / 2 - 400 + moveX1,
          top: height / 2 - 400 + moveY1,
        }}
      />
      <div
        className="absolute rounded-full bg-cyan-400/30 blur-[150px]"
        style={{
          width: 600,
          height: 600,
          left: width / 2 - 300 + moveX2,
          top: height / 2 - 300 + moveY2,
        }}
      />
    </AbsoluteFill>
  );
};

const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80, mass: 2 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const blur = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill className="justify-center items-center">
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          filter: `blur(${blur}px)`,
        }}
        className="text-9xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_40px_rgba(255,255,255,0.6)]"
      >
        Chuẩn AAA
      </div>
    </AbsoluteFill>
  );
};

const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text = "Hiệu Ứng Đỉnh Cao";

  return (
    <AbsoluteFill className="justify-center items-center">
      <div className="flex space-x-6 text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-600 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]">
        {text.split("").map((char, i) => {
          const charFrame = frame - i * 3;
          const charScale = spring({
            frame: charFrame,
            fps,
            config: { damping: 12, stiffness: 200 },
          });
          const charOpacity = interpolate(charFrame, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <span
              key={i}
              style={{
                transform: `scale(${charScale})`,
                opacity: charOpacity,
                display: "inline-block",
                whiteSpace: "pre",
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const yOffset = interpolate(progress, [0, 1], [150, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const scale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <AbsoluteFill className="justify-center items-center flex-col">
      <div
        style={{
          transform: `translateY(${yOffset}px)`,
          opacity,
        }}
        className="text-4xl text-cyan-200 font-semibold tracking-[0.5em] uppercase mb-8 opacity-80"
      >
        Powered By
      </div>
      <div
        style={{
          transform: `scale(${scale})`,
        }}
        className="text-[10rem] font-extrabold text-white drop-shadow-[0_0_80px_rgba(56,189,248,1)]"
      >
        Remotion
      </div>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <AbsoluteFill className="bg-black font-sans">
      <Background />

      <Sequence durationInFrames={100}>
        <Audio src="https://remotion.media/whip.wav" volume={0.6} />
        <Scene1 />
      </Sequence>

      <Sequence from={100} durationInFrames={100}>
        <Audio src="https://remotion.media/whoosh.wav" volume={0.6} />
        <Scene2 />
      </Sequence>

      <Sequence from={200}>
        <Audio src="https://remotion.media/whoosh.wav" volume={0.8} />
        <Audio src="https://remotion.media/whip.wav" volume={0.4} />
        <Scene3 />
      </Sequence>
    </AbsoluteFill>
  );
};
