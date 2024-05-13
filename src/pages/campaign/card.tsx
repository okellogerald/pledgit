import space from "@/.themes/space/space"
import colors from "../../.themes/colors/colors"

const cardColor = "#E2E2E2"

export function CampaignsCard() {
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
            <p>Campaigns Card</p>
        </div>
    </>
}