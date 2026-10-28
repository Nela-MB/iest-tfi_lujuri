import { Sacramento, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const sacramento = Sacramento({ weight: "400", subsets: ["latin"], variable: "--font-sacramento", display: "swap" });
const cormorant = Cormorant_Garamond({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-cormorant", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

export const metadata = {
  title: "LujUri Boutique · Ropa para toda la familia",
  description: "Catálogo online de ropa para mujer, hombre y niños. Armá tu pedido y envialo por WhatsApp.",
  icons: { icon: "/marca/favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sacramento.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
