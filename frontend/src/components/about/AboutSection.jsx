import AboutContent from "./AboutContent";
import AboutImage from "./AboutImage";
import AboutStats from "./AboutStats";


console.log("About Page Loaded");

function AboutSection() {
  return (
    <section
      id="about"
      className="bg-slate-900 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-16 text-center text-4xl font-bold text-white">
          About Me
        </h2>

        <div className="grid items-center gap-14 md:grid-cols-2">
          <AboutImage />

          <AboutContent />
        </div>

        <AboutStats />
      </div>
    </section>
  );
}

export default AboutSection;