// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import {
//   FiUser, FiFileText, FiStar, FiAward, FiBarChart2,
//   FiDownload, FiLogOut, FiExternalLink, FiHash, FiMessageSquare
// } from 'react-icons/fi';
// import ProgressBar from '@/components/ProgressBar';
// import Button from '@/components/Button';

// /* ─── Grade helpers ──────────────────────────────────────── */
// const GRADE_CONFIG = {
//   Excellent: {
//     color: '#f59e0b',
//     bg: 'rgba(245,158,11,0.12)',
//     border: 'rgba(245,158,11,0.3)',
//     gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
//     label: 'ممتاز',
//     emoji: '🏆',
//   },
//   'Very Good': {
//     color: '#3b82f6',
//     bg: 'rgba(59,130,246,0.12)',
//     border: 'rgba(59,130,246,0.3)',
//     gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
//     label: 'جيد جداً',
//     emoji: '⭐',
//   },
//   Good: {
//     color: '#10b981',
//     bg: 'rgba(16,185,129,0.12)',
//     border: 'rgba(16,185,129,0.3)',
//     gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
//     label: 'جيد',
//     emoji: '✅',
//   },
//   Pass: {
//     color: '#64748b',
//     bg: 'rgba(100,116,139,0.12)',
//     border: 'rgba(100,116,139,0.3)',
//     gradient: 'linear-gradient(135deg, #64748b, #475569)',
//     label: 'مقبول',
//     emoji: '📘',
//   },
//   Fail: {
//     color: '#ef4444',
//     bg: 'rgba(239,68,68,0.12)',
//     border: 'rgba(239,68,68,0.3)',
//     gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
//     label: 'راسب',
//     emoji: '📕',
//   },
// };

// /**
//  * ResultCard Component
//  * Displays the full student result with animated stats,
//  * progress bar, grade badge, confetti for high scorers,
//  * and action buttons (certificate, PDF, logout).
//  */
// export default function ResultCard({ student }) {
//   const router = useRouter();
//   const cardRef = useRef(null);
//   const [confettiShown, setConfettiShown] = useState(false);
//   const [pdfLoading, setPdfLoading] = useState(false);

//   const percentage = Math.round((student.score / student.total) * 100);
//   const grade = GRADE_CONFIG[student.grade] || GRADE_CONFIG.Pass;

//   /* ── Launch confetti if score >= 95 ── */
//   useEffect(() => {
//     if (percentage >= 95 && !confettiShown) {
//       setConfettiShown(true);
//       import('canvas-confetti').then(({ default: confetti }) => {
//         // First burst
//         confetti({
//           particleCount: 120,
//           spread: 80,
//           origin: { y: 0.55 },
//           colors: ['#1d6ce8', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'],
//         });
//         // Second burst after delay
//         setTimeout(() => {
//           confetti({
//             particleCount: 80,
//             spread: 100,
//             angle: 60,
//             origin: { x: 0, y: 0.6 },
//           });
//           confetti({
//             particleCount: 80,
//             spread: 100,
//             angle: 120,
//             origin: { x: 1, y: 0.6 },
//           });
//         }, 500);
//       });
//     }
//   }, [percentage, confettiShown]);

//   /* ── Download PDF ── */
//   const handleDownloadPDF = async () => {
//     setPdfLoading(true);
//     try {
//       const html2canvas = (await import('html2canvas')).default;
//       const jsPDF = (await import('jspdf')).default;

//       const canvas = await html2canvas(cardRef.current, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: '#0a1628',
//         logging: false,
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: 'a4',
//       });

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
//       pdf.save(`result-${student.id}.pdf`);
//     } catch (err) {
//       console.error('PDF generation failed:', err);
//     } finally {
//       setPdfLoading(false);
//     }
//   };

//   /* ── Logout ── */
//   const handleLogout = () => {
//     localStorage.removeItem('currentStudent');
//     router.replace('/login');
//   };

//   /* ── Container animation variants ── */
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-6"
//     >
//       {/* ── Main Result Card ── */}
//       <motion.div
//         ref={cardRef}
//         variants={itemVariants}
//         className="glass-card overflow-hidden"
//       >
//         {/* Colored top stripe based on grade */}
//         <div
//           style={{
//             height: 6,
//             background: grade.gradient,
//           }}
//         />

