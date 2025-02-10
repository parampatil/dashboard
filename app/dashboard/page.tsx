// app/dashboard/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  if (!user) return router.push("/login");

  return (
    <div className="p-6">
      <h1 className="text-2xl">Welcome, {user.displayName || user.email}</h1>
      <button onClick={signOut} className="mt-4 bg-red-500 p-2 text-white">Logout</button>
    </div>
  );
};

export default Dashboard;
