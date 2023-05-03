import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Heatmap from "./pages/heatmap";
import Home from "./pages/home";
import Vignettes from "./pages/vignettes";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/heatmap" element={<Heatmap />} />
        <Route path="/vignettes" element={<Vignettes />} />
      </Routes>
    </>
  );
}

export default App;
