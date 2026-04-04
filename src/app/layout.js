import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "KrishiSetu — Farm to Table, Directly",
  description: "Connect directly with farmers. Fresh produce at fair prices, no middlemen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body pt-16>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
