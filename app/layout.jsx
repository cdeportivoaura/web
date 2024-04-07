import { Inter } from "next/font/google";
import "./main.scss"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Club Deportivo AURA",
  description: "Página web del club deportivo cerro tololo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
