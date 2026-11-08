import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
export const metadata: Metadata = {
  title: "বাজার দর | Bazar Dor",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Navbar />

        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#243329",
              border: "1px solid #e3eae3",
              borderRadius: "10px",
            },
            success: {
              iconTheme: {
                primary: "#008d42",
                secondary: "#ffffff",
              },
            },
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
