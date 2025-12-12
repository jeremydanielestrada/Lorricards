import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/Index";
import { AuthProvider } from "./hooks/AuthContext";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
