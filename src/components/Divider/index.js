export const VerticalDivider = ({ className = "", children }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-1 h-1 bg-white rounded-full" />
        <div className="h-full bg-white" style={{ width: "1px" }} />
      </div>
      <div className="text-orient-vertical text-2xs mx-0 my-8" style={{ letterSpacing: "0.2rem" }}>
        {children}
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="h-full bg-white" style={{ width: "1px" }} />
        <div className="w-1 h-1 bg-white rounded-full" />
      </div>
    </div>
  );
};

const Divider = ({ className = "", children }) => {
  return (
    <div className={`flex ${className}`}>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-1 h-1 bg-white rounded-full" />
        <div className="w-full bg-white" style={{ height: "1px" }} />
      </div>
      <div className=" text-2xs mx-8 my-0 uppercase" style={{ letterSpacing: "0.2rem" }}>
        {children}
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className=" w-full bg-white" style={{ height: "1px" }} />
        <div className="w-1 h-1 bg-white rounded-full" />
      </div>
    </div>
  );
};

export default Divider;
