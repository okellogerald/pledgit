import Table from "@/_components/table/table";
import { campaignsStateStore } from "@/features/campaign/store";
import { Campaign } from "@/models/campaign";
import { formatDate } from "@/utils/formatters";
import { ColumnDef } from "@tanstack/react-table";
import { useStore } from "zustand";

export function CampaignListPageBody() {
  const cmpgns = useStore(campaignsStateStore).campaigns;

  const columns: ColumnDef<Campaign, any>[] = [
    {
      id: "name",
      header: "Name",
      accessorFn: (r) => r.name,
    },
    {
      id: "desc",
      header: "Description",
      accessorFn: (r) => r.description,
    },

    {
      id: "start-date",
      header: "Start Date",
      accessorFn: (r) => r.startDate,
      cell(props) {
        return <p>{formatDate(props.row.original.startDate)}</p>;
      },
    },
    {
      id: "end-date",
      header: "End Date",
      accessorFn: (r) => r.endDate,
      cell(props) {
        return <p>{formatDate(props.row.original.endDate)}</p>;
      },
    },
  ];

  return (
    <>
      {cmpgns.length > 0 && (
        <div>
          <Table data={cmpgns} columns={columns} onRowClick={() => {}} />
        </div>
      )}
    </>
  );
}
