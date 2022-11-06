import AppRoutes from "./Routes/AppRoutes";
import "./Styles/App.less";
import { TaskProvider } from "./Utils/TaskContext";
import { ContextProvider } from "./Utils/UserContext";
function App() {
  return (
    <>
      <ContextProvider>
        <TaskProvider>
          <AppRoutes />
        </TaskProvider>
      </ContextProvider>
    </>
  );
}

export default App;
