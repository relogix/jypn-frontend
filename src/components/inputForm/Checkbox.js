import { memo } from "react";
import { Controller } from "react-hook-form";
import { Checkbox as RCheckBox } from "rsuite";

const Checkbox = ({ className, control, validation = {}, form, children, ...props }) => {
  return (
    <>
      <Controller
        name={props.name || ""}
        control={form.control}
        rules={validation}
        defaultValue={false}
        render={({ field }) => (
          <RCheckBox
            className={`${className}`}
            {...props}
            {...field}
            checked={props?.value}
            onChange={(_, value) => form.setValue(props?.name, value)}
          >
            {children}
          </RCheckBox>
        )}
      />
    </>
  );
};

export default memo(Checkbox);
