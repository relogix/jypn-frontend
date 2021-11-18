const ContentHeader = ({ className = "", children, ...props }) => {
  return (
    <h2 className={`poppins font-medium text-xl md:text-2xl flex items-center ${className}`} {...props}>
      <span>{children}</span>
      <div className="hidden md:flex items-center flex-1 ">
        <div className="max-w-xs flex-1 ml-4 bg-red-100" style={{ height: "1px" }} />
        <div className="w-1 h-1 bg-white rounded-full" />
      </div>
    </h2>
  );
};

export default ContentHeader;
