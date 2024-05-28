import Table from "@/_components/table";
import { useStore } from "zustand";

import styles from "./_styles.module.css";
import { ColDef } from "@ag-grid-community/core";
import { pledgesStateStore } from "@/features/pledge/store";
import { Pledge } from "@/models/pledge";
import { formatTZAmount } from "@/utils/formatters";

export function PledgeListPageBody() {
  const pledges = useStore(pledgesStateStore).pledges;

  const columns: ColDef<Pledge>[] = [
    {
      headerName: "Pledger",
      valueGetter: (e) => `${e.data?.contact.firstName} ${e.data?.contact.lastName}`,
    },
    {
      headerName: "Campaign",
      valueGetter: (e) => e.data?.campaign.name,
    },
    {
      headerName: "Total Amount",
      valueGetter: (e) => formatTZAmount(e.data?.amount ?? 0),
    },
    {
      headerName: "Paid Amount",
      valueGetter: (e) => formatTZAmount(e.data?.paidAmount ?? 0),
    },
  ];

  return (
    <>
      <div className={styles.body}>
        <h4>Pledges</h4>
        {pledges.length > 0 && (
          <div className={styles.table}>
            <Table columns={columns} data={pledges} />
          </div>
        )}
      </div>
    </>
  );
}