//         <div className="p-6 md:p-8">
//           {/* ── Header: Name + Grade Badge ── */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8" dir="rtl">
//             <div>
//               <p className="text-slate-400 text-sm font-arabic mb-1">مرحباً بك،</p>
//               <h2
//                 className="text-2xl md:text-3xl font-bold text-white font-arabic"
//                 style={{ direction: 'rtl' }}
//               >
//                 {student.name}
//               </h2>
//               {/* {student.phone && (
//                 <p className="text-slate-500 text-sm mt-1 font-arabic">📱 {student.phone}</p>
//               )} */}
//             </div>

//             {/* Grade badge */}
//             <motion.div
//               initial={{ scale: 0, rotate: -10 }}
//               animate={{ scale: 1, rotate: 0 }}
//               transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 }}
//               className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl"
//               style={{ background: grade.bg, border: `1px solid ${grade.border}` }}
//             >
//               <span className="text-3xl">{grade.emoji}</span>
//               <span
//                 className="text-sm font-bold font-arabic"
//                 style={{ color: grade.color }}
//               >
//                 {grade.label}
//               </span>
//               <span
//                 className="text-xs text-slate-400 font-arabic"
//               >
//                 {student.grade}
//               </span>
//             </motion.div>
//           </div>

//           {/* ── Exam Name ── */}
//           <motion.div
//             variants={itemVariants}
//             className="flex items-center gap-3 mb-6 p-4 rounded-xl"
//             style={{
//               background: 'rgba(29,108,232,0.08)',
//               border: '1px solid rgba(29,108,232,0.2)',
//             }}
//             dir="rtl"
//           >
//             <FiFileText className="text-blue-400 flex-shrink-0" size={20} />
//             <div>
//               <p className="text-slate-400 text-xs font-arabic mb-0.5">الامتحان</p>
//               <p className="text-white font-semibold font-arabic text-base">{student.exam}</p>
//             </div>
//           </motion.div>

//           {/* ── Score Stats Grid ── */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//             {[
//               {
//                 label: 'الدرجة',
//                 value: student.score,
//                 icon: FiStar,
//                 color: '#f59e0b',
//                 suffix: '',
//               },
//               {
//                 label: 'الدرجة الكلية',
//                 value: student.total,
//                 icon: FiBarChart2,
//                 color: '#3b82f6',
//                 suffix: '',
//               },
//               {
//                 label: 'النسبة المئوية',
//                 value: percentage,
//                 icon: FiBarChart2,
//                 color: grade.color,
//                 suffix: '%',
//               },

//             ].map((stat, i) => (
//               <motion.div
//                 key={i}
//                 variants={itemVariants}
//                 className="stat-card text-center"
//               >
//                 <div
//                   className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
//                   style={{
//                     background: `${stat.color}20`,
//                     border: `1px solid ${stat.color}30`,
//                   }}
//                 >
//                   <stat.icon style={{ color: stat.color }} size={18} />
//                 </div>
//                 <div className="text-2xl font-black text-white mb-1">
//                   {stat.raw ? stat.value : (
//                     <motion.span
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.5 + i * 0.1 }}
//                     >
//                       {stat.value}{stat.suffix}
//                     </motion.span>
//                   )}
//                 </div>
//                 <div className="text-xs text-slate-400 font-arabic">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>

//           {/* ── Progress Bar ── */}
//           <motion.div variants={itemVariants} className="mb-6" dir="rtl">
//             <div className="flex justify-between items-center mb-3">
//               <span className="text-slate-300 text-sm font-arabic">مستوى الأداء</span>
//               <span
//                 className="text-lg font-black"
//                 style={{ color: grade.color }}
//               >
//                 {percentage}%
//               </span>
//             </div>
//             <ProgressBar value={percentage} color={grade.gradient} />
//           </motion.div>

//           {/* ── Personal Message ── */}
//           {student.message && (
//             <motion.div
//               variants={itemVariants}
//               className="flex items-start gap-3 p-5 rounded-2xl mb-2"
//               style={{
//                 background: `linear-gradient(135deg, ${grade.bg}, rgba(255,255,255,0.02))`,
//                 border: `1px solid ${grade.border}`,
//               }}
//               dir="rtl"
//             >
//               <FiMessageSquare
//                 style={{ color: grade.color }}
//                 className="flex-shrink-0 mt-0.5"
//                 size={20}
//               />
//               <p className="text-slate-200 font-arabic text-base leading-relaxed">
//                 {student.message}
//               </p>
//             </motion.div>
//           )}
//         </div>
//       </motion.div>

