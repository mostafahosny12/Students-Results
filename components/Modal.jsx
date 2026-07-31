'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

/**
 * Modal Component
 * Animated modal dialog with backdrop blur overlay.
 *
 * @param {string} title - Modal title (Arabic supported)
 * @param {function} onClose - Called when close button or backdrop is clicked
 * @param {boolean} wide - Uses wider modal box (default: false)
 * @param {ReactNode} children - Modal body content
 */
export default function Modal({ title, onClose, wide = false, children }) {
  /* Lock body scroll when modal is open */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* Close on Escape key */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="modal-box"
        style={{ maxWidth: wide ? 600 : 480 }}
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white font-arabic">{title}</h2>
          <button
            id="modal-close"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Body */}
        {children}
      </motion.div>
    </motion.div>
  );
}
