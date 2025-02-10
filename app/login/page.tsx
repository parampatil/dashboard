// app/login/page.tsx
"use client";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/dashboard");
  };

  const handleEmailLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/dashboard");
  };

  return (
    <motion.div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="mb-4" />
      <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="mb-4" />
      <Button onClick={handleEmailLogin} className="w-full mb-4">Login</Button>
      <Button onClick={handleGoogleLogin} className="w-full bg-blue-500">Login with Google</Button>
    </motion.div>
  );
};

export default LoginPage;
