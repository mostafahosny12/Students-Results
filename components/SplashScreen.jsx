'use client';

import { motion } from 'framer-motion';

/**
 * SplashScreen Component
 * Full-screen animated splash with gradient background,
 * animated logo, loading dots, and branding text.
 */
export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #030712 0%, #0a1628 30%, #0f2042 60%, #1a3460 100%)',
      }}
    >
      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(29,108,232,0.2), transparent)',
          top: '-20%',
          left: '-10%',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.2), transparent)',
          bottom: '-15%',
          right: '-8%',
          filter: 'blur(60px)',
        }}
      />

      {/* Mesh grid overlay */}
      <div className="absolute inset-0 mesh-bg opacity-40" />

      {/* ── Logo Container ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-10"
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: -16,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: 'rgba(29,108,232,0.8)',
            borderRightColor: 'rgba(6,182,212,0.6)',
          }}
        />

        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: -6,
            borderRadius: '50%',
            border: '1px solid transparent',
            borderTopColor: 'rgba(139,92,246,0.6)',
            borderLeftColor: 'rgba(59,130,246,0.4)',
          }}
        />

        {/* Logo circle */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 30px rgba(29,108,232,0.4)',
              '0 0 60px rgba(29,108,232,0.7)',
              '0 0 30px rgba(29,108,232,0.4)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1d6ce8, #3b82f6, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: 44, lineHeight: 1 }}>🎓</span>
        </motion.div>
      </motion.div>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-3"
      >
        <h1
          className="text-4xl md:text-5xl font-black mb-2 font-arabic"
          style={{
            background: 'linear-gradient(135deg, #60a5fa, #06b6d4, #93c5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Student Result System
        </h1>
        <p className="text-slate-400 text-lg font-arabic tracking-wide">
          نظام نتائج الطلاب
        </p>
      </motion.div>

      {/* ── Divider ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          width: 200,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(29,108,232,0.6), transparent)',
          margin: '1.5rem 0',
        }}
      />

      {/* ── Powered By ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="text-center mb-10"
      >
        <p className="text-slate-500 text-sm font-arabic mb-1">Powered By</p>
        <p
          className="text-xl font-bold font-arabic"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Eng. Mostafa Hosny
        </p>
      </motion.div>

      {/* ── Loading Dots ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="splash-dots flex items-center gap-3"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{
              scale: [0.6, 1, 0.6],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: ['#3b82f6', '#06b6d4', '#8b5cf6'][i],
            }}
          />
        ))}
      </motion.div>

      {/* ── Bottom tagline ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 text-slate-600 text-xs font-arabic"
      >
        جاري التحميل...
      </motion.p>
    </div>
  );
}
