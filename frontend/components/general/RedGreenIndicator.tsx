import React from "react";

export default function RedGreenIndicator({ isRed }: { isRed: boolean }) {
    return <div className={`w-4 h-4 rounded-full ${isRed ? "bg-red-600" : "bg-green-800"} `}></div>;
}
