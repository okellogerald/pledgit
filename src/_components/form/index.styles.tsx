import space from "@/_themes/space/space";
import text from "@/_themes/text_sizes/text_sizes";
import colors from "@/_themes/colors/colors";

import { CSSProperties } from "react";

export const root: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: space.md,
};

export const label: CSSProperties = {
  fontSize: text.p,
  fontWeight: 300,
  color: colors.text2,
};

export const message: CSSProperties = {
  fontSize: text.xs,
  color: "red",
};

export const input: CSSProperties = {
  backgroundColor: colors.primaryContainer,
  color: colors.onPrimaryContainer,
  padding: space.xs,
  borderWidth: 0,
  borderColor: "transparent",

  borderRadius: 10,

  width: "100%",

  fontFamily: "inherit",
  fontSize: text.p,
  fontWeight: 400,
};

export const labelInputContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",

  gap: space.xxxs,

  width: "100%",
};

export const control: CSSProperties = {
  width: "100%",
};

export const field: CSSProperties = {
  width: "100%",
};
