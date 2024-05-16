import React from "react";
import * as Form from "@radix-ui/react-form";
import * as formStyles from "./index.styles";

export const FormLabel = React.forwardRef<
  HTMLLabelElement,
  Form.FormLabelProps
>(({ ...props }, forwardedRef) => {
  return (
    <Form.Label
      {...props}
      style={formStyles.label}
      ref={forwardedRef}
    ></Form.Label>
  );
});
FormLabel.displayName = "FormLabel";

export const FormInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, forwardedRef) => {
  const { children, ...otherProps } = props;
  return (
    <input
      required
      {...otherProps}
      style={{ ...formStyles.input, ...otherProps.style }}
      ref={forwardedRef}
    />
  );
});
FormInput.displayName = "FormInput";

export const FormControl = React.forwardRef<
  HTMLInputElement,
  Form.FormControlProps
>(({ ...props }, forwardedRef) => {
  return (
    <Form.Control
      {...props}
      style={formStyles.control}
      ref={forwardedRef}
    ></Form.Control>
  );
});
FormControl.displayName = "FormControl";

export const FormLabelInputWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, forwardedRef) => {
  return (
    <div
      ref={forwardedRef}
      style={formStyles.labelInputContainer}
      {...props}
    ></div>
  );
});
FormLabelInputWrapper.displayName = "FormLabelInputWrapper";

export const FormField = React.forwardRef<
  HTMLInputElement,
  Form.FormFieldProps
>(({ ...props }, forwardedRef) => {
  return (
    <Form.Field
      {...props}
      style={formStyles.field}
      ref={forwardedRef}
    ></Form.Field>
  );
});
FormField.displayName = "FormField";

export const FormMessage = React.forwardRef<
  HTMLSpanElement,
  Form.FormMessageProps
>(({ ...props }, forwardedRef) => {
  return (
    <Form.Message
      match="valueMissing"
      {...props}
      style={formStyles.message}
      ref={forwardedRef}
    ></Form.Message>
  );
});
FormMessage.displayName = "FormMessage";

export const FormRoot = React.forwardRef<HTMLFormElement, Form.FormProps>(
  ({ ...props }, forwardedRef) => {
    return (
      <Form.Root
        {...props}
        style={formStyles.root}
        ref={forwardedRef}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      ></Form.Root>
    );
  },
);
FormRoot.displayName = "FormRoot";

export const FormSubmit = React.forwardRef<
  HTMLButtonElement,
  Form.FormSubmitProps
>(({ ...props }, forwardedRef) => {
  return <Form.Submit {...props} ref={forwardedRef}></Form.Submit>;
});
FormSubmit.displayName = "FormSubmit";
