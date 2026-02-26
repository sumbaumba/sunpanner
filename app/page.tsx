import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Technology from "@/components/Technology";
import Warranty from "@/components/Warranty";
import SocialProof from "@/components/SocialProof";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Technology />
      <Warranty />
      <SocialProof />
      <CTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
