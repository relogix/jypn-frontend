import { Tooltip, Whisper } from "rsuite";
import { HiInformationCircle } from "react-icons/hi";
import { memo } from "react";

const InputGroup = ({ label, children, info = "", className = "", required = false }) => {
  return (
    <div className={`w-full grid grid-cols-4 gap-x-4 items-center ${className}`}>
      <div className=" font-semibold flex items-center">
        <p className="font-normal">
          {label} {required && <span className="text-red-400">*</span>}
        </p>
        {info && (
          <div className="flex-1">
            <Whisper placement="right" trigger="hover" speaker={<Tooltip>{info}</Tooltip>}>
              <HiInformationCircle className=" ml-2 text-gray-300" />
            </Whisper>
          </div>
        )}
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default memo(InputGroup);
