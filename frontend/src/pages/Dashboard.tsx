import { Link, useLocation } from 'react-router-dom'
import {
  LogOut, MessageCircle, FileText, Search,
  ClipboardList, MapPin
} from 'lucide-react'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const location = useLocation()

  const menu = [
    { path: '/dashboard/chatbot', label: 'Chatbot', icon: MessageCircle },
    { path: '/dashboard/templates', label: 'Legal Templates', icon: FileText },
    { path: '/dashboard/analyzer', label: 'Document Analyzer', icon: ClipboardList },
    { path: '/dashboard/search', label: 'Document Search', icon: Search },
    { path: '/dashboard/tracker', label: 'Case Tracker', icon: ClipboardList },
    { path: '/dashboard/location', label: 'Location Services', icon: MapPin },
  ]

  return (
    <motion.div
      className="flex bg-gradient-to-r from-[#FFF5E1] via-[#E0C6AC] to-[#D6BFAA] text-[#2E2E2E] pt-16 min-h-screen"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      {/* Sidebar (not fixed) */}
      <aside className="w-64 bg-gradient-to-r from-[#FFF5E1] via-[#E0C6AC] to-[#D6BFAA] px-6 py-9 flex flex-col justify-between shadow-lg min-h-[calc(100vh-4rem)]">
        <div className="space-y-6">
          {/* <h2 className="text-2xl font-bold">JustiFy</h2> */}
          <nav className="space-y-4">
            {menu.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 p-2 rounded-xl transition-all group ${
                    isActive ? 'bg-[#14532D] text-white' : 'hover:bg-[#A7F3D0]'
                  }`}
                >
                  <Icon
                    size={18}
                    className={`transition-colors duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-[#2E2E2E] group-hover:text-[#14532D]'
                    }`}
                  />
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
        
      </aside>

      {/* Main content area */}
      <main className="flex-1 px-6 pt-8">
        <motion.div
          className="bg-[#FFFAF0] rounded-2xl shadow p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-xl font-semibold text-center">Welcome to your Dashboard</h1>
          <p className="text-sm text-gray-600 text-center">
            Manage all your legal tools in one place.
          </p>
        </motion.div>

        <motion.div
          className="bg-[#FFFAF0] rounded-2xl shadow p-80 mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-600">
          window.
        </p>
          {/* Routed child content via <Outlet /> */}
        </motion.div>

        {/* Footer */}
       
      </main>
    </motion.div>
  )
}

export default Dashboard
