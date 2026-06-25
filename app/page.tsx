import Hero from "../src/HeroSections/Hero";
import About from "../src/AboutSections/About";
import Trailer from "../src/TrailerSections/Trailer";
import DeepDiveSection from "../src/DiveSection/DeepDiveSection";
import Vikram from "../src/VikramSection/Vikram";
import Combat from "../src/CombatSection/Combat";
import Waitlist from "../src/WaitlistSection/Waitlist";
import Footer from "../src/FooterSection/Footer";

export default function Home() {
  return (
    <main className="w-full bg-[#0a0a0a]">
      {/* Sticky Hero Section */}
      <div className="sticky top-0 h-screen w-full z-0">
        <Hero />
      </div>

      {/* Overlapping Content Section */}
      <About />
      <Trailer />
      <DeepDiveSection />
      <Vikram />
      <Combat />
      <Waitlist />
      <Footer />
    </main>
  );
}

