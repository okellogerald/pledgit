import Table from "@/_components/table";
import { useStore } from "zustand";

import styles from "./_styles.module.css";
import { ColDef } from "@ag-grid-community/core";
import { paymentsStateStore } from "@/features/payment/store";
import { Payment } from "@/models/payment";
import { formatAmount } from "@/utils/utils";
import { formatTZAmount } from "@/utils/formatters";

export function PaymentListPageBody() {
  const payments = useStore(paymentsStateStore).payments;

  const columns: ColDef<Payment>[] = [
    {
      headerName: "Pledger",
      valueGetter: (e) => `${e.data?.contact.firstName} ${e.data?.contact.lastName}`,
    },
    {
      headerName: "Campaign",
      valueGetter: (e) => e.data?.campaign.name,
    },
    {
      headerName: "Amount",
      valueGetter: (e) => formatTZAmount(e.data?.amount ?? 0),
    },
    {
      headerName: "Payment Method",
      valueGetter: (e) => e.data?.method ?? "",
    },
  ];

  return (
    <>
      <div className={styles.body}>
        <h4>Payments</h4>
        {payments.length > 0 && (
          <div className={styles.table}>
            <Table columns={columns} data={payments} />
          </div>
        )}
      </div>
    </>
  );
}
