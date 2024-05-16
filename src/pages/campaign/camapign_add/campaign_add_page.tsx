import { FormRoot } from "@/_components/form";
import { input, label } from "@/_components/form/index.styles";
import {
  SimpleFormField,
  SimpleFormSubmit,
  SimpleInput,
} from "@/_components/form/simple_components";
import { ChangeEvent, useState } from "react";

import moment from "moment";

import styles from "./_styles.module.css";
import Header from "./header";
import { VSpace } from "@/_components/space";

export const CAMPAIGN_ADD_PAGE_ROUTE_NAME = "campaign-add-page";

interface DateRange {
  startDate: string;
  endDate: string;
}

const format = "YYYY-MM-DD";

function formatDate(date: moment.MomentInput) {
  return moment(date).format(format);
}

export default function CampaignAddPage() {
  var currentDate = new Date();
  var previousMonthDate = new Date(currentDate);
  previousMonthDate.setMonth(currentDate.getMonth() - 1);

  var defaultEndDate = formatDate(currentDate);
  var defaultStartDate = formatDate(previousMonthDate);

  const [range, setRange] = useState<DateRange>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });

  const setStartDate = (e: ChangeEvent) => {
    var formattedDate = formatDate((e.target as any).value);
    setRange({ ...range, startDate: formattedDate });
  };
  const setEndDate = (e: ChangeEvent) => {
    var formattedDate = formatDate((e.target as any).value);
    setRange({ ...range, endDate: formattedDate });
  };

  return (
    <>
      <div className={styles.scaffold}>
        <div className={styles.header}>
          <Header />{" "}
        </div>
        <div className={styles.body}>
          <div className={styles.form}>
            <h3>Add Campaign</h3>
            <VSpace />
            <FormRoot>
              <SimpleFormField label="Campaign Name"> </SimpleFormField>
              <div style={{ width: "100%" }}>
                <Label lbl="Campaign Description" />
                <textarea required style={input}></textarea>
              </div>
              <div style={{ width: "100%" }}>
                <Label lbl="Start Date" />
                <SimpleInput
                  id={"start-date"}
                  type="date"
                  value={range.startDate}
                  onChange={setStartDate}
                  style={{
                    paddingRight: 0,
                    marginRight: 0,
                  }}
                ></SimpleInput>
              </div>
              <div style={{ width: "100%" }}>
                <Label lbl="End Date" />
                <SimpleInput
                  id={"end-date"}
                  type="date"
                  value={range.endDate}
                  onChange={setEndDate}
                  style={{
                    paddingRight: 0,
                    marginRight: 0,
                  }}
                ></SimpleInput>
              </div>

              <SimpleFormSubmit />
            </FormRoot>
          </div>
        </div>
      </div>
    </>
  );
}

const Label: React.FC<{ lbl: string }> = ({ lbl }) => {
  return (
    <p
      style={{
        ...label,
        marginBottom: 5,
      }}
    >
      {lbl}
    </p>
  );
};
