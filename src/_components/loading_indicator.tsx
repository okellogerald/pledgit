import React from "react"
import { Oval } from "react-loader-spinner"
import colors from "../_themes/colors/colors"

export const LoadingIndicator: React.FC<{ h?: number, w?: number, color?: string, bgColor?: string }> = ({ h, w, color, bgColor }) => {
    return <Oval
        visible={true}
        height={h ?? 20}
        width={w ?? 20}
        strokeWidth={5}
        secondaryColor={bgColor ?? colors.primaryContainer}
        color={color ?? colors.primary}
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
}