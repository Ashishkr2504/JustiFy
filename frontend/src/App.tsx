import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ResetPassword from './pages/ResetPassword'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './dashboard/Chatbot'
import LegalTemplates from './dashboard/LegalTemplates'
import DocumentAnalyzer from './dashboard/DocumentAnalyzer'
import DocumentSearch from './dashboard/DocumentSearch'
import CaseTracker from './dashboard/CaseTracker'
import LocationServices from './dashboard/LocationServices'
import ScrollToTop from './utils/ScrollToTop' // ✅ Import the ScrollToTop component
import './index.css'
declare namespace JSX {
  interface Element extends React.ReactElement<any, any> {}
}


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => (
  <>
    <Dashboard />
    <div className="absolute left-64 right-0 top-24 p-4">
      <Outlet />
    </div>
  </>
)
const App = () => {
  return (
    <Router>
      <ScrollToTop /> {/* ✅ This ensures scroll to top on every route change */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
            {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="chatbot" element={<Chatbot />} />
              <Route path="templates" element={<LegalTemplates />} />
              <Route path="analyzer" element={<DocumentAnalyzer />} />
              <Route path="search" element={<DocumentSearch />} />
              <Route path="tracker" element={<CaseTracker />} />
              <Route path="location" element={<LocationServices />} />
            </Route>
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center min-h-screen">
                  <h1 className="text-4xl font-bold text-red-500">404</h1>
                  <p className="text-lg text-gray-700">Page Not Found</p>
                  <a href="/" className="mt-4 text-blue-500 hover:underline">
                    Go Back to Home
                  </a>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
