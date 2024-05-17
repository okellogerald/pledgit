import moment from "moment";

export function formatTZAmount(
  n: number,
  props?: { symbol?: string; options?: Intl.NumberFormatOptions },
): string {
  return (
    (props?.symbol ?? "TZS ") +
    Intl.NumberFormat(undefined, props?.options).format(n)
  );
}

// export function formatDate(
//   d: number | Date,
//   dateStyle?: "medium" | "full" | "long" | "short" | undefined,
//   timeStyle?: "medium" | "full" | "long" | "short" | undefined,
// ): string {
//   const options: Intl.DateTimeFormatOptions = {
//     dateStyle: dateStyle ?? "medium",
//     timeStyle: timeStyle,
//   };
//   return Intl.DateTimeFormat(undefined, options).format(new Date(d));
// }

export function formatDate(
  date: moment.MomentInput,
  props?: { format: string },
) {
  return moment(date).format(props?.format);
}

export function parseDate(str: string) {
  return moment(str).toDate();
}
