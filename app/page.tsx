import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/global/Navbar";
import Preloader from "@/components/global/Preloader";
import CustomCursor from "@/components/global/CustomCursor";
import ScrollProgress from "@/components/global/ScrollProgress";
import NoiseOverlay from "@/components/global/NoiseOverlay";

import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import Services from "@/components/sections/Services";
import Differentiator from "@/components/sections/Differentiator";
import Offer from "@/components/sections/Offer";
import Process from "@/components/sections/Process";
import Founder from "@/components/sections/Founder";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Navbar />
      <CustomCursor />
      <ScrollProgress />
      <NoiseOverlay />

      <main>
        {/* Hero: --void (darkest) */}
        <Hero />

        {/* Hero → Problem: gradient fade void → void-subtle */}
        <SectionDivider type="gradient-fade" from="var(--color-void)" to="var(--color-void-subtle)" />

        {/* Problem: --void-subtle */}
        <Problem />

        {/* Problem → Marquee: line divider */}
        <SectionDivider type="line" />

        <MarqueeStrip />

        {/* Marquee → Services: reverse fade back to void */}
        <SectionDivider type="gradient-fade-reverse" from="var(--color-void-subtle)" to="var(--color-void)" />

        {/* Services: --void */}
        <Services />

        {/* Services → Differentiator: line divider */}
        <SectionDivider type="line" />

        {/* Differentiator: --void */}
        <Differentiator />

        {/* Differentiator → Offer: compact gradient fade (FIX 9: reduced dead space) */}
        <SectionDivider type="gradient-fade" from="var(--color-void)" to="var(--color-void-subtle)" />

        {/* Offer: --void-subtle */}
        <Offer />

        {/* Process: --void-card (overlapping section) */}
        <Process />

        {/* Process → Founder: gradient fade */}
        <SectionDivider type="gradient-fade" from="var(--color-void-card)" to="var(--color-void-subtle)" />

        {/* Founder: --void-subtle */}
        <Founder />

        {/* Founder → FAQ: line divider */}
        <SectionDivider type="line" />

        {/* FAQ: --void */}
        <FAQ />

        {/* FAQ → CTA: gradient fade */}
        <SectionDivider type="gradient-fade-reverse" from="var(--color-void)" to="var(--color-void)" />

        {/* Final CTA: --void with glow */}
        <FinalCTA />
      </main>

      {/* Footer: --void-card (darkest possible) */}
      <Footer />
    </SmoothScroll>
  );
}
