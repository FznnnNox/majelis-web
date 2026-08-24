import AboutUs from "@/components/AboutUs";
import FacilitiesSection from "@/components/FacilitiesSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import Hero from "@/components/Hero";
import LearnMajelis from "@/components/LearnMajelis";
import PrayerTime from "@/components/PrayerTime";
import ProgramsSection from "@/components/ProgramsSection";
import WelcomeSection from "@/components/WelcomeSection";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <PrayerTime />
      <LearnMajelis />
      <WelcomeSection />
      <ProgramsSection />
      <GallerySection />
      <FacilitiesSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
