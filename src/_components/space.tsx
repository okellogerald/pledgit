import React from "react";

export const VSpace: React.FC<{ space?: number }> = ({ space }) => {
    return (
        <div style={{ height: space ?? 20 }} />
    );
}

export const HSpace: React.FC<{ space?: number }> = ({ space }) => {
    return (
        <div style={{ width: space ?? 10, display: "inline-block" }} />
    );
}