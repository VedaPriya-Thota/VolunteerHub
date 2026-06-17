import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "../components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="bg-gray-100 dark:bg-gray-950">

        <Providers>

          <Navbar />

          <Toaster
            position="top-right"
            reverseOrder={false}
          />

          {children}

          <Footer />

        </Providers>

      </body>
    </html>
  );
}