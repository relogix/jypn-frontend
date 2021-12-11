import MainRoutes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App montserrat">
      <ChakraProvider>
        <MainRoutes />
      </ChakraProvider>
    </div>
  );
}

export default App;
