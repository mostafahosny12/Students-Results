"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="bg-gradient-radial min-h-screen flex flex-col">
      {/* Decorative background orbs */}
      <div
        className="hidden md:block orb orb-blue"
        style={{ width: 500, height: 500, top: "-10%", left: "-5%" }}
      />
      <div
        className="hidden md:block orb orb-purple"
        style={{ width: 260, height: 260, bottom: -80, right: -80 }}
      />
      <div
        className="hidden md:block orb orb-cyan"
        style={{
          width: 300,
          height: 300,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <LoginForm />
        </motion.div>
      </main>
    </div>
  );
}
