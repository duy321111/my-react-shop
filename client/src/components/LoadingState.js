import React from "react";

const LoadingState = ({
    label = "Đang tải dữ liệu...",
    compact = false,
}) => {
    return (
        <div
            className={`loading-state ${compact ? "loading-state--compact" : ""}`}
            role="status"
            aria-live="polite"
        >
            <span className="loading-state__spinner" aria-hidden="true"></span>
            <p className="loading-state__label">{label}</p>
        </div>
    );
};

export default LoadingState;
