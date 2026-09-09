import { Suspense, lazy } from "react";
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
import ForestQuiz from "./pages/Quiz.jsx";
import QuizResult from "./pages/QuizResult.jsx";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import Loader from "./components/Loader";

// Admin panel — code-split so public visitors never download it.
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const RequireAdmin = lazy(() => import("./admin/RequireAdmin"));
const Login = lazy(() => import("./admin/pages/Login"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const AgmReportsAdmin = lazy(() => import("./admin/pages/AgmReportsAdmin"));
const EMagazinesAdmin = lazy(() => import("./admin/pages/EMagazinesAdmin"));
const GalleryAdmin = lazy(() => import("./admin/pages/GalleryAdmin"));
const RegisterMembersAdmin = lazy(() => import("./admin/pages/RegisterMembersAdmin"));
const EventsAdmin = lazy(() => import("./admin/pages/EventsAdmin"));
const PostsAdmin = lazy(() => import("./admin/pages/PostsAdmin"));
const UsersAdmin = lazy(() => import("./admin/pages/UsersAdmin"));

function PublicSite() {
  return (
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
          <Route path="/quiz" element={<ForestQuiz />} />
          <Route path="/quiz/result" element={<QuizResult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Suspense fallback={<Loader fullScreen text="Loading..." />}>
            <Routes>
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminLayout />
                  </RequireAdmin>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="agm-reports" element={<AgmReportsAdmin />} />
                <Route path="e-magazines" element={<EMagazinesAdmin />} />
                <Route path="gallery" element={<GalleryAdmin />} />
                <Route path="members" element={<RegisterMembersAdmin />} />
                <Route path="events" element={<EventsAdmin />} />
                <Route path="posts" element={<PostsAdmin />} />
                <Route path="users" element={<UsersAdmin />} />
              </Route>
              <Route path="/*" element={<PublicSite />} />
            </Routes>
          </Suspense>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
