import { Route, Routes } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import SalesModule from "./pages/SalesModule";
import Sidebar from "./components/Sidebar";
import Expenses from "./pages/Expenses";

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/salesmodule" element={<SalesModule/>} />
        <Route path="/expenses" element={<Expenses/>} />
      </Routes>
    </div>
  );
}

export default App;
