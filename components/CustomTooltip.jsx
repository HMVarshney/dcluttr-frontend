import React from "react";

const CustomTooltip = ({ active, payload, label, coordinate }) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="text-sm whitespace-nowrap transition bg-black px-4 py-1 rounded flex flex-col justify-between text-white absolute"
                style={{
                    top: coordinate.y - 40,
                    left: coordinate.x > 200 ? coordinate.x - 50 : coordinate.x + 30,
                    transform: "translate(-50%, -100%)"
                }}
            >
                {/* <p>{payload[0].value.toLocaleString()}</p>${ele.name} */}
                {/* <p>{`Value in ${label} ${payload[0].value.toLocaleString()}`}</p> */}
                {payload.map((ele) => (
                    <p key={ele.color}>{`${ele.value}`}</p>
                ))}
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
