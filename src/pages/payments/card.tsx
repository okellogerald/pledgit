import styles from "@/pages/home/styles.module.css"

const cardColor = "#F7E5DA"

export function PaymentsCard() {
    return <>
        <div className={styles.card} style={{ backgroundColor: cardColor }}>
            <h1>Payments Card</h1>
        </div>
    </>
}