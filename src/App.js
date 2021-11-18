import { BrowserRouter } from "react-router-dom";
import GlobalController from "./controllers/GlobalController";
import Router from "./router";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App text-white montserrat" style={{ backgroundColor: "#111", minHeight: "100vh" }}>
      <Provider store={store}>
        <GlobalController>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </GlobalController>
      </Provider>
    </div>
  );
}

export default App;
