import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ExperienceCard from "./ExperienceCard";
import { getPublishedExperiences } from "../../services/experienceService";

function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);

      const response =
        await getPublishedExperiences();

      const sorted = [...(response.data || [])].sort(
        (a, b) =>
          new Date(b.startDate) -
          new Date(a.startDate)
      );

      setExperiences(sorted);
    } catch (error) {
      console.error(
        "Failed to load experience:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      className="bg-slate-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl font-bold text-white">
            Experience
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            My professional journey,
            internships, freelance work,
            and personal projects.
          </p>

          <p className="mt-5 text-cyan-400">
            {experiences.length} Experience
            {experiences.length !== 1
              ? "s"
              : ""}
          </p>
        </motion.div>

        {experiences.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No Experience Added
            </h3>

            <p className="mt-3 text-slate-400">
              Experience records will
              appear here after they are
              published.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Desktop Timeline */}
            <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-cyan-400/30 lg:block"></div>

            {/* Mobile Timeline */}
            <div className="absolute left-3 top-0 h-full w-1 rounded-full bg-cyan-400/30 lg:hidden"></div>

            <div className="space-y-16">
              {experiences.map(
                (experience, index) => (
                  <ExperienceCard
                    key={experience._id}
                    experience={experience}
                    index={index}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExperienceSection;