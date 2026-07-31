"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiSearch,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiLogOut,
  FiShield,
  FiEye,
  FiEyeOff,
  FiX,
  FiSave,
  FiAlertTriangle,
  FiBarChart2,
  FiAward,
  FiRefreshCw,
} from "react-icons/fi";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";

/* ─── Admin Credentials ──────────────────────────────────── */
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

/* ─── Grade helper ───────────────────────────────────────── */
function gradeColor(grade) {
  const map = {
    Excellent: "badge-excellent",
    "Very Good": "badge-very-good",
    Good: "badge-good",
    Pass: "badge-pass",
    Fail: "badge-fail",
  };
  return map[grade] || "badge-pass";
}

/* ─── Blank student template ─────────────────────────────── */
const BLANK_STUDENT = {
  id: "",
  password: "",
  name: "",
  phone: "",
  exam: "",
  score: "",
  total: 100,
  grade: "Good",
  message: "",
};

/* ────────────────────────────────────────────────────────── */
export default function AdminPage() {
  const router = useRouter();

  /* Auth state */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [authError, setAuthError] = useState("");

  /* Data state */
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataLoading, setDataLoading] = useState(false);

  /* Modal state */
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState(BLANK_STUDENT);
  const [formLoading, setFormLoading] = useState(false);

  /* Toast */
  const [toasts, setToasts] = useState([]);

  /* ── Toast helpers ── */
  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      4000,
    );
  }, []);

  /* ── Fetch students from API ── */
  const fetchStudents = useCallback(async () => {
    setDataLoading(true);
    try {
      const res = await fetch("/api/students?admin=true");
      const json = await res.json();
      if (json.success) {
        setStudents(json.data);
        setFiltered(json.data);
      }
    } catch {
      addToast("فشل تحميل بيانات الطلاب", "error");
    } finally {
      setDataLoading(false);
    }
  }, [addToast]);

  /* ── Load students when admin logs in ── */
  useEffect(() => {
    if (isLoggedIn) {
      fetchStudents();
    }
  }, [isLoggedIn, fetchStudents]);

  /* ── Filter by search query ── */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFiltered(students);
      return;
    }
    const q = searchQuery.toLowerCase();
    setFiltered(
      students.filter(
        (s) =>
          s.id.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.exam.toLowerCase().includes(q),
      ),
    );
  }, [searchQuery, students]);

  /* ── Admin Login ── */
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setAuthError("");
    } else {
      setAuthError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  /* ── Add Student ── */
  const handleAdd = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        addToast("تم إضافة الطالب بنجاح ✓", "success");
        setShowAddModal(false);
        setFormData(BLANK_STUDENT);
        fetchStudents();
      } else {
        addToast(json.error || "فشل إضافة الطالب", "error");
      }
    } catch {
      addToast("خطأ في الاتصال بالخادم", "error");
    } finally {
      setFormLoading(false);
    }
  };

  /* ── Edit Student ── */
  const handleEdit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch(`/api/students/${selectedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        addToast("تم تعديل بيانات الطالب بنجاح ✓", "success");
        setShowEditModal(false);
        fetchStudents();
      } else {
        addToast(json.error || "فشل تعديل الطالب", "error");
      }
    } catch {
      addToast("خطأ في الاتصال بالخادم", "error");
    } finally {
      setFormLoading(false);
    }
  };

  /* ── Delete Student ── */
  const handleDelete = async () => {
    setFormLoading(true);
    try {
      const res = await fetch(`/api/students/${selectedStudent.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        addToast("تم حذف الطالب بنجاح", "success");
        setShowDeleteModal(false);
        fetchStudents();
      } else {
        addToast(json.error || "فشل حذف الطالب", "error");
      }
    } catch {
      addToast("خطأ في الاتصال بالخادم", "error");
    } finally {
      setFormLoading(false);
    }
  };

  /* ── Open Edit Modal ── */
  const openEdit = (student) => {
    setSelectedStudent(student);
    setFormData({ ...student });
    setShowEditModal(true);
  };

  /* ── Open Delete Modal ── */
  const openDelete = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  /* ── Statistics ── */
  const stats = {
    total: students.length,
    excellent: students.filter((s) => s.grade === "Excellent").length,
    avgScore: students.length
      ? Math.round(
          students.reduce((sum, s) => sum + (s.score / s.total) * 100, 0) /
            students.length,
        )
      : 0,
    highestScore: students.length
      ? Math.max(...students.map((s) => Math.round((s.score / s.total) * 100)))
      : 0,
  };

  /* ─────────────────── ADMIN LOGIN SCREEN ─────────────────── */
  if (!isLoggedIn) {
    return (
      <div className="bg-gradient-radial min-h-screen flex items-center justify-center px-4">
        <div
          className="orb orb-purple"
          style={{ width: 500, height: 500, top: "-10%", right: "-10%" }}
        />
        <div
          className="orb orb-blue"
          style={{ width: 400, height: 400, bottom: "-10%", left: "-5%" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong p-8 w-full max-w-sm relative z-10"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <FiShield className="text-white text-2xl" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-white mb-1 font-arabic">
            لوحة التحكم
          </h1>
          <p className="text-slate-400 text-center text-sm mb-8 font-arabic">
            يرجى تسجيل الدخول للمتابعة
          </p>

          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 font-arabic">
                اسم المستخدم
              </label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-glass"
                placeholder="admin"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 font-arabic">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glass pr-12"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 font-arabic"
              >
                <FiAlertTriangle className="flex-shrink-0" />
                {authError}
              </motion.div>
            )}

            <button type="submit" className="btn-primary w-full font-arabic">
              <FiShield />
              تسجيل الدخول
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6 font-arabic">
            هذه الصفحة للمشرفين فقط
          </p>
        </motion.div>
      </div>
    );
  }

  /* ─────────────────── ADMIN DASHBOARD ───────────────────── */
  return (
    <div className="bg-gradient-radial min-h-screen font-arabic" dir="rtl">
      <div
        className="orb orb-blue"
        style={{ width: 500, height: 500, top: "-10%", left: "-5%" }}
      />
      <div
        className="orb orb-purple"
        style={{ width: 400, height: 400, bottom: "5%", right: "-5%" }}
      />

      {/* Toast Container */}
      <Toast toasts={toasts} />

      {/* ── Header ── */}
      <header className="border-b border-white/10 bg-navy-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <FiShield className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">
                لوحة التحكم
              </h1>
              <p className="text-slate-400 text-xs">Student Result System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="admin-refresh"
              onClick={fetchStudents}
              className="btn-ghost py-2 px-3 text-sm"
              title="تحديث البيانات"
            >
              <FiRefreshCw
                size={16}
                className={dataLoading ? "animate-spin" : ""}
              />
            </button>
            <button
              id="admin-logout"
              onClick={() => setIsLoggedIn(false)}
              className="btn-ghost py-2 px-4 text-sm text-red-400 border-red-500/30 hover:bg-red-500/10"
            >
              <FiLogOut size={16} />
              خروج
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "إجمالي الطلاب",
              value: stats.total,
              icon: FiUsers,
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "تقدير ممتاز",
              value: stats.excellent,
              icon: FiAward,
              color: "from-yellow-500 to-orange-500",
            },
            {
              label: "متوسط الدرجات",
              value: `${stats.avgScore}%`,
              icon: FiBarChart2,
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "أعلى درجة",
              value: `${stats.highestScore}%`,
              icon: FiBarChart2,
              color: "from-emerald-500 to-teal-500",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}
              >
                <stat.icon className="text-white text-lg" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Actions Bar ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="admin-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالاسم أو الرقم أو الامتحان..."
              className="input-glass pr-12 w-full"
            />
          </div>

          {/* Add Button */}
          <button
            id="admin-add-btn"
            onClick={() => {
              setFormData(BLANK_STUDENT);
              setShowAddModal(true);
            }}
            className="btn-primary whitespace-nowrap"
          >
            <FiPlus />
            إضافة طالب
          </button>
        </div>

        {/* ── Students Table ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card overflow-hidden"
        >
          {dataLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loading message="جاري تحميل البيانات..." />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <FiUsers size={48} className="mb-4 opacity-30" />
              <p className="text-lg font-arabic">لا يوجد طلاب مطابقون</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>رقم الطالب</th>
                    <th>الاسم</th>
                    <th>الامتحان</th>
                    <th>الدرجة</th>
                    <th>النسبة</th>
                    <th>التقدير</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((student, i) => {
                      const pct = Math.round(
                        (student.score / student.total) * 100,
                      );
                      return (
                        <motion.tr
                          key={student.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <td>
                            <span className="font-mono text-blue-400 font-bold">
                              {student.id}
                            </span>
                          </td>
                          <td className="font-arabic font-medium">
                            {student.name}
                          </td>
                          <td className="font-arabic text-slate-300 text-sm max-w-[180px] truncate">
                            {student.exam}
                          </td>
                          <td className="font-mono">
                            {student.score}/{student.total}
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 min-w-[60px]">
                                <ProgressBar
                                  value={pct}
                                  size="sm"
                                  showLabel={false}
                                />
                              </div>
                              <span className="text-sm font-bold text-white">
                                {pct}%
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className={gradeColor(student.grade)}>
                              {student.grade}
                            </span>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <button
                                id={`edit-${student.id}`}
                                onClick={() => openEdit(student)}
                                className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/15 transition-colors"
                                title="تعديل"
                              >
                                <FiEdit3 size={15} />
                              </button>
                              <button
                                id={`delete-${student.id}`}
                                onClick={() => openDelete(student)}
                                className="p-2 rounded-lg text-red-400 hover:bg-red-500/15 transition-colors"
                                title="حذف"
                              >
                                <FiTrash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        <p className="text-center text-slate-500 text-xs mt-4 font-arabic">
          إجمالي: {filtered.length} طالب
        </p>
      </main>

      {/* ── Add / Edit Modal ── */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <StudentFormModal
            title={showAddModal ? "إضافة طالب جديد" : "تعديل بيانات الطالب"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={showAddModal ? handleAdd : handleEdit}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
            }}
            loading={formLoading}
            isEdit={showEditModal}
          />
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation Modal ── */}
      <AnimatePresence>
        {showDeleteModal && selectedStudent && (
          <Modal title="تأكيد الحذف" onClose={() => setShowDeleteModal(false)}>
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
                <FiAlertTriangle className="text-red-400 text-2xl" />
              </div>
              <p className="text-white font-arabic text-lg mb-2">
                هل تريد حذف الطالب؟
              </p>
              <p className="text-slate-400 font-arabic text-sm mb-6">
                <strong className="text-white">{selectedStudent.name}</strong> —
                رقم {selectedStudent.id}
              </p>
              <p className="text-red-400 text-xs mb-6 font-arabic">
                لا يمكن التراجع عن هذا الإجراء.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn-ghost"
                  disabled={formLoading}
                >
                  إلغاء
                </button>
                <button
                  id="confirm-delete"
                  onClick={handleDelete}
                  className="btn-danger"
                  disabled={formLoading}
                >
                  {formLoading ? "جاري الحذف..." : "حذف نهائي"}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Student Form Modal Component ───────────────────────── */
function StudentFormModal({
  title,
  formData,
  setFormData,
  onSubmit,
  onClose,
  loading,
  isEdit,
}) {
  const grades = ["Excellent", "Very Good", "Good", "Pass", "Fail"];

  return (
    <Modal title={title} onClose={onClose} wide>
      <form onSubmit={onSubmit} className="space-y-4 mt-2">
        <div className="grid grid-cols-2 gap-4">
          {/* ID */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 font-arabic">
              رقم الطالب *
            </label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="input-glass"
              placeholder="250001"
              required
              disabled={isEdit}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 font-arabic">
              كلمة المرور *
            </label>
            <input
              type="text"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="input-glass"
              placeholder="1234"
              required
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5 font-arabic">
            اسم الطالب *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-glass rtl font-arabic"
            placeholder="محمد أحمد"
            required
            dir="rtl"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5 font-arabic">
            رقم الهاتف
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="input-glass"
            placeholder="01000000000"
            dir="ltr"
          />
        </div>

        {/* Exam */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5 font-arabic">
            اسم الامتحان / الكورس *
          </label>
          <input
            type="text"
            value={formData.exam}
            onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
            className="input-glass rtl font-arabic"
            placeholder="الكورس التأسيسي لمادة البرمجة"
            required
            dir="rtl"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Score */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 font-arabic">
              الدرجة *
            </label>
            <input
              type="number"
              value={formData.score}
              onChange={(e) =>
                setFormData({ ...formData, score: e.target.value })
              }
              className="input-glass"
              placeholder="95"
              min={0}
              max={formData.total}
              required
            />
          </div>

          {/* Total */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5 font-arabic">
              الدرجة الكلية *
            </label>
            <input
              type="number"
              value={formData.total}
              onChange={(e) =>
                setFormData({ ...formData, total: e.target.value })
              }
              className="input-glass"
              placeholder="100"
              min={1}
              required
            />
          </div>
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5 font-arabic">
            التقدير *
          </label>
          <select
            value={formData.grade}
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value })
            }
            className="input-glass"
            required
          >
            {grades.map((g) => (
              <option key={g} value={g} style={{ background: "#0a1628" }}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5 font-arabic">
            رسالة تحفيزية
          </label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="input-glass rtl font-arabic"
            placeholder="مبروك 👏 أنت من أفضل طلاب الكورس."
            rows={2}
            dir="rtl"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost flex-1"
            disabled={loading}
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
            disabled={loading}
          >
            <FiSave />
            {loading
              ? "جاري الحفظ..."
              : isEdit
                ? "حفظ التعديلات"
                : "إضافة الطالب"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
