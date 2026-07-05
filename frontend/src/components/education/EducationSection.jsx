import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getEducations } from "../../services/educationService";
import EducationCard from "./EducationCard";

function EducationSection() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducations();
  }, []);

  async function fetchEducations() {
    try {
      setLoading(true);

      const response = await getEducations();

      const formattedEducations = (
        response.educations || []
      )
        .map((education) => ({
          _id: education._id,
          degree: education.degree,
          specialization:
            education.specialization,
          institution: education.institution,
          university: education.university,
          location: education.location,
          startDate: education.startDate,
          endDate: education.endDate,
          cgpa: education.cgpa,
          description:
            education.description,
          achievements:
            education.achievements || [],
          logo: education.logo?.url || "",
          featured: education.featured,
          isPublished:
            education.isPublished,
          order: education.order,
        }))
        .sort(
          (a, b) =>
            new Date(b.startDate) -
            new Date(a.startDate)
        );

      setEducations(formattedEducations);
    } catch (error) {
      console.error(
        "Failed to load education:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </section>
    );
  }

  return (
    <section
      id="education"
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
            Education
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-400">
            My academic journey and the
            technical foundation that
            supports my software
            development career.
          </p>

          <p className="mt-5 text-cyan-400">
            {educations.length} Education
            {educations.length !== 1
              ? " Records"
              : " Record"}
          </p>
        </motion.div>

        {educations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No Education Added
            </h3>

            <p className="mt-3 text-slate-400">
              Your education records
              will appear here after
              they are published.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {educations.map(
              (education) => (
                <EducationCard
                  key={education._id}
                  education={education}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default EducationSection;