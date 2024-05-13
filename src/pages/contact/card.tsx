import styles from "@/pages/home/styles.module.css"

const cardColor = "#EBEDDF"

export function ContactsCard() {
    return <>
        <div className={styles.card} style={{ backgroundColor: cardColor }}>
            <p>Contacts Card</p>
        </div>
    </>
}