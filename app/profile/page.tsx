'use client';
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, allowedRoutes } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-10">
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-24 w-24 rounded-full bg-white/30 flex items-center justify-center">
                <span className="text-4xl text-white">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : ''}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{user.displayName}</h1>
              </div>
            </motion.div>
          </div>

          {/* Profile Details */}
          <div className="px-8 py-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Email */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-2 text-lg text-gray-900">{user.email}</p>
              </div>

              {/* Member Since */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                <p className="mt-2 text-lg text-gray-900">
                  {new Date(user.metadata.creationTime || '').toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </motion.div>

            {/* Allowed Routes */}
            <motion.div 
              className="mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Access Permissions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {allowedRoutes.map((route, index) => (
                  <motion.div
                    key={index}
                    className="bg-blue-50 px-4 py-2 rounded-lg text-blue-700"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {route}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
