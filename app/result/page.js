"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResultCard from "@/components/ResultCard";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";

export default function ResultPage() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read student data from localStorage (set during login)
    const stored = localStorage.getItem("currentStudent");
    if (!stored) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setStudent(parsed);
    } catch {
      router.replace("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return <Loading fullScreen message="جاري تحميل النتيجة..." />;
  }

  if (!student) return null;

  return (
    <div className="bg-gradient-radial min-h-screen flex flex-col">
      {/* Decorative background orbs */}
      <div
        className=" hidden md:block orb orb-blue"
        style={{
          width: 320,
          height: 320,
          top: -120,
          left: -120,
        }}
      />
      <div
        className="hidden md:block orb orb-purple"
        style={{
          width: 260,
          height: 260,
          bottom: -80,
          right: -80,
        }}
      />

      <Navbar student={student} />

      <main className="flex-1 flex items-center justify-center px-4 py-16 relative z-10 overflow-hidden">
        {" "}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <ResultCard student={student} />
        </motion.div>
      </main>
    </div>
  );
}
