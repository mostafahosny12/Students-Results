'use client';

import { motion } from 'framer-motion';

/**
 * Button Component
 * Reusable button with multiple variants, loading state, and icon support.
 *
 * @param {string} variant - 'primary' | 'ghost' | 'danger' | 'success'
 * @param {boolean} loading - Shows spinner when true
 * @param {ReactNode} icon - Icon element to display before children
 * @param {string} id - HTML id for the button
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Disables the button
 * @param {string} type - Button type (button|submit|reset)
 */
export default function Button({
  children,
  variant = 'primary',
  loading = false,
  icon,
  id,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  fullWidth = false,
}) {
  const variantClass = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    success: 'btn-success',
  }[variant] || 'btn-primary';

  return (
    <motion.button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      className={`${variantClass} ${fullWidth ? 'w-full' : ''} ${className} ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {/* Loading spinner */}
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 16,
            height: 16,
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
          }}
        />
      ) : icon}

      {children}
    </motion.button>
  );
}
