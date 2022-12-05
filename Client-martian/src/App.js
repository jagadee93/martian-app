import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Home from "./pages/Home";
import GenerateSchedule from "./pages/schedule";
import AddRation from "./pages/AddRation";
import Inventory from "./pages/Inventory";
import "./styles/App.css";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addration" element={<AddRation />} />
        <Route path="/schedule" element={<GenerateSchedule />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Layout>
  );
}

export default App;
