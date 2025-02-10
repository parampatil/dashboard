// app/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Next.js Firebase Auth</h1>
      {user ? (
        <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
      {role === "admin" && (
        <Button onClick={() => router.push("/admin")} className="mt-4">Admin Panel</Button>
      )}
    </div>
  );
}
