import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/Index";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
