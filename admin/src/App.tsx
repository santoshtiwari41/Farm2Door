import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Sidebar from "./components/sidebar";

import {
  Customer,
  Customers,
  Dashboard,
  Distributer,
  Distributers,
  Home,
  Orders,
} from "./pages";

function App() {
  return (
    <div>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/distributers" element={<Distributers />} />
            <Route path="/distributers/:id" element={<Distributer />} />
            <Route path="*" element={<h1>NOT FOUND</h1>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
