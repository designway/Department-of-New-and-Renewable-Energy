function Turbine({ size, speed }: { size: number; speed: "fast" | "slow" }) {
  const bladeAnim = speed === "fast" ? "anim-turbine" : "anim-turbine-slow";
  const towerH = size * 2.4;
  const towerTopW = size * 0.12;
  const towerBotW = size * 0.22;
  const bladeBox = size * 1.8;
  return (
    <div className="relative" style={{ width: size, height: towerH, overflow: "visible" }}>
      {/* Tower */}
      <svg
        viewBox={`0 0 ${size} ${towerH}`}
        width={size}
        height={towerH}
        className="absolute inset-0"
      >
        <polygon
          points={`${size / 2 - towerTopW / 2},0 ${size / 2 + towerTopW / 2},0 ${size / 2 + towerBotW / 2},${towerH} ${size / 2 - towerBotW / 2},${towerH}`}
          fill="#ffffff"
          opacity="0.95"
        />
      </svg>
      {/* Outer box positions the blade area so its CENTER sits on the tower top */}
      <div
        className="absolute"
        style={{
          width: bladeBox,
          height: bladeBox,
          top: -bladeBox / 2,
          left: (size - bladeBox) / 2,
        }}
      >
        {/* Inner div rotates around its own center */}
        <div className={`w-full h-full ${bladeAnim}`}>
          <svg viewBox="-50 -50 100 100" className="w-full h-full">
            {[0, 120, 240].map((deg) => (
              <path
                key={deg}
                d="M 0 0 Q 3 -18 0 -44 Q -3 -18 0 0 Z"
                fill="#ffffff"
                transform={`rotate(${deg})`}
              />
            ))}
            <circle r="5" fill="#ffffff" />
            <circle r="2.5" fill="#0B3C8A" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function HeroAnimations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Sun with rotating rays — positioned over the empty centre-right
          area of the hero (above the wind-turbine cluster on xl+) */}
      <div className="absolute top-4 right-6 md:top-6 md:right-12 xl:top-6 xl:right-auto xl:left-[66%] w-32 h-32 md:w-40 md:h-40 xl:w-44 xl:h-44 opacity-50">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 anim-sun-rays">
            <svg viewBox="-100 -100 200 200" className="w-full h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x="-3"
                  y="-92"
                  width="6"
                  height="30"
                  rx="3"
                  fill="#FCD34D"
                  transform={`rotate(${i * 30})`}
                />
              ))}
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-1/2 h-1/2">
              <div className="absolute inset-0 rounded-full bg-amber-300 anim-pulse-ring" />
              <div className="absolute inset-0 rounded-full bg-amber-400 shadow-[0_0_30px_rgba(252,211,77,0.7)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Wind turbines — stacked below the sun in the centre-right area
          of the hero. Only on xl+ where there's horizontal room. */}
      <div className="hidden xl:flex absolute bottom-4 left-[58%] items-end gap-10 opacity-55">
        <Turbine size={54} speed="slow" />
        <Turbine size={86} speed="fast" />
        <Turbine size={62} speed="slow" />
      </div>

      {/* Drifting cloud */}
      <div className="absolute top-10 left-1/3 w-28 opacity-25 anim-drift">
        <svg viewBox="0 0 80 30" className="w-full h-full" fill="#ffffff">
          <ellipse cx="20" cy="20" rx="14" ry="9" />
          <ellipse cx="40" cy="15" rx="18" ry="11" />
          <ellipse cx="60" cy="20" rx="14" ry="8" />
        </svg>
      </div>

      {/* Small second cloud */}
      <div className="hidden md:block absolute top-24 right-1/4 w-20 opacity-20 anim-float-slow">
        <svg viewBox="0 0 80 30" className="w-full h-full" fill="#ffffff">
          <ellipse cx="20" cy="20" rx="12" ry="7" />
          <ellipse cx="38" cy="16" rx="15" ry="9" />
          <ellipse cx="56" cy="20" rx="12" ry="7" />
        </svg>
      </div>
    </div>
  );
}
