import { Italiana } from "next/font/google";
import "./globals.css";

const italiana = Italiana({
  variable: "--font-italiana",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ilsa Hampton - Portfolio",  // Updated from default
  description: "Artist, Army Veteran, and Software Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={italiana.variable}>
        {children}
      </body>
    </html>
  );
}


