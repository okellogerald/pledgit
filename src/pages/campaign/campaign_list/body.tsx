import Table from "@/_components/table";
import { campaignsStateStore } from "@/features/campaign/store";
import { Campaign } from "@/models/campaign";
import { formatDate, formatTZAmount } from "@/utils/formatters";
import { useStore } from "zustand";

import styles from "./_styles.module.css";
import { ColDef, ValueFormatterParams } from "@ag-grid-community/core";

export function CampaignListPageBody() {
  const cmpgns = useStore(campaignsStateStore).campaigns;

  const columns: ColDef<Campaign>[] = [
    { field: "name" },
    { field: "description" },
    {
      headerName: "Start Date - End Date",
      valueFormatter: (params: ValueFormatterParams<Campaign, Date>) => {
        return `${formatDate(params.value, { format: "DD/MM/yyyy" })} - ${formatDate(params.value, { format: "DD/MM/yyyy" })}`;
      },
    },
    {
      headerName: "Pledged Amount",
      valueGetter: (e) => formatTZAmount(e.data?.pledgedAmount ?? 0),
    },
    {
      headerName: "Paid Amount",
      valueGetter: (e) => formatTZAmount(e.data?.paidAmount ?? 0),
    }
  ];

  return (
    <>
      <div className={styles.body}>
        <h4>Campaigns</h4>
        {cmpgns.length > 0 && (
          <div className={styles.table}>
            <Table columns={columns} data={cmpgns} />
          </div>
        )}
      </div>
    </>
  );
}
