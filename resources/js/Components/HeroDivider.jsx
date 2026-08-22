import React from 'react';

/**
 * Geometric Polygon Ribbon Divider for the Hero Slider boundary.
 * Seamlessly transitions between the Hero photo background above
 * and the clean white background below with a precision slanted green ribbon.
 */
export default function HeroDivider({ className = '' }) {
    return (
        <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}>
            <svg
                viewBox="0 0 1440 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-12 sm:h-16 md:h-24 lg:h-28 block"
                preserveAspectRatio="none"
            >
                <defs>
                    {/* Top facet bright emerald gradient */}
                    <linearGradient id="facetTopGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#005944" />
                        <stop offset="40%" stopColor="#007155" />
                        <stop offset="70%" stopColor="#00a878" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>

                    {/* Bottom facet deep emerald gradient */}
                    <linearGradient id="facetBottomGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#003b2c" />
                        <stop offset="40%" stopColor="#004d3b" />
                        <stop offset="70%" stopColor="#005944" />
                        <stop offset="100%" stopColor="#007155" />
                    </linearGradient>

                    {/* Top edge highlight */}
                    <linearGradient id="edgeGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
                        <stop offset="70%" stopColor="#6ee7b7" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#a7f3d0" />
                    </linearGradient>
                </defs>

                {/* 1. Pure White bottom fill spanning below the ribbon to cut into the next section */}
                <polygon
                    points="0,82 1440,32 1440,100 0,100"
                    fill="#ffffff"
                />

                {/* 2. Main bottom facet polygon */}
                <polygon
                    points="0,74 1440,24 1440,34 0,84"
                    fill="url(#facetBottomGrad)"
                />

                {/* 3. Main top facet polygon (slanted ribbon) */}
                <polygon
                    points="0,68 1440,12 1440,24 0,76"
                    fill="url(#facetTopGrad)"
                />

                {/* 4. Fine crisp highlight line along the top edge */}
                <polyline
                    points="0,68 1440,12"
                    stroke="url(#edgeGlow)"
                    strokeWidth="2"
                />

                {/* 5. Ridge line between upper and lower facets */}
                <polyline
                    points="0,75 1440,22"
                    stroke="#004d3b"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                />
            </svg>
        </div>
    );
}
