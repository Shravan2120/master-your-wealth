
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { AboutSection } from "./components/sections/About";
// import { FundsSection } from "./components/sections/Funds";
import { CalculatorSection } from "./components/sections/Calculator";
import { WhySipSection } from "./components/sections/WhySip";
import { ServicesSection } from "./components/sections/Services";
import { FaqSection } from "./components/sections/Faq";
import { ContactSection } from "./components/sections/Contact";
import { KYCSection } from "./components/sections/KYCSection";
import WhatsAppButton from "./components/sections/WhatsAppButton";
function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        {/* <StatsStrip /> */}
        <AboutSection />
        {/* <FundsSection /> */}
        <CalculatorSection />
        <WhySipSection />
        <ServicesSection />
        <KYCSection />
        <FaqSection />
        <ContactSection />
        <WhatsAppButton />
      </main>

      <Footer />
    </>
  );
}

export default App;
