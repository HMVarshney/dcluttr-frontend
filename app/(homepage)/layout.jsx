import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";


export default function HomePageLayout({ children }) {
  return (
    <main className="w-full min-h-full">
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
