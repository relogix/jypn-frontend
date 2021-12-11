const DynamicComponent = ({ component, ...props }) => {
  const Comp = component;
  return <Comp {...props} />;
};

export default DynamicComponent;
