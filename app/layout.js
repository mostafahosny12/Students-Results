import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://اسم-الموقع.vercel.app"),

  title: {
    default: "نتائج الطلاب | Eng. Mostafa Hosny",
    template: "%s | نتائج الطلاب",
  },

  description: "منصة نتائج الطلاب - اعرف نتيجتك بسهولة وأمان مع م/ مصطفى حسنى.",

  keywords: [
    "نتائج الطلاب",
    "Student Results",
    "Exam Results",
    "Programming",
    "AI",
    "Eng. Mostafa Hosny",
  ],

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    title: "نتائج الطلاب | Eng. Mostafa Hosny",
    description: "اعرف نتيجتك بسهولة وأمان.",
    url: "https://اسم-الموقع.vercel.app",
    siteName: "Student Results",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Student Results",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "نتائج الطلاب",
    description: "اعرف نتيجتك بسهولة وأمان.",
    images: ["/logo.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-main mesh-bg antialiased">{children}</body>
    </html>
  );
}
