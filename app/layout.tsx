export const dynamic = "force-dynamic";


import "../styles/globals.css";
import "../styles/tokens.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Honorarium",
  description: "Plataforma de vídeos sobre comercial aplicado à contabilidade",
  openGraph: { title: "Honorarium", description: "Aprenda comercial aplicado à contabilidade", type: "website" },
  robots: { index: true, follow: true }
};

import Providers from "./providers";
import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">

<body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1"><Providers><ClientLayout>{children}</ClientLayout></Providers></main>
        <Footer />
      </body>
    </html>
  );
}
