import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taklif Pro — электронные пригласительные для тоев",
  description:
    "Красивые интерактивные пригласительные для тоев, сундет-тоев и семейных торжеств. RSVP в реальном времени, карта, музыка, обратный отсчёт.",
};

export const viewport: Viewport = {
  themeColor: "#c9a24b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
