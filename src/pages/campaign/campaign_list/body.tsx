import Table from "@/_components/table";
import { campaignsStateStore } from "@/features/campaign/store";
import { Campaign } from "@/models/campaign";
import { formatDate } from "@/utils/formatters";
import { useStore } from "zustand";

import styles from "./_styles.module.css";
import { ColDef, ValueFormatterParams } from "@ag-grid-community/core";

export function CampaignListPageBody() {
  const cmpgns = useStore(campaignsStateStore).campaigns;

  const columns: ColDef<Campaign>[] = [
    { field: "name" },
    { field: "description" },
    {
      field: "startDate",
      valueFormatter: (params: ValueFormatterParams<Campaign, Date>) => {
        return formatDate(params.value, { format: "DD/MM/yyyy" });
      },
    },
    {
      field: "endDate",
      valueFormatter: (params: ValueFormatterParams<Campaign, Date>) => {
        return formatDate(params.value, { format: "DD/MM/yyyy" });
      },
    },
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
