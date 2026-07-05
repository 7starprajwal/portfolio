import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-12 md:flex-row lg:px-8">
        <HeroContent />

        <HeroImage />
      </div>
    </section>
  );
}

export default Hero;