import { useEffect, useState } from "react";

import { getResume } from "../../services/resumeService";

import ResumeHero from "../../components/resume/ResumeHero";
import ResumeCard from "../../components/resume/ResumeCard";
import ResumeDownload from "../../components/resume/ResumeDownload";

function ResumePage() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      setLoading(true);

      const response = await getResume();

      setResume(response.resume || null);
    } catch (error) {
      console.error("Failed to load resume:", error);
      setResume(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

          <h2 className="mt-8 text-3xl font-bold text-white">
            Loading Resume...
          </h2>

          <p className="mt-3 text-lg text-slate-400">
            Please wait while we load the latest version of my resume.
          </p>
        </div>
      </section>
    );
  }

  if (!resume) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="max-w-lg text-center">
          <h2 className="text-4xl font-bold text-white">
            Resume Not Available
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-400">
            The resume is currently unavailable. Please check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <ResumeHero />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <ResumeCard resume={resume} />

        <ResumeDownload resume={resume} />
      </section>
    </main>
  );
}

export default ResumePage;