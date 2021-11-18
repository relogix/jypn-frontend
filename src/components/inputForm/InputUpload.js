import { memo } from "react";
import { Controller } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";
import { FaFileUpload } from "react-icons/fa";
import { Uploader } from "rsuite";

const InputUpload = ({ className = "", validation = {}, form, style = {}, allowExtensions = null, ...props }) => {
  const error = form.formState.errors[props?.name]?.message || "";

  const validateExtension = (files) => {
    if (!allowExtensions) return true;

    let allow = true;
    files?.map((file) => {
      const extension = file.name.match(/\.([^\.]+)$/i)[1];
      if (!allowExtensions.includes(extension)) {
        allow = false;
      }
    });

    if (!allow) {
      alert(`File should be one of these type(s): ${allowExtensions?.join(", ")}`);
    }

    return allow;
  };

  return (
    <div className="my-2 w-full">
      <Controller
        name={props?.name}
        control={form.control}
        rules={validation}
        defaultValue={props?.defaultValue}
        render={({ field }) => (
          <Uploader {...field} shouldQueueUpdate={validateExtension} autoUpload={false} {...props}>
            <div
              style={{
                backgroundColor: "#ffffff10",
                width: "100%",

                color: "white",
                border: error ? "1px dashed red" : "1px solid gray",
                ...style,
              }}
            >
              <div className="w-full flex justify-center items-center text-xs">
                <FaFileUpload className="mr-3 text-gray-400" />
                {props?.label} {allowExtensions && `(${allowExtensions?.join(", ")})`}
              </div>
            </div>
          </Uploader>
        )}
      />

      {error && (
        <div className="text-red-400 text-xs flex items-center gap-x-1 mt-1">
          <AiOutlineWarning />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default memo(InputUpload);
