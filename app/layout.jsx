import { Mulish } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/lib/store/ReduxProvider";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata = {
  title: "Dcluttr",
  description: "Dcluttr: Take better decisions with all your data at one place"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