//       {/* ── Action Buttons ── */}
//       <motion.div
//         variants={itemVariants}
//         className="w-full"
//       >
//         {/* Certificate Button - Full Width */}
//         <button
//           id="btn-certificate"
//           onClick={() => router.push('/certificate')}
//           className="w-full flex items-center justify-center gap-4 py-5 px-6 rounded-2xl font-arabic font-bold text-white text-lg transition-all duration-300 relative overflow-hidden group"
//           style={{
//             background: 'linear-gradient(135deg, #daa520, #f59e0b, #b8860b)',
//             boxShadow: '0 4px 25px rgba(218,165,32,0.35)',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = 'scale(1.02)';
//             e.currentTarget.style.boxShadow = '0 8px 40px rgba(218,165,32,0.5)';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = 'scale(1)';
//             e.currentTarget.style.boxShadow = '0 4px 25px rgba(218,165,32,0.35)';
//           }}
//         >
//           {/* Shine effect */}
//           <div
//             className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
//             style={{
//               background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
//               transform: 'skewX(-20deg)',
//               animation: 'shine 2.5s infinite',
//             }}
//           />

//           <span className="text-3xl relative z-10">🎓</span>
//           <span className="relative z-10 text-xl">عرض الشهادة</span>
//           <FiAward size={24} className="relative z-10" />
//         </button>

//         {/* Add shine animation keyframes if not already in globals.css */}
//         <style jsx>{`
//           @keyframes shine {
//             0% {
//               transform: translateX(-100%) skewX(-20deg);
//             }
//             100% {
//               transform: translateX(200%) skewX(-20deg);
//             }
//           }
//         `}</style>
//       </motion.div>
//     </motion.div>
//   );
// }

'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FiUser, FiFileText, FiStar, FiAward, FiBarChart2,
  FiDownload, FiLogOut, FiExternalLink, FiHash, FiMessageSquare
} from 'react-icons/fi';
import ProgressBar from '@/components/ProgressBar';
import Button from '@/components/Button';

/* ─── Grade helpers ──────────────────────────────────────── */
const GRADE_CONFIG = {
  Excellent: {
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.3)',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    label: 'ممتاز',
    emoji: '🏆',
  },
  'Very Good': {
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.3)',
    gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    label: 'جيد جداً',
    emoji: '⭐',
  },
  Good: {
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.3)',
    gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
    label: 'جيد',
    emoji: '✅',
  },
  Pass: {
    color: '#64748b',
    bg: 'rgba(100,116,139,0.12)',
    border: 'rgba(100,116,139,0.3)',
    gradient: 'linear-gradient(135deg, #64748b, #475569)',
    label: 'مقبول',
    emoji: '📘',
  },
  Fail: {
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.3)',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    label: 'راسب',
    emoji: '📕',
  },
};

/**
 * ResultCard Component
 * Displays the full student result with animated stats,
 * progress bar, grade badge, confetti for high scorers,
 * and action buttons (certificate, PDF, logout).
 */
