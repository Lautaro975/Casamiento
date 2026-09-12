type PaperPlaneGraphicProps = {
    /** Prefijo único para ids de gradientes/filtros (evita colisiones entre SVGs). */
    idPrefix: string;
    /** Si true, solo paths + defs (para anidar dentro de otro svg). */
    nested?: boolean;
    className?: string;
};

export function PaperPlaneGraphic({
    idPrefix,
    nested = false,
    className,
}: PaperPlaneGraphicProps) {
    const wingLeft = `${idPrefix}-wingLeft`;
    const wingRight = `${idPrefix}-wingRight`;
    const center = `${idPrefix}-center`;
    const shadowLeft = `${idPrefix}-shadowLeft`;
    const shadowRight = `${idPrefix}-shadowRight`;
    const softShadow = `${idPrefix}-softShadow`;

    const defs = (
        <>
            <linearGradient id={wingLeft} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#737B47" />
                <stop offset="50%" stopColor="#5B6236" />
                <stop offset="100%" stopColor="#454B28" />
            </linearGradient>
            <linearGradient id={wingRight} x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#78804A" />
                <stop offset="50%" stopColor="#5B6236" />
                <stop offset="100%" stopColor="#454B28" />
            </linearGradient>
            <linearGradient id={center} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#697142" />
                <stop offset="45%" stopColor="#51582F" />
                <stop offset="52%" stopColor="#353B20" />
                <stop offset="100%" stopColor="#626A3C" />
            </linearGradient>
            <linearGradient id={shadowLeft} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#343A20" stopOpacity={0} />
                <stop offset="100%" stopColor="#292E19" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id={shadowRight} x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#343A20" stopOpacity={0} />
                <stop offset="100%" stopColor="#292E19" stopOpacity={0.7} />
            </linearGradient>
            <filter
                id={softShadow}
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
            >
                <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
                <feOffset dy="10" />
                <feComponentTransfer>
                    <feFuncA type="linear" slope={0.25} />
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </>
    );

    const shapes = (
        <g filter={`url(#${softShadow})`}>
            <path
                d="M300 35 L55 565 L115 625 L265 535 L300 765 Z"
                fill={`url(#${wingLeft})`}
            />
            <path
                d="M300 35 L265 535 L300 765 L300 35 Z"
                fill={`url(#${shadowLeft})`}
            />
            <path
                d="M300 35 L545 565 L485 625 L335 535 L300 765 Z"
                fill={`url(#${wingRight})`}
            />
            <path
                d="M300 35 L335 535 L300 765 L300 35 Z"
                fill={`url(#${shadowRight})`}
            />
            <path
                d="M300 35 L325 505 L300 765 L275 505 Z"
                fill={`url(#${center})`}
            />
            <path
                d="M300 35 L310 500 L300 735 L292 500 Z"
                fill="#292E19"
                opacity={0.65}
            />
            <path
                d="M55 565 L115 625 L265 535 L250 515 Z"
                fill="#3D4323"
                opacity={0.75}
            />
            <path
                d="M545 565 L485 625 L335 535 L350 515 Z"
                fill="#3D4323"
                opacity={0.75}
            />
            <path
                d="M300 35 L75 555 L265 515 Z"
                fill="#8A925A"
                opacity={0.1}
            />
            <path
                d="M300 35 L525 555 L335 515 Z"
                fill="#929A60"
                opacity={0.08}
            />
        </g>
    );

    if (nested) {
        return (
            <>
                <defs>{defs}</defs>
                {shapes}
            </>
        );
    }

    return (
        <svg
            viewBox="0 0 600 800"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <defs>{defs}</defs>
            {shapes}
        </svg>
    );
}
