import React from 'react'

const getIcon = (trend, value) => {
    if (!trend) {
        return (
            <g fill="none">
                <rect fill="#FF7D1D" width={29} height={30} rx={4} />
                <text fontFamily="Rubik-Bold, Rubik" fontSize={12} fontWeight="bold" fill="#FFF" textAnchor="middle">
                    <tspan x="50%" y={19}>
                        {value}
                    </tspan>
                </text>
            </g>
        );
    } else {
        return (
            <g fill="none">
                <path d="M0 0h29v30H0z" />
                <path
                    d="M4 0h21a4 4 0 014 4v21.999a4 4 0 01-5.747 3.598l-7.88-3.825a2 2 0 00-1.747 0l-7.879 3.825A4 4 0 010 26V4a4 4 0 014-4z"
                    fill="#8FC742"
                />
                <text fontFamily="Rubik-Bold, Rubik" fontSize={12} fontWeight="bold" fill="#FFF" textAnchor="middle">
                    <tspan x="50%" y={19}>
                        {value}
                    </tspan>
                </text>
            </g>
        );
    }
};

const IconFlag = ({trend, size = 24, value, ...props}) => {
    return (
    <svg {...props} width={size} height={size} viewBox="0 0 29 30">
        {getIcon(trend,value)}
    </svg>
    )
};

export default IconFlag;