export default function ResultCard({ student }) {
  const router = useRouter();
  const cardRef = useRef(null);
  const [confettiShown, setConfettiShown] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const percentage = Math.round((student.score / student.total) * 100);
  const grade = GRADE_CONFIG[student.grade] || GRADE_CONFIG.Pass;

  /* ── Launch confetti if score >= 95 ── */
  useEffect(() => {
    if (percentage >= 95 && !confettiShown) {
      setConfettiShown(true);
      import('canvas-confetti').then(({ default: confetti }) => {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#1d6ce8', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 100,
            angle: 60,
            origin: { x: 0, y: 0.6 },
          });
          confetti({
            particleCount: 80,
            spread: 100,
            angle: 120,
            origin: { x: 1, y: 0.6 },
          });
        }, 500);
      });
    }
  }, [percentage, confettiShown]);

  /* ── Download PDF ── */
  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0a1628',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`result-${student.id}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setPdfLoading(false);
    }
  };

  /* ── Logout ── */
  const handleLogout = () => {
    localStorage.removeItem('currentStudent');
    router.replace('/login');
  };

  /* ── Container animation variants ── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden"
    >
      {/* ── Main Result Card ── */}
      <motion.div
        ref={cardRef}
        variants={itemVariants}
        className="glass-card overflow-hidden w-full"
      >
        {/* Colored top stripe based on grade */}
        <div
          style={{
            height: 6,
            background: grade.gradient,
          }}
        />

        <div className="p-4 sm:p-6 md:p-8 w-full">
          {/* ── Header: Name + Grade Badge ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8" dir="rtl">
            <div className="w-full sm:w-auto">
              <p className="text-slate-400 text-xs sm:text-sm font-arabic mb-1">مرحباً بك،</p>
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-arabic break-words"
                style={{ direction: 'rtl' }}
              >
                {student.name}
              </h2>
            </div>

            {/* Grade badge */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 }}
              className="flex flex-col items-center gap-0.5 px-3 sm:px-5 py-2 sm:py-3 rounded-2xl flex-shrink-0"
              style={{ background: grade.bg, border: `1px solid ${grade.border}` }}
            >
              <span className="text-2xl sm:text-3xl">{grade.emoji}</span>
              <span
                className="text-xs sm:text-sm font-bold font-arabic"
                style={{ color: grade.color }}
              >
                {grade.label}
              </span>
              <span
                className="text-[10px] sm:text-xs text-slate-400 font-arabic"
              >
                {student.grade}
              </span>
            </motion.div>
          </div>

          {/* ── Exam Name ── */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl w-full"
            style={{
              background: 'rgba(29,108,232,0.08)',
              border: '1px solid rgba(29,108,232,0.2)',
            }}
            dir="rtl"
          >
            <FiFileText className="text-blue-400 flex-shrink-0" size={18} />
            <div className="min-w-0 flex-1">
              <p className="text-slate-400 text-[10px] sm:text-xs font-arabic mb-0.5">الامتحان</p>
              <p className="text-white font-semibold font-arabic text-sm sm:text-base break-words">
                {student.exam}
              </p>
            </div>
          </motion.div>

          {/* ── Score Stats Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {[
              {
                label: 'الدرجة',
                value: student.score,
                icon: FiStar,
                color: '#f59e0b',
                suffix: '',
              },
              {
                label: 'الدرجة الكلية',
                value: student.total,
                icon: FiBarChart2,
                color: '#3b82f6',
                suffix: '',
              },
              {
                label: 'النسبة المئوية',
                value: percentage,
                icon: FiBarChart2,
                color: grade.color,
                suffix: '%',
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="stat-card text-center w-full"
                style={{
                  padding: '1rem 0.75rem',
                }}
              >
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3"
                  style={{
                    background: `${stat.color}20`,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <stat.icon style={{ color: stat.color }} size={16} />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white mb-0.5 sm:mb-1">
                  {stat.raw ? stat.value : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {stat.value}{stat.suffix}
                    </motion.span>
                  )}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-arabic">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* ── Progress Bar ── */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6 w-full" dir="rtl">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-slate-300 text-xs sm:text-sm font-arabic">مستوى الأداء</span>
              <span
                className="text-base sm:text-lg font-black"
                style={{ color: grade.color }}
              >
                {percentage}%
              </span>
            </div>
            <ProgressBar value={percentage} color={grade.gradient} />
          </motion.div>

          {/* ── Personal Message ── */}
          {student.message && (
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-2 sm:gap-3 p-3 sm:p-5 rounded-2xl mb-2 w-full"
              style={{
                background: `linear-gradient(135deg, ${grade.bg}, rgba(255,255,255,0.02))`,
                border: `1px solid ${grade.border}`,
              }}
              dir="rtl"
            >
              <FiMessageSquare
                style={{ color: grade.color }}
                className="flex-shrink-0 mt-0.5"
                size={16}
              />
              <p className="text-slate-200 font-arabic text-sm sm:text-base leading-relaxed break-words">
                {student.message}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ── Action Buttons ── */}
      <motion.div
        variants={itemVariants}
        className="w-full"
      >
        {/* Certificate Button - Full Width */}
        <button
          id="btn-certificate"
          onClick={() => router.push('/certificate')}
          className="w-full flex items-center justify-center gap-2 sm:gap-4 py-3.5 sm:py-5 px-4 sm:px-6 rounded-2xl font-arabic font-bold text-white text-base sm:text-lg transition-all duration-300 relative overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #daa520, #f59e0b, #b8860b)',
            boxShadow: '0 4px 25px rgba(218,165,32,0.35)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 40px rgba(218,165,32,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 25px rgba(218,165,32,0.35)';
          }}
        >
          {/* Shine effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
              transform: 'skewX(-20deg)',
              animation: 'shine 2.5s infinite',
            }}
          />

          <span className="text-2xl sm:text-3xl relative z-10">🎓</span>
          <span className="relative z-10 text-base sm:text-xl font-arabic">عرض الشهادة</span>
          <FiAward size={20} className="relative z-10" />
        </button>

        <style jsx>{`
          @keyframes shine {
            0% {
              transform: translateX(-100%) skewX(-20deg);
            }
            100% {
              transform: translateX(200%) skewX(-20deg);
            }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
}