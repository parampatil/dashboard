// app/admin/page.tsx
"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!loading && (!user || role !== "admin")) {
      router.push("/");
    }
  }, [user, role, loading]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  const updateRole = async (userId: string, newRole: string) => {
    await updateDoc(doc(db, "users", userId), { role: newRole });
    setUsers(users.map(user => (user.id === userId ? { ...user, role: newRole } : user)));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} className="flex justify-between border p-2 my-2">
            <span>{user.email} - {user.role}</span>
            <button onClick={() => updateRole(user.id, user.role === "admin" ? "user" : "admin")} className="bg-blue-500 p-2 text-white">
              Toggle Role
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
