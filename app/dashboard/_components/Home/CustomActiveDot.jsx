


const CustomActiveDot = (props) => {
    const { cx, cy, color } = props;
    return (
        <svg
            x={cx - 12}
            y={cy - 12}
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill={color} fillOpacity="0.1" />
            <circle cx="12.0003" cy="11.9998" r="9.33333" fill={color} fillOpacity="0.3" />
            <g filter="url(#filter0_d_588_518)">
                <circle cx="12.0003" cy="11.9998" r="5.33333" fill={color} />
                <circle cx="12.0003" cy="11.9998" r="4.93333" stroke="white" strokeWidth="0.8" />
            </g>
            <defs>
                <filter id="filter0_d_588_518" x="6.66699" y="6.6665" width="10.6665" height="11.3332" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="0.666667" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0901961 0 0 0 0 0.113725 0 0 0 0 0.27451 0 0 0 0.2 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_588_518" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_588_518" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default CustomActiveDot