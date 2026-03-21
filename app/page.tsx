import Image from "next/image";
import HeroSection from "./homeComponents/HeroSection";
import Slider from "./components/Slider";
import FirecrawlFeatures from "./homeComponents/FireAnimation";
import IndustryTabSection from "./homeComponents/IndustryTabSection";
import TerminalAnimation from "./homeComponents/TerminalAnimation";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <HeroSection />
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <Slider />
      </section>
      <FirecrawlFeatures />
      <IndustryTabSection />
      <TerminalAnimation />
    </main>
  );
}
