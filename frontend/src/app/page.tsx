import Navbar from "../components/landing page/navbar";
import Hero from "../components/landing page/hero";
import HowItWorks from "../components/landing page/howItWorks";
import Features from "../components/landing page/features";
import Testimonials from "../components/landing page/testimonials";
import Footer from "../components/landing page/footer";
import Cta from "../components/landing page/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Cta />
      <Footer />
    </div>
  );
}
