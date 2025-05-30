import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/providers/auth";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/footer";
import { ModalProvider } from "@/providers/modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Controle - Sistema de gerenciamento",
  description: "Gerencie clientes e atendimentos de forma fácil!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <AuthProvider>
          <ModalProvider>
            <div className="shadow-sm bg-white">
              <Header />
            </div>
            {children}
            <div className="shadow-[0_-1px_2px_0_rgba(0,0,0,0.1)] bg-white">
              <Footer />
            </div>
            <Toaster />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
