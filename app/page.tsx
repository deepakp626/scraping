import Image from "next/image";
import HeroSection from "./homeComponents/HeroSection";
import Slider from "./components/Slider";
import FirecrawlFeatures from "./homeComponents/FireAnimation";
import IndustryTabSection from "./homeComponents/IndustryTabSection";
import TerminalAnimation from "./homeComponents/TerminalAnimation";
import ScrapingProcess from "./homeComponents/ScrapingProcess";
import CountSection from "./homeComponents/CountSection";
import ScrapingTechnology from "./homeComponents/ScrapingTechnology";

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen text-white">
      <HeroSection />
      <section className="z-20 relative mx-auto -mt-10 px-4 container">
        <Slider />
      </section>
      <FirecrawlFeatures />
      <IndustryTabSection />
      <TerminalAnimation />
      <ScrapingProcess />
      <ScrapingTechnology />
      <CountSection />
    </main>
  );
}
