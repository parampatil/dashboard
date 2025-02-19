"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(pathname);

  if (loading) {
    return (
      <motion.div 
        className="h-16 bg-background border-b"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.5 }}
      />
    );
  }

  const navItems = !user ? [
    { path: "/login", name: "Login" }
  ] : [
    { path: "/dashboard", name: "Dashboard" },
    ...(user.email === "admin@example.com" ? [{ path: "/admin", name: "Admin" }] : []),
    { path: "/profile", name: "Profile" }
  ];

  return (
    <motion.nav 
      className="sticky top-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto h-full flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/" className="font-semibold text-lg">
            Dashboard
          </Link>
        </motion.div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-secondary/50 p-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <motion.div
                  onMouseOver={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath(pathname)}
                  className="relative px-3 py-2 rounded-md"
                >
                  <span className={`relative z-10 ${
                    pathname === item.path ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {item.name}
                  </span>
                  
                  {item.path === hoveredPath && (
                    <motion.div
                      className="absolute inset-0 bg-secondary rounded-md -z-0"
                      layoutId="navbar-hover"
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        stiffness: 130,
                        damping: 12,
                        duration: 0.3
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {user && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                onClick={signOut}
                className="ml-2"
              >
                Logout
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
