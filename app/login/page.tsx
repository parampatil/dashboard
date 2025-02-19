// app/login/page.tsx
"use client";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <Button 
        onClick={handleGoogleLogin} 
        className="w-full max-w-sm"
      >
        Login with Google
      </Button>
    </motion.div>
  );
};

export default LoginPage;
