import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CategoryProvider } from "@/context/CategoryContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Octopus E-Commerce",
  description: "E-Commerce Case",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${poppins.variable} font-sans`}
    >
      <body>
        <AuthProvider>
          <CategoryProvider>
            <main>
              <CartProvider>{children}</CartProvider>
            </main>
          </CategoryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
