'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn, FiAlertCircle } from 'react-icons/fi';

/**
 * LoginForm Component
 * Glassmorphism login card with ID + password fields.
 * On successful login, saves student to localStorage and redirects to /result.
 */
export default function LoginForm() {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!studentId.trim() || !password.trim()) {
      setError('يرجى إدخال رقم الطالب وكلمة المرور');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `/api/students/${encodeURIComponent(studentId)}?password=${encodeURIComponent(password)}`
      );
      const json = await res.json();

      if (json.success) {
        // Save student data to localStorage for session management
        localStorage.setItem('currentStudent', JSON.stringify(json.data));
        router.push('/result');
      } else {
        setError('رقم الطالب أو كلمة المرور غير صحيحة. حاول مرة أخرى.');
      }
    } catch {
      setError('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-strong p-8 md:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-5  rounded-2xl flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, #1d6ce8, #06b6d4)',
            boxShadow: '0 8px 32px rgba(29,108,232,0.4)',
          }}
        >
          <span style={{ fontSize: 36 }}>🎓</span>
          {/* Animated ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: -3,
              borderRadius: '18px',
              border: '2px solid transparent',
              borderTopColor: 'rgba(6,182,212,0.7)',
              borderRightColor: 'rgba(29,108,232,0.4)',
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-2 font-arabic"
        >
          Student Result System
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 text-sm font-arabic"
        >
          أدخل بياناتك للاطلاع على نتيجتك
        </motion.p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
        {/* Student ID */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <label
            htmlFor="student-id"
            className="block text-sm font-medium text-slate-300 mb-2 font-arabic"
          >
            رقم الطالب
          </label>
          <div className="relative">
            <FiUser
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              id="student-id"
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="input-glass pr-12 rtl font-arabic"
              placeholder="أدخل رقم الطالب"
              required
              autoComplete="username"
              disabled={loading}
              dir="ltr"
              style={{ textAlign: 'left' }}
            />
          </div>
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          <label
            htmlFor="student-password"
            className="block text-sm font-medium text-slate-300 mb-2 font-arabic"
          >
            كلمة المرور
          </label>
          <div className="relative">
            <FiLock
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              id="student-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass pr-12 pl-12"
              placeholder="••••••••"
              required
              autoComplete="current-password"
              disabled={loading}
              dir="ltr"
              style={{ textAlign: 'left' }}
            />
            <button
              type="button"
              id="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="flex items-center gap-3 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 font-arabic"
            >
              <FiAlertCircle className="flex-shrink-0" size={18} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <button
            id="login-submit"
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-base py-4 font-arabic mt-5"
            style={{ fontSize: '1rem' }}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: 18,
                    height: 18,
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                  }}
                />
                جاري التحقق...
              </>
            ) : (
              <>
                <FiLogIn size={18} />
                عرض النتيجة
              </>
            )}
          </button>
        </motion.div>
      </form>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center text-slate-500 text-xs mt-6 font-arabic"
      >
        للمشرفين:{' '}
        <a href="/admin" className="text-blue-400 hover:text-blue-300 transition-colors">
          لوحة التحكم
        </a>
      </motion.p>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn, FiAlertCircle } from 'react-icons/fi';

