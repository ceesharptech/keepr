import Hero from "@/sections/Hero/Hero";
import About from "@/sections/About/About";
import Features from "@/sections/Features/Features";
import KeeprInAction from "@/sections/KeeprInAction/KeeprInAction";
import Footer from "@/sections/Footer/Footer";

export default function LandingPage({isAuthenticated}: any) {
    
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      <Hero isAuthenticated={isAuthenticated}/>
      <About />
      <Features />
      <KeeprInAction />
      <Footer />
    </div>
  );
}
