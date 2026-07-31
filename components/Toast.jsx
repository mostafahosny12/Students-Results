'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiAlertTriangle,
} from 'react-icons/fi';

/**
 * Toast Component
 * Renders a stack of toast notifications in the top-right corner.
 * Each toast auto-dismisses after 4 seconds (managed by parent).
 *
 * @param {Array} toasts - Array of { id, message, type } objects
 */
export default function Toast({ toasts = [] }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      <AnimatePresence mode="sync">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 80, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`toast toast-${toast.type || 'info'}`}
          >
            <ToastIcon type={toast.type} />
            <span className="font-arabic text-sm">{toast.message}</span>

            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: 'linear' }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                transformOrigin: 'left',
                borderRadius: '0 0 0.875rem 0.875rem',
                background:
                  toast.type === 'success'
                    ? '#10b981'
                    : toast.type === 'error'
                    ? '#ef4444'
                    : '#3b82f6',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastIcon({ type }) {
  const iconProps = { size: 18, className: 'flex-shrink-0' };
  switch (type) {
    case 'success':
      return <FiCheckCircle {...iconProps} className="flex-shrink-0 text-emerald-400" />;
    case 'error':
      return <FiAlertCircle {...iconProps} className="flex-shrink-0 text-red-400" />;
    case 'warning':
      return <FiAlertTriangle {...iconProps} className="flex-shrink-0 text-yellow-400" />;
    default:
      return <FiInfo {...iconProps} className="flex-shrink-0 text-blue-400" />;
  }
}
