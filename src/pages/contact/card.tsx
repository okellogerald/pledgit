import space from "@/.themes/space/space"
import colors from "../../.themes/colors/colors"

const cardColor = "#EBEDDF"

export function ContactsCard() {
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
            <p>Contacts Card</p>
        </div>
    </>
}