// /**
//  * LoginForm Component
//  * Glassmorphism login card with ID + password fields.
//  * On successful login, saves student to localStorage and redirects to /result.
//  */
// export default function LoginForm() {
//   const router = useRouter();
//   const [studentId, setStudentId] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!studentId.trim() || !password.trim()) {
//       setError('يرجى إدخال رقم الطالب وكلمة المرور');
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(
//         `/api/students/${encodeURIComponent(studentId)}?password=${encodeURIComponent(password)}`
//       );
//       const json = await res.json();

//       if (json.success) {
//         localStorage.setItem('currentStudent', JSON.stringify(json.data));
//         router.push('/result');
//       } else {
//         setError('رقم الطالب أو كلمة المرور غير صحيحة. حاول مرة أخرى.');
//       }
//     } catch {
//       setError('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto px-4 sm:px-6">
//       <div className="glass-strong p-6 sm:p-8 md:p-10 w-full">
//         {/* Header */}
//         <div className="text-center mb-6 sm:mb-8">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: 'spring', stiffness: 200, damping: 15 }}
//             className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5 rounded-2xl flex items-center justify-center relative"
//             style={{
//               background: 'linear-gradient(135deg, #1d6ce8, #06b6d4)',
//               boxShadow: '0 8px 32px rgba(29,108,232,0.4)',
//             }}
//           >
//             <span style={{ fontSize: 32 }} className="sm:text-[36px]">🎓</span>
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
//               style={{
//                 position: 'absolute',
//                 inset: -3,
//                 borderRadius: '18px',
//                 border: '2px solid transparent',
//                 borderTopColor: 'rgba(6,182,212,0.7)',
//                 borderRightColor: 'rgba(29,108,232,0.4)',
//               }}
//             />
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-2xl sm:text-3xl font-bold text-white mb-2 font-arabic"
//           >
//             Student Result System
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-slate-400 text-xs sm:text-sm font-arabic"
//           >
//             أدخل بياناتك للاطلاع على نتيجتك
//           </motion.p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" dir="rtl">
//           {/* Student ID */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.35 }}
//           >
//             <label
//               htmlFor="student-id"
//               className="block text-sm font-medium text-slate-300 mb-1.5 sm:mb-2 font-arabic"
//             >
//               رقم الطالب
//             </label>
//             <div className="relative">
//               <FiUser
//                 className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={18}
//               />
//               <input
//                 id="student-id"
//                 type="text"
//                 value={studentId}
//                 onChange={(e) => setStudentId(e.target.value)}
//                 className="input-glass pr-10 sm:pr-12 rtl font-arabic text-sm sm:text-base"
//                 placeholder="أدخل رقم الطالب"
//                 required
//                 autoComplete="username"
//                 disabled={loading}
//                 dir="ltr"
//                 style={{ textAlign: 'left' }}
//               />
//             </div>
//           </motion.div>

//           {/* Password */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.45 }}
//           >
//             <label
//               htmlFor="student-password"
//               className="block text-sm font-medium text-slate-300 mb-1.5 sm:mb-2 font-arabic"
//             >
//               كلمة المرور
//             </label>
//             <div className="relative">
//               <FiLock
//                 className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={18}
//               />
//               <input
//                 id="student-password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="input-glass pr-10 sm:pr-12 pl-10 sm:pl-12 text-sm sm:text-base"
//                 placeholder="••••••••"
//                 required
//                 autoComplete="current-password"
//                 disabled={loading}
//                 dir="ltr"
//                 style={{ textAlign: 'left' }}
//               />
//               <button
//                 type="button"
//                 id="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
//                 tabIndex={-1}
//               >
//                 {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//               </button>
//             </div>
//           </motion.div>

//           {/* Error Message */}
//           <AnimatePresence>
//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -8, height: 0 }}
//                 animate={{ opacity: 1, y: 0, height: 'auto' }}
//                 exit={{ opacity: 0, y: -8, height: 0 }}
//                 className="flex items-center gap-3 text-red-400 text-xs sm:text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 font-arabic"
//               >
//                 <FiAlertCircle className="flex-shrink-0" size={16} />
//                 <span>{error}</span>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Submit Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.55 }}
//             className="pt-2"
//           >
//             <button
//               id="login-submit"
//               type="submit"
//               disabled={loading}
//               className="btn-primary w-full text-sm sm:text-base py-3.5 sm:py-4 font-arabic"
//               style={{ fontSize: '1rem' }}
//             >
//               {loading ? (
//                 <>
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//                     style={{
//                       width: 18,
//                       height: 18,
//                       border: '2px solid rgba(255,255,255,0.3)',
//                       borderTopColor: 'white',
//                       borderRadius: '50%',
//                     }}
//                   />
//                   جاري التحقق...
//                 </>
//               ) : (
//                 <>
//                   <FiLogIn size={18} />
//                   عرض النتيجة
//                 </>
//               )}
//             </button>
//           </motion.div>
//         </form>

//         {/* Footer hint */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//           className="text-center text-slate-500 text-xs mt-6 font-arabic"
//         >
//           للمشرفين:{' '}
//           <a href="/admin" className="text-blue-400 hover:text-blue-300 transition-colors">
//             لوحة التحكم
//           </a>
//         </motion.p>
//       </div>
//     </div>
//   );
// }