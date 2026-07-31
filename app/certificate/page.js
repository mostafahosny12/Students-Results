"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificateCard from "@/components/CertificateCard";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";

export default function CertificatePage() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    return <Loading fullScreen message="جاري تحميل الشهادة..." />;
  }

  if (!student) return null;

  return (
    <div className="bg-gradient-radial min-h-screen flex flex-col">
      <div
        className="hidden md: orb orb-gold"
        style={{
          width: 500,
          height: 500,
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.2), transparent)",
          filter: "blur(80px)",
          position: "absolute",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <Navbar student={student} showPrint />

      <main className="flex-1 px-4 py-10 relative z-10 no-print">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <CertificateCard student={student} />
        </motion.div>
      </main>
    </div>
  );
}
