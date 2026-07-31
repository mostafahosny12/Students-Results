'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiImage } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function CertificateCard({ student }) {
  const router = useRouter();
  const certRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [zoom, setZoom] = useState(1);

  const percentage = Math.round((student.score / student.total) * 100);

  const today = new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  /* ── Grade Arabic Label ── */
  const gradeArabic = {
    Excellent: 'إمتياز',
    'Very Good': 'جيد جداً',
    Good: 'جيد',
    Pass: 'مقبول',
    Fail: 'راسب',
  }[student.grade] || student.grade;

  /* ── Calculate zoom based on screen size ── */
  useEffect(() => {
    const calculateZoom = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const certWidth = 1123;
      const certHeight = 794;

      // Calculate zoom to fit in viewport with minimal padding
      const paddingX = 20;
      const paddingY = 100; // Reduced padding for buttons

      const widthZoom = (windowWidth - paddingX * 2) / certWidth;
      const heightZoom = (windowHeight - paddingY) / certHeight;

      let newZoom = Math.min(widthZoom, heightZoom, 1);
      newZoom = Math.max(newZoom, 0.25);

      setZoom(newZoom);
    };

    calculateZoom();
    window.addEventListener('resize', calculateZoom);
    return () => window.removeEventListener('resize', calculateZoom);
  }, []);

  /* ── Download as PNG Image ── */
  const handleDownloadImage = async () => {
    setPdfLoading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;

      const clone = certRef.current.cloneNode(true);

      clone.style.position = "fixed";
      clone.style.left = "-99999px";
      clone.style.top = "0";

      clone.style.zoom = 1;
      clone.style.width = "1123px";
      clone.style.height = "794px";

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#fffbf0",
        width: 1123,
        height: 794,
      });

      document.body.removeChild(clone);
      const link = document.createElement('a');
      link.download = `certificate-${student.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Certificate download failed:', err);
      alert('حدث خطأ أثناء تحميل الشهادة. يرجى المحاولة مرة أخرى.');
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* ── Action Buttons ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 no-print" dir="rtl">
        <button
          onClick={() => router.back()}
          className="btn-ghost font-arabic text-sm sm:text-base"
        >
          <FiArrowRight />
          رجوع للنتيجة
        </button>

        <div className="flex gap-2 sm:gap-3">
          <button
            id="btn-download-cert"
            onClick={handleDownloadImage}
            disabled={pdfLoading}
            className="btn-primary font-arabic text-sm sm:text-base"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
            }}
          >
            <FiImage />
            {pdfLoading ? 'جاري التحميل...' : 'تحميل صورة'}
          </button>
        </div>
      </div>

      {/* ── Certificate Container with Zoom ── */}
      <div
        className="w-full flex justify-center items-center"
        style={{
          overflow: 'hidden',
          padding: '5px 0',
          minHeight: 'calc(100vh - 120px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '1123px',
            height: '794px',
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            flexShrink: 0,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              width: '1123px',
              height: '794px',
              flexShrink: 0,
            }}
          >
            <div
              ref={certRef}
              dir="rtl"
              style={{
                background: 'linear-gradient(145deg, #fffbf0 0%, #fff8e1 50%, #fffde7 100%)',
                color: '#1a1a2e',
                fontFamily: "'Cairo', serif",
                borderRadius: '1.5rem',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                width: '1123px',
                height: '794px',
                boxSizing: 'border-box',
              }}
            >
              {/* ── Outer gold border frame ── */}
              <div style={{
                position: 'absolute',
                inset: 10,
                border: '3px solid #daa520',
                borderRadius: '1rem',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                inset: 16,
                border: '1px solid rgba(218,165,32,0.5)',
                borderRadius: '0.75rem',
                pointerEvents: 'none',
              }} />

              {/* ── Corner Ornaments ── */}
              {['top-6 right-6', 'top-6 left-6', 'bottom-6 right-6', 'bottom-6 left-6'].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    [pos.includes('top') ? 'top' : 'bottom']: 24,
                    [pos.includes('right') ? 'right' : 'left']: 24,
                    width: 40,
                    height: 40,
                    opacity: 0.6,
                    fontSize: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#b8860b',
                  }}
                >
                  ✦
                </div>
              ))}

              {/* ── Watermark ── */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.03,
                fontSize: 180,
                fontWeight: 900,
                pointerEvents: 'none',
                color: '#b8860b',
                userSelect: 'none',
              }}>
                🎓
              </div>

              {/* ── Certificate Content ── */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                {/* Header */}
                <div>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
                  <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    color: '#1a1a2e',
                    marginBottom: 4,
                  }}>
                    شهادة تقدير
                  </h1>
                  <div style={{
                    width: 120,
                    height: 3,
                    background: 'linear-gradient(90deg, transparent, #daa520, transparent)',
                    margin: '0.5rem auto',
                  }} />
                </div>

                {/* Body */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: '#374151',
                    marginBottom: '1rem',
                    lineHeight: 1.8,
                  }}>
                    يَسُر  م/ مصطفى حسنى منح هذه الشهادة إلى الطالبة
                  </p>

                  <div
                    style={{
                      width: '80%',
                      maxWidth: '700px',
                      margin: '0 auto 1rem',
                      padding: '0.5rem 2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '2.8rem',
                        fontWeight: 700,
                        color: '#92400e',
                        lineHeight: 1.6,
                        textAlign: 'center',
                        margin: 0,
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal',
                      }}
                    >
                      {student.name}
                    </h2>
                  </div>

                  <p style={{
                    fontSize: '1.6rem',
                    color: '#374151',
                    marginBottom: '0.5rem',
                    lineHeight: 1.8,
                    fontWeight: 700,
                    padding: '0 1rem',
                  }}>
                    وذلك لحضورها الكورس التأسيسى لمادة البرمجة والذكاء الإصطناعى وإجتيازها الإمتحان الخاص بالمادة
                  </p>

                  {/* Grade Row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                  }}>
                    <span style={{
                      fontSize: '2.8rem',
                      fontWeight: 900,
                      color: '#1a1a2e',
                      lineHeight: 1.8,
                    }}>
                      بتقدير عام
                    </span>

                    <span style={{
                      fontSize: '2.8rem',
                      fontWeight: 900,
                      color: "#92400e",
                      lineHeight: 1.8,
                      display: 'inline-block',
                    }}>
                      {gradeArabic}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div>
                  {/* Divider */}
                  <div style={{
                    width: '80%',
                    maxWidth: 400,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(218,165,32,0.5), transparent)',
                    margin: '0 auto 1rem',
                  }} />

                  {/* Footer: Date + Signature */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    padding: '0 1rem',
                  }}>
                    {/* Date */}
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#9ca3af', marginBottom: 4 }}>
                        التاريخ
                      </p>
                      <p style={{ fontSize: '1rem', fontWeight: 900, color: '#374151' }}>
                        {today}
                      </p>
                    </div>

                    {/* Signature */}
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#9ca3af', marginBottom: 2 }}>
                        التوقيع
                      </p>
                      <p style={{ fontSize: '1rem', fontWeight: 900, color: '#374151' }}>
                        م/ مصطفى حسنى
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}