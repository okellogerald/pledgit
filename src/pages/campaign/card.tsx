import { OutlineButton } from "@/_components/buttons/outline_button";
import { LoadingIndicator } from "@/_components/loading_indicator";
import { VSpace } from "@/_components/space";
import { CampaignManager } from "@/features/campaign/manager";
import { Campaign } from "@/models/campaign";
import styles from "@/pages/home/styles.module.css"
import { AsyncState, matchAsyncState, trackPromise } from "@/utils/promise";
import { useEffect, useState } from "react";

const cardColor = "#E2E2E2"


async function fetchCampaigns(): Promise<Campaign[] | undefined> {
    try {
        return await CampaignManager.instance.getAll()
    } catch (error) {
        console.log(error)
    }
}

export function CampaignsCard() {
    const [data, setData] = useState<AsyncState<Campaign[] | undefined>>({ status: "initial" });

    useEffect(() => { fetchData() }, [])

    const fetchData = () => trackPromise(fetchCampaigns(), setData)

    return matchAsyncState(
        data, {
        onError: () => ErrorView(fetchData),
        onSuccess: (d) => d === undefined ? ErrorView(fetchData) : DataView(d),
        otherwise: LoadingView,
    })
}

function LoadingView(_msg?: string) {
    return (
        <div className={styles.card} style={{ backgroundColor: cardColor }}>
            <LoadingIndicator />
            <VSpace />
            <p>Loading...</p>
        </div>
    )
}

const ErrorView = (tryAgainFN: () => void) => {
    return (
        <div className={styles.card} style={{ backgroundColor: cardColor }}>
            <p>We faced a problem trying to fetch your campaigns. Please try again.</p>
            <VSpace />
            <OutlineButton label="Try Again" onClick={tryAgainFN} />
        </div>
    )
}

const DataView = (data: Campaign[]) => {
    return (
        <div className={styles.card} style={{ backgroundColor: cardColor }}>
            <div style={{
                display: "flex",
                width: "100%",

                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <h3>Campaigns</h3>
                <OutlineButton label="Add New" />
            </div>
            <VSpace space={20} />
            <table>
                <tr>
                    <th>Name</th>
                    <th>End Date</th>
                </tr>
                {
                    data.map((campaign) => {
                        return (
                            <tr key={campaign.id}>
                                <td>
                                    <h5>{campaign.name}</h5>
                                    <p>{campaign.description}</p>
                                </td>
                                <td>{campaign.endDate}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}
