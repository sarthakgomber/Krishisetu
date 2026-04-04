import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import LanguageModal from "@/components/layout/LanguageModal";

export const metadata = {
  title: "KrishiSetu — Farm to Table, Directly",
  description: "Connect directly with farmers. Fresh produce at fair prices, no middlemen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pt-16">
        <LanguageProvider>
          <AuthProvider>
            <LanguageModal />
            <Navbar />
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}