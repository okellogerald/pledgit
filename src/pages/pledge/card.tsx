import styles from "@/pages/home/styles.module.css"

const cardColor = "#C0DFE7"

export function PledgesCard() {
    return <>
        <div className={styles.card} style={{ backgroundColor: cardColor }}>
            <p>Pledges Card</p>
        </div>
    </>
}