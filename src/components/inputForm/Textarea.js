import { memo } from "react";
import { AiOutlineWarning } from "react-icons/ai";

const Textarea = ({ className = "", validation = {}, form, ...props }) => {
  const error = form.formState.errors[props?.name]?.message || "";

  return (
    <div className="w-full my-2">
      <textarea
        className={`bg-white bg-opacity-10 outline-none w-full p-3 px-4 text-xs rounded-md ${
          error && "border-red-400 border-2"
        } ${className}`}
        {...form.register(props?.name || "", validation)}
        style={{ minHeight: "100px" }}
        {...props}
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

export default memo(Textarea);
