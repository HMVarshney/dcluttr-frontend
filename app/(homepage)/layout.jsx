import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { cn } from "@/lib/utils";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function HomePageLayout({ children }) {
  return (
    <main className={cn("w-full min-h-full", plusJakartaSans.className)}>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
