import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Especialistas en tecnología con atención personalizada en Argentina",
  description:
    "Vendemos iPhones, MacBooks y accesorios Apple importados. Atención por WhatsApp. Productos originales con precios accesibles.",
  keywords: [
    "iphone", "mac", "importar", "importado", "iphone baratos", "iphone usados",
    "tecnología", "cambio de iphone", "apple argentina", "macbook", "cámaras profesionales", "importaciones"
  ],
  authors: [{ name: "Wireless", url: "https://wireless.ar" }],
  creator: "Wireless",
  openGraph: {
    title: "Especialistas en tecnología con atención personalizada en Argentina",
    description:
      "Vendemos iPhones, MacBooks y accesorios Apple importados. Atención por WhatsApp. Productos originales con precios accesibles.",
    url: "https://wireless.ar",
    siteName: "Wireless",
    images: [
      {
        url: "/img/wireless.webp",
        width: 1200, // Ideal para Open Graph
        height: 630,
        alt: "Wireless - Apple importados en Argentina",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wireless",
    description:
      "iPhones, Macs y tecnología importada con atención personalizada. Consultas por WhatsApp.",
    creator: "@wireless.ar",
    images: ["/img/wireless.webp"],
  },
  metadataBase: new URL("https://wireless.ar"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.className}`}
      >
        {children}
      </body>
    </html>
  );
}
