import React from "react";
import { LoadingIndicator } from "../loading_indicator";
import { AsyncState, matchAsyncState } from "../../utils/promise";

import styles from "./_styles.module.css";
import colors from "@/_themes/colors/colors";
import classNames from "classnames";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string;
  fillWidth?: boolean;
  showLoading?: boolean;
}

export const FilledButton: React.FC<Props> = ({
  color,
  label,
  onClick,
  disabled,
  fillWidth,
  showLoading,
  ...props
}: Props) => {
  const extra = {
    width: fillWidth ? "100%" : undefined,

    ...props.style,

    backgroundColor: disabled
      ? colors.disabled
      : props.style?.backgroundColor ?? colors.primary,
    color: disabled
      ? colors.onDisabled
      : props.style?.color ?? colors.onPrimary,
  };

  return (
    <button
      className={classNames(styles.button, styles.filled_button)}
      {...props}
      style={extra}
      disabled={disabled}
      onClick={onClick}
    >
      {showLoading && <LoadingIndicator color={extra.color} />}
      {!showLoading && label && (
        <p style={{ margin: 0, padding: 0 }}>{label}</p>
      )}
    </button>
  );
};

interface AsyncProps extends Props {
  data: AsyncState<any>;
}

export const AsyncFilledButton: React.FC<AsyncProps> = ({ ...props }) => {
  const showLoading = matchAsyncState(props.data, {
    onLoading: () => true,
    otherwise: () => false,
  });
  const disabled =
    props.disabled ??
    matchAsyncState(props.data, {
      onInitial: () => false,
      onError: () => false,
      onLoading: () => true,
      onSuccess: (d) => d === undefined,
      otherwise: () => false,
    });

  return (
    <FilledButton {...props} showLoading={showLoading} disabled={disabled} />
  );
};
