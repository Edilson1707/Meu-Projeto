import React from 'react';

interface SoPadroesLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'mark';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitle?: string;
}

export const SoPadroesLogo: React.FC<SoPadroesLogoProps> = ({
  className = '',
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  showSubtitle = true,
  subtitle = 'Fabricação de Padrões de Medição e Desenvolvimentos de Projetos Elétricos',
}) => {
  const textColor = theme === 'dark' ? '#FFFFFF' : '#0F172A';
  const subtitleColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';

  // Sizing maps
  const markDimensions = {
    sm: { w: 32, h: 32 },
    md: { w: 42, h: 42 },
    lg: { w: 56, h: 56 },
    xl: { w: 72, h: 72 },
  }[size];

  // The distinctive Só Padrões emblem:
  // - Green arc swoosh on the left (tapering upward)
  // - Blue arc swoosh on the right (tapering downward)
  // - Dynamic yellow lightning bolt in the center
  const Emblem = ({ width = 42, height = 42 }: { width?: number; height?: number }) => (
    <div
      className="relative shrink-0 flex items-center justify-center filter drop-shadow-sm transition-transform group-hover:scale-105"
      style={{ width, height }}
    >
      <svg
        viewBox="0 0 200 200"
        width={width}
        height={height}
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle 3D gradient for lightning bolt */}
          <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDE00" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* White outline background for sticker pop effect */}
        <g id="sticker-border" opacity="0.95">
          {/* Halo around left green arc */}
          <path
            d="M 45,178 C 15,160 -5,120 2,75 C 6,48 18,25 32,8 C 30,22 36,44 50,62 C 38,82 38,110 58,135 C 68,148 80,155 95,158 C 76,168 60,172 45,178 Z"
            fill="none"
            stroke="white"
            strokeWidth="10"
            strokeLinejoin="round"
          />
          {/* Halo around right blue arc */}
          <path
            d="M 155,22 C 185,40 205,80 198,125 C 194,152 182,175 168,192 C 170,178 164,156 150,138 C 162,118 162,90 142,65 C 132,52 120,45 105,42 C 124,32 140,28 155,22 Z"
            fill="none"
            stroke="white"
            strokeWidth="10"
            strokeLinejoin="round"
          />
          {/* Halo around lightning bolt */}
          <path
            d="M 104,10 L 62,106 L 98,109 L 84,190 L 148,85 L 112,82 Z"
            fill="none"
            stroke="white"
            strokeWidth="12"
            strokeLinejoin="round"
          />
        </g>

        {/* 1. Left Green Arc Swoosh */}
        <path
          d="M 45,178 
             C 15,160 -5,120 2,75 
             C 6,48 18,25 32,8 
             C 30,22 36,44 50,62 
             C 38,82 38,110 58,135 
             C 68,148 80,155 95,158 
             C 76,168 60,172 45,178 Z"
          fill="#009B3A"
        />

        {/* 2. Right Blue Arc Swoosh */}
        <path
          d="M 155,22 
             C 185,40 205,80 198,125 
             C 194,152 182,175 168,192 
             C 170,178 164,156 150,138 
             C 162,118 162,90 142,65 
             C 132,52 120,45 105,42 
             C 124,32 140,28 155,22 Z"
          fill="#002776"
        />

        {/* 3. Central Dynamic Gold Lightning Bolt */}
        <path
          d="M 104,10 
             L 62,106 
             L 98,109 
             L 84,190 
             L 148,85 
             L 112,82 
             Z"
          fill="url(#boltGrad)"
          stroke="#EAB308"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  // Stylized SÓ PADRÕES typography with high-impact angular styling
  const Wordmark = () => (
    <div className="flex flex-col select-none">
      <div className="flex items-center tracking-tight leading-none">
        <span
          className="font-extrabold tracking-tighter"
          style={{
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Montserrat", "Segoe UI", Roboto, sans-serif',
            fontSize: size === 'sm' ? '1.15rem' : size === 'lg' ? '1.85rem' : size === 'xl' ? '2.25rem' : '1.45rem',
            color: textColor,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            fontWeight: 900,
          }}
        >
          SÓ <span className="text-[#F59E0B] font-black">PADRÕES</span>
        </span>
      </div>
      {showSubtitle && (
        <span
          className={`font-semibold tracking-tight ${subtitleColor} leading-tight text-left max-w-[280px] sm:max-w-[360px] md:max-w-[440px]`}
          style={{
            fontSize: size === 'sm' ? '7.5px' : size === 'lg' ? '10px' : size === 'xl' ? '11px' : '8.5px',
            marginTop: '2px',
            lineHeight: 1.25,
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem width={markDimensions.w} height={markDimensions.h} />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        <Emblem
          width={size === 'xl' ? 96 : size === 'lg' ? 76 : 56}
          height={size === 'xl' ? 96 : size === 'lg' ? 76 : 56}
        />
        <Wordmark />
      </div>
    );
  }

  // Default: Horizontal
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Emblem width={markDimensions.w} height={markDimensions.h} />
      <Wordmark />
    </div>
  );
};
