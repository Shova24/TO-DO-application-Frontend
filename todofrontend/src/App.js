import AppRoutes from "./Routes/AppRoutes";
import "./Styles/App.less";
import { ContextProvider } from "./Utils/UserContext";
function App() {
  return (
    <>
      <ContextProvider>
        <AppRoutes />
      </ContextProvider>
    </>
  );
}

export default App;
