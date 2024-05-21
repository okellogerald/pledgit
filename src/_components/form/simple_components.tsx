import { FilledButton } from "../buttons/filled_button";
import {
  FormControl,
  FormField,
  FormInput,
  FormLabel,
  FormLabelInputWrapper,
  FormMessage,
  FormSubmit,
} from ".";
import { CSSProperties } from "react";
import colors from "@/_themes/colors/colors";
import space from "@/_themes/space/space";

import "./index.css";

export interface SimpleFormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  messageIfEmpty?: string;
  fieldStyle?: CSSProperties;
}

export const SimpleFormField: React.FC<SimpleFormFieldProps> = ({
  label,
  messageIfEmpty,
  fieldStyle,
  ...props
}: SimpleFormFieldProps) => {
  const extra = {
    backgroundColor: colors.surface,

    ...fieldStyle,
  };

  return (
    <FormField key={props.id} name={props.id ?? ""}>
      <FormLabelInputWrapper>
        <FormLabel>{label}</FormLabel>
        <FormControl asChild onChange={props.onChange} style={extra}>
          <FormInput {...props} />
        </FormControl>
      </FormLabelInputWrapper>
      <FormMessage>{messageIfEmpty ?? "This field is required"}</FormMessage>
    </FormField>
  );
};

export interface SimpleUneditableFormFieldProps {
  value: string;
  label: string;
}

export const SimpleUneditableFormField: React.FC<
  SimpleUneditableFormFieldProps
> = (props) => {
  return (
    <FormField key={props.label} name={props.label}>
      <FormLabelInputWrapper>
        <FormLabel>{props.label}</FormLabel>
        <FormInput
          disabled={true}
          type={props.label}
          defaultValue={props.value}
        />
      </FormLabelInputWrapper>
    </FormField>
  );
};

interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  suffix?: React.ReactNode;
}

export const FormFieldInputWithSuffix: React.FC<SimpleInputProps> = ({
  label,
  suffix,
  ...props
}: SimpleInputProps) => {
  const extra = {
    width: "100%",

    display: "flex",
    gap: space.sm,
    alignItems: "center",
    backgroundColor: colors.surface,
    color: colors.onSurface,
    borderRadius: 10,
    padding: space.xs,

    ...props.style,
  };

  return (
    <FormField key={props.id} name={props.id ?? ""}>
      <FormLabelInputWrapper>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl
          asChild
          onChange={props.onChange}
          style={{
            display: "flex",
            gap: space.sm,
            width: "100%",
            alignItems: "center",
            borderRadius: 10,
            paddingRight: space.xs,
            backgroundColor:
              props.style?.backgroundColor ?? extra.backgroundColor,
          }}
        >
          <div>
            <input
              {...props}
              // {...stylex.props(form.input)}
              style={{
                borderWidth: 0,
                borderColor: "transparent",
                fontFamily: "inherit",
                border: "none",
                borderStyle: "none",
                fontWeight: 500,

                ...extra,
              }}
            />
            <div style={{ width: "fit-content" }}>{suffix && suffix}</div>
          </div>
        </FormControl>
      </FormLabelInputWrapper>
      <FormMessage></FormMessage>
    </FormField>
  );
};

export const SimpleInput: React.FC<SimpleInputProps> = ({
  label,
  suffix,
  ...props
}: SimpleInputProps) => {
  const extra = {
    display: "flex",
    gap: space.sm,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: props.style?.backgroundColor ?? colors.primaryContainer,
    color: colors.onPrimaryContainer,

    margin: 0,
    padding: 0,
    paddingRight: space.xs,

    borderRadius: 10,
  };

  return (
    <div style={extra}>
      <input
        {...props}
        style={{
          width: "100%",
          borderWidth: 0,
          borderColor: "transparent",
          backgroundColor: extra.backgroundColor,
          fontFamily: "inherit",
          border: "none",
          borderStyle: "none",
          fontWeight: 400,

          borderRadius: 10,

          padding: space.xs,
          margin: 0,
          marginRight: space.xs,

          ...props.style,
        }}
      />
      {suffix && suffix}
    </div>
  );
};

export const SimpleFormSubmit: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <FormSubmit asChild>
      <FilledButton
        style={{
          width: "100%",

          marginTop: space.md,
        }}
        label="Submit"
        onClick={onClick}
      />
    </FormSubmit>
  );
};
