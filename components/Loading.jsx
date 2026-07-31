'use client';

import { motion } from 'framer-motion';

/**
 * Loading Component
 * Animated loading indicator with optional full-screen mode and custom message.
 */
export default function Loading({ fullScreen = false, message = 'جاري التحميل...' }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-5">
      {/* Spinning logo */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#3b82f6',
            borderRightColor: '#06b6d4',
          }}
        />
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 8,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: '#8b5cf6',
            borderLeftColor: '#3b82f6',
          }}
        />
        {/* Center dot */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            }}
          />
        </div>
      </div>

      {/* Message */}
      <p className="text-slate-400 text-sm font-arabic font-medium">{message}</p>

      {/* Loading dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ scale: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: ['#3b82f6', '#06b6d4', '#8b5cf6'][i],
            }}
          />
        ))}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #030712, #0a1628)' }}
      >
        {content}
      </div>
    );
  }

  return content;
}

/**
 * LoadingSkeleton Component
 * Skeleton loader for result card.
 */
export function LoadingSkeleton() {
  return (
    <div className="glass-card p-8 space-y-6 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton h-8 w-48 rounded" />
        </div>
        <div className="skeleton h-20 w-20 rounded-2xl" />
      </div>

      <div className="skeleton h-16 w-full rounded-xl" />

      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-24 rounded-xl" />
        ))}
      </div>

      <div className="space-y-2">
        <div className="skeleton h-4 w-32 rounded" />
        <div className="skeleton h-3 w-full rounded" />
      </div>
    </div>
  );
}
