import React from 'react';

interface HouseIconProps {
    size?: number | string;
    strokeWidth?: number | string;
    className?: string;
    style?: React.CSSProperties;
}

const HouseIcon: React.FC<HouseIconProps> = ({ size = 24, strokeWidth = 3.5, className, style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block', ...style }}
    >
        <path
            d="M4 14L16 5L28 14"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8 17L16 11L24 17V29H8V17Z"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default HouseIcon;
