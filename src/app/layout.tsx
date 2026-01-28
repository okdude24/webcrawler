import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "خزنده وب - موتور جستجوی هوشمند",
  description: "موتور جستجوی فارسی با پشتیبانی از زبان فارسی و نتایج هوشمند از سراسر اینترنت",
  keywords: ["جستجو", "موتور جستجو", "خزنده وب", "هوش مصنوعی", "فارسی", "Iran"],
  authors: [{ name: "Z.ai Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "خزنده وب - موتور جستجوی هوشمند",
    description: "موتور جستجوی فارسی با پشتیبانی از زبان فارسی",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "خزنده وب - موتور جستجوی هوشمند",
    description: "موتور جستجوی فارسی با پشتیبانی از زبان فارسی",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
