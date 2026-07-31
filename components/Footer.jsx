'use client';

import { motion } from 'framer-motion';
import { FiHeart, FiCode, FiShield } from 'react-icons/fi';
import Link from 'next/link';

/**
 * Footer Component
 * Clean footer with branding, links, and credits.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="no-print mt-auto"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(3,7,18,0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: 'linear-gradient(135deg, #1d6ce8, #06b6d4)' }}
            >
              🎓
            </div>
            <div>
              <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Student Result System
              </p>
              <p className="text-slate-500 text-xs font-arabic">نظام نتائج الطلاب</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              id="footer-login-link"
              className="text-slate-400 hover:text-blue-400 transition-colors text-sm font-arabic"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/admin"
              id="footer-admin-link"
              className="text-slate-400 hover:text-blue-400 transition-colors text-sm font-arabic"
            >
              الإدارة
            </Link>
          </div>

          {/* Credits */}
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-arabic">
            <span>صُنع بـ</span>
            <FiHeart className="text-red-400" size={12} />
            <span>بواسطة</span>
            <span
              className="font-semibold"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Eng. Mostafa Hosny
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-6 pt-6 text-center text-slate-600 text-xs font-arabic"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          © {year} Student Result System. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
