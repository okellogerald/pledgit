import space from "@/.themes/space/space"
import colors from "../../.themes/colors/colors"

const cardColor = "#F7E5DA"

export function PaymentsCard() {
    return <>
        <div style={{
            height: 300,
            width: "100%",
            borderRadius: 20,
            backgroundColor: cardColor,
            color: colors.text,
            padding: space.xs,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <p>Payments Card</p>
        </div>
    </>
}