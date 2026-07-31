'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiLogOut, FiShield, FiUser } from 'react-icons/fi';

/**
 * Navbar Component
 * Responsive navigation bar with glassmorphism effect.
 * Shows student name if logged in, and optional admin + logout buttons.
 */
export default function Navbar({ student, showPrint }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('currentStudent');
    router.replace('/login');
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 no-print"
      style={{
        background: 'rgba(10, 22, 40, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* ── Logo / Brand ── */}
        <Link href="/" id="nav-logo">
          <motion.div
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{
                background: 'linear-gradient(135deg, #1d6ce8, #06b6d4)',
                boxShadow: '0 4px 15px rgba(29,108,232,0.4)',
              }}
            >
              🎓
            </div>
            <div>
              <span
                className="text-white font-bold text-sm leading-none block"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Student Result
              </span>
              <span className="text-slate-500 text-xs font-arabic">نظام النتائج</span>
            </div>
          </motion.div>
        </Link>

        {/* ── Right side actions ── */}
        <div className="flex items-center gap-3">
          {/* Show student name if logged in */}
          {student && (
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{
                background: 'rgba(29,108,232,0.1)',
                border: '1px solid rgba(29,108,232,0.2)',
              }}
            >
              <FiUser size={14} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-arabic font-medium">
                {student.name}
              </span>
            </div>
          )}

          {/* Admin link (only when no student is logged in) */}
          {!student && (
            <Link href="/admin" id="nav-admin-link">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-ghost py-2 px-4 text-sm font-arabic"
              >
                <FiShield size={14} />
                إدارة
              </motion.button>
            </Link>
          )}

          {/* Logout button when student is logged in */}
          {student && (
            <motion.button
              id="nav-logout"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="btn-ghost py-2 px-4 text-sm font-arabic text-red-400"
              style={{ borderColor: 'rgba(239,68,68,0.3)' }}
            >
              <FiLogOut size={14} />
              خروج
            </motion.button>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
