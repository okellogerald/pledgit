import { CampaignsCard } from "../campaign/homepage_card/card";
import { ContactsCard } from "../contact/card";
import { PaymentsCard } from "../payments/card";
import { PledgesCard } from "../pledge/card";

import styles from "./styles.module.css"

export function HomeView() {
    return <>
        <div className={styles.scaffold}>
            <div className={styles.body}>
                <ContactsCard />
                <PledgesCard />
                <PaymentsCard />
                <CampaignsCard />
            </div>
        </div>
    </>
}
