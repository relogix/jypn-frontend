import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

const Alert = ({ title, caption = "", status = "default" }) => {
  const statusColor = {
    SUCCESS: "green",
    ERROR: "red",
    DEFAULT: "gray",
  };
  const statusIcon = {
    SUCCESS: BsCheckCircleFill,
    ERROR: BsXCircleFill,
    DEFAULT: () => "",
  };

  const color = statusColor[status.toUpperCase()];
  const Icon = statusIcon[status.toUpperCase()];

  return (
    <div
      className={`bg-${color}-50 bg-opacity-90 p-4 rounded-md text-${color}-500 flex items-center gap-x-2`}
      style={{ boxShadow: "2px 2px 10px solid #333" }}
    >
      <Icon className="text-lg font-bold" />
      <span>
        <b>{title}</b> {caption}
      </span>
    </div>
  );
};

export default Alert;
