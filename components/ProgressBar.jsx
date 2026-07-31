'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ProgressBar Component
 * Animated progress bar with gradient fill and shimmer effect.
 *
 * @param {number} value - Percentage value 0-100
 * @param {string} color - CSS gradient string or color for the fill
 * @param {string} size - 'sm' | 'md' | 'lg' (bar height)
 * @param {boolean} showLabel - Show percentage label above bar
 * @param {boolean} animated - Animate fill on mount
 */
export default function ProgressBar({
  value = 0,
  color,
  size = 'md',
  showLabel = true,
  animated = true,
}) {
  const [width, setWidth] = useState(0);
  const clamped = Math.min(100, Math.max(0, value));

  /* Trigger fill animation after mount */
  useEffect(() => {
    const timer = setTimeout(() => setWidth(clamped), 150);
    return () => clearTimeout(timer);
  }, [clamped]);

  /* Dynamic gradient based on score */
  const getGradient = () => {
    if (color) return color;
    if (clamped >= 90) return 'linear-gradient(90deg, #f59e0b, #ef4444)';
    if (clamped >= 75) return 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
    if (clamped >= 60) return 'linear-gradient(90deg, #10b981, #06b6d4)';
    if (clamped >= 50) return 'linear-gradient(90deg, #64748b, #475569)';
    return 'linear-gradient(90deg, #ef4444, #dc2626)';
  };

  const heights = { sm: 6, md: 10, lg: 14 };
  const height = heights[size] || 10;

  return (
    <div>
      {/* Progress track */}
      <div
        className="progress-track"
        style={{ height }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Fill */}
        <div
          className="progress-fill"
          style={{
            width: animated ? `${width}%` : `${clamped}%`,
            background: getGradient(),
            transition: animated ? 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        />
      </div>
    </div>
  );
}
