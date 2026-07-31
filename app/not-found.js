'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiArrowRight } from 'react-icons/fi';

/**
 * Custom 404 Not Found page with animated design.
 */
export default function NotFound() {
  return (
    <div className="bg-gradient-radial min-h-screen flex items-center justify-center px-4">
      {/* Background orbs */}
      <div className="orb orb-blue" style={{ width: 400, height: 400, top: '-5%', left: '-5%' }} />
      <div className="orb orb-purple" style={{ width: 350, height: 350, bottom: '5%', right: '-5%' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-10"
      >
        {/* Animated 404 Number */}
        <motion.div
          animate={{
            textShadow: [
              '0 0 40px rgba(29,108,232,0.5)',
              '0 0 80px rgba(29,108,232,0.8)',
              '0 0 40px rgba(29,108,232,0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[140px] md:text-[200px] font-black leading-none gradient-text select-none"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          404
        </motion.div>

        {/* Floating decorative elements */}
        <div className="relative -mt-8 mb-8">
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl mb-4"
          >
            🔍
          </motion.div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-arabic">
          الصفحة غير موجودة
        </h1>
        <p className="text-slate-400 text-lg mb-10 font-arabic max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login" id="go-login-404">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary font-arabic"
            >
              <FiArrowRight />
              الذهاب لتسجيل الدخول
            </motion.button>
          </Link>

          <Link href="/admin" id="go-admin-404">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ghost font-arabic"
            >
              <FiHome />
              لوحة التحكم
            </motion.button>
          </Link>
        </div>

        {/* Decorative grid lines */}
        <div className="mt-16 flex items-center justify-center gap-2 opacity-30">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
              className="w-1 h-8 rounded-full bg-blue-400"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
