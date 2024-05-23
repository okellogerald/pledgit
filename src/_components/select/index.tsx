import React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import "./styles.css";
import { SelectItemProps } from "@radix-ui/react-select";
import { IoCheckmark } from "react-icons/io5";
import { RiArrowUpWideLine } from "react-icons/ri";
import { RiArrowDownWideLine } from "react-icons/ri";
import text from "@/_themes/text_sizes/text_sizes";
import colors from "@/_themes/colors/colors";

import styles from "../buttons/_styles.module.css";

export interface PledgitSelectItem {
  id: string;
  label: string;
}

export interface PledgitSelectGroup {
  id: string;
  label: string;
  items: PledgitSelectItem[];
}

export interface PledgitSelectProps {
  placeholder: string;
  value?: PledgitSelectItem;
  groups: PledgitSelectGroup[];
  onValueChanged: (id: string) => void;
}

const PledgitSelect: React.FC<PledgitSelectProps> = (props) => {
  return (
    <Select.Root onValueChange={props.onValueChanged} value={props.value?.id}>
      <Select.Trigger
        className={classnames("SelectTrigger", styles.outline_button)}
      >
        <Select.Value placeholder={props.placeholder} />
        <Select.Icon className="SelectIcon">
          <RiArrowDownWideLine />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <RiArrowUpWideLine />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            {props.groups.map((e) => (
              <div key={e.id}>
                {e.label !== props.groups[0].label && (
                  <Select.Separator className="SelectSeparator" />
                )}

                <Select.Group key={e.label}>
                  <Select.Label
                    className="SelectLabel"
                    style={{
                      fontSize: text.sm,
                      fontWeight: 500,

                      color: colors.text,
                    }}
                  >
                    {e.label}
                  </Select.Label>
                  {e.items.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.label}
                    </SelectItem>
                  ))}
                </Select.Group>
              </div>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <RiArrowDownWideLine />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef<any, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames("SelectItem", className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <IoCheckmark />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);
SelectItem.displayName = "SelectItem";

export default PledgitSelect;
