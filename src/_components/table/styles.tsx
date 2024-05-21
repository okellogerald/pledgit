import colors from "@/_themes/colors/colors";
import space from "@/_themes/space/space";
import text from "@/_themes/text_sizes/text_sizes";
import { CSSProperties } from "react";

export const table: CSSProperties = {
  padding: space.sm,
  width: "100%",
  overflowX: "auto",
  borderCollapse: "collapse",

  borderBottom: `1px solid ${colors.divider}`,
};

export const tableHeaderRow: CSSProperties = {
  cursor: "auto",
  height: 60,

  backgroundColor: colors.primaryContainer,
  color: colors.onPrimaryContainer,
};

export const tableHeader: CSSProperties = {
  cursor: "pointer",
  minHeight: 20,
  textAlign: "start",
  fontWeight: 500,
  fontSize: text.p,
  color: colors.text,
};

export const tableDataRow: CSSProperties = {
  height: 60,

  fontSize: text.p,
  color: colors.text2,

  fontWeight: 400,

  textAlign: "start",
};

export const firstData: CSSProperties = {
  paddingLeft: space.sm,
};

export const firstHeader: CSSProperties = {
  paddingLeft: space.sm,
};
