import { memo, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";

const InputPassword = ({ className = "", validation = {}, form, ...props }) => {
  const [type, setType] = useState("password");
  const handleShowPassword = () => {
    setType(type === "password" ? "text" : "password");
  };

  const error = form.formState.errors[props?.name]?.message;

  return (
    <div className="my-2 w-full">
      <div className="flex">
        <input
          className={`bg-white bg-opacity-10 outline-none w-full p-3 px-4 text-xs rounded-l-md ${
            error && "border-red-400 border-2"
          } ${className}`}
          type={type}
          {...form.register(props?.name || "", validation)}
          {...props}
        />
        <button type="button" className="bg-white bg-opacity-10 px-3 rounded-r-md" onClick={handleShowPassword}>
          {type === "password" ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
      </div>

      {error && (
        <div className="text-red-400 text-xs flex items-center gap-x-1 mt-1">
          <AiOutlineWarning />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default memo(InputPassword);
