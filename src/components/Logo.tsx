type LogoProps = {
  className?: string;
};

/**
 * House silhouette with light radiating from behind it and spilling out
 * through the windows and door — "A Southern Glow," illuminating.
 */
export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      role="img"
      aria-label="A Southern Glow — a house glowing warmly against the dusk"
    >
      <defs>
        <linearGradient id="logo-ray" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--sunset-gold))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--sunset-coral))" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="logo-beam" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--sunset-gold))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--sunset-rose))" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Sunburst rays, radiating from behind the house */}
      <g stroke="url(#logo-ray)" strokeWidth="2.5" strokeLinecap="round">
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad = (angle * Math.PI) / 180;
          const inner = 58;
          const outer = i % 2 === 0 ? 108 : 88;
          const cx = 110;
          const cy = 96;
          const x1 = cx + Math.cos(rad) * inner;
          const y1 = cy + Math.sin(rad) * inner;
          const x2 = cx + Math.cos(rad) * outer;
          const y2 = cy + Math.sin(rad) * outer;
          return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      {/* Light shafts flaring out of the windows and door */}
      <path d="M 78 130 L 65 92 L 99 92 L 90 130 Z" fill="url(#logo-beam)" opacity="0.85" />
      <path d="M 142 130 L 121 92 L 155 92 L 130 130 Z" fill="url(#logo-beam)" opacity="0.85" />
      <path d="M 122 178 L 96 150 L 124 150 L 138 178 Z" fill="url(#logo-beam)" opacity="0.9" />

      {/* House silhouette */}
      <g>
        {/* Roof */}
        <polygon points="52,96 110,44 168,96" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="42" y1="98" x2="178" y2="98" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />

        {/* Chimney */}
        <rect x="138" y="55" width="12" height="26" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Walls */}
        <rect x="60" y="98" width="100" height="80" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="2.5" />

        {/* Siding texture lines */}
        <g stroke="hsl(var(--foreground) / 0.35)" strokeWidth="1">
          <line x1="60" y1="114" x2="160" y2="114" />
          <line x1="60" y1="130" x2="160" y2="130" />
          <line x1="60" y1="163" x2="160" y2="163" />
        </g>

        {/* Left window (glowing) */}
        <rect x="70" y="112" width="24" height="24" fill="hsl(var(--sunset-gold) / 0.9)" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="82" y1="112" x2="82" y2="136" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="70" y1="124" x2="94" y2="124" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Right window (glowing) */}
        <rect x="126" y="112" width="24" height="24" fill="hsl(var(--sunset-gold) / 0.9)" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="138" y1="112" x2="138" y2="136" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="126" y1="124" x2="150" y2="124" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Door (glowing) */}
        <path
          d="M 97 178 L 97 154 A 13 13 0 0 1 123 154 L 123 178 Z"
          fill="hsl(var(--sunset-gold) / 0.95)"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
        />
        <circle cx="118" cy="168" r="1.6" fill="hsl(var(--foreground))" />
      </g>
    </svg>
  );
}
