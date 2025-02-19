// app/dashboard/layout.tsx
"use client";
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";

const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, allowedRoutes, signOut } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navigation Sidebar */}
      <motion.nav 
        className="w-64 bg-white shadow-lg p-6 min-h-screen"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        {/* User Info Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {user ? (user.displayName || user.email) : 'Guest'}
          </h2>
          <p className="text-sm text-gray-500">Dashboard</p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          {ROUTES.PROTECTED.filter(route => allowedRoutes.includes(route.path)).map((route) => (
            <motion.div key={route.path} variants={linkVariants}>
              <Link href={route.path}>
            <div 
              className={`p-3 rounded-lg transition-colors ${
                
                  'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {route.name}
            </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Logout Button */}
        <motion.button 
          onClick={signOut} 
          className="mt-8 w-full bg-red-500 p-2 text-white rounded hover:bg-red-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </motion.nav>

      {/* Main Content */}
      <motion.main 
        className="flex-1 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default DashboardLayout;
