"use client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/config/routes";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch"; // Assuming you're using shadcn/ui
import { Search } from "lucide-react"; // Import from lucide-react or your preferred icon library

interface User {
  id: string;
  email: string;
  allowedRoutes: string[];
}

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersData = usersSnapshot.docs
          .map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as User)
          )
          .filter((u) => u.id !== user?.uid);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  const handleRouteToggle = async (
    userId: string,
    route: string,
    currentRoutes: string[]
  ) => {
    const updatedRoutes = currentRoutes.includes(route)
      ? currentRoutes.filter((r) => r !== route)
      : [...currentRoutes, route];

    try {
      await updateDoc(doc(db, "users", userId), {
        allowedRoutes: updatedRoutes,
      });

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, allowedRoutes: updatedRoutes } : user
        )
      );
    } catch (error) {
      console.error("Error updating routes:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute allowedRoutes={["/admin"]}>
      <motion.div 
        className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <motion.h1 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              User Access Management
            </motion.h1>
            <p className="text-gray-600">Manage user permissions and route access</p>
          </div>

          {/* Search Bar */}
          <motion.div 
            className="mb-6 relative"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>

          {/* Users Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid gap-6">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{user.email}</h3>
                          <p className="text-sm text-gray-500">User ID: {user.id.slice(0, 8)}...</p>
                        </div>
                        <span className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full">
                          {user.allowedRoutes?.length || 0} Routes
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ROUTES.PROTECTED.map((route) => (
                          <div
                            key={route.path}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">{route.name}</span>
                              <span className="text-sm text-gray-500">{route.path}</span>
                            </div>
                            <Switch
                              checked={user.allowedRoutes?.includes(route.path)}
                              onCheckedChange={() =>
                                handleRouteToggle(
                                  user.id,
                                  route.path,
                                  user.allowedRoutes || []
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </ProtectedRoute>
  );
}
