import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Files from "./pages/Files";
import NotFound from "./pages/NotFound";
import OfficeBearers from "./pages/OfficeBearers";
import AGMReports from "./pages/AGMReports";
import EMagazines from "./pages/EMagazines";
import Members from "./pages/Members";
import AGMReportDetail from "./pages/AGMReportDetail";
import EMagazineDetail from "./pages/EMagazineDetail";
import Gallery from "./pages/Gallery";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/files" element={<Files />} />
            <Route path="/office-bearers" element={<OfficeBearers />} />
            <Route path="/agm-reports" element={<AGMReports />} />
            <Route path="/agm-reports/:id" element={<AGMReportDetail />} />
            <Route path="/e-magazines" element={<EMagazines />} />
            <Route path="/e-magazines/:id" element={<EMagazineDetail />} />
            <Route path="/members" element={<Members />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
