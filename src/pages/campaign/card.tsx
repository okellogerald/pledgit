import styles from "@/pages/home/styles.module.css"

const cardColor = "#E2E2E2"

export function CampaignsCard() {
    // const [data, setData] = useState<AsyncState<State | undefined>>({ status: "initial" });
    return <>
        <div className={styles.card} style={{ backgroundColor: cardColor }}>
            <p>Campaigns Card</p>
        </div>
    </>
}
