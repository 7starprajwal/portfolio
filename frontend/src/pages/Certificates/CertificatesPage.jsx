import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import CertificateSearch from "../../components/certificates/CertificateSearch";
import CertificateFilter from "../../components/certificates/CertificateFilter";
import CertificateGrid from "../../components/certificates/CertificateGrid";
import { getCertificates } from "../../services/certificateService";

function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] =
    useState("newest");

  const [certificates, setCertificates] =
    useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);

      const response = await getCertificates();

      setCertificates(
        response.certificates || []
      );
    } catch (error) {
      console.error(
        "Failed to load certificates:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const totalCertificates =
    certificates.length;

  const totalProviders = useMemo(() => {
    return new Set(
      certificates.map(
        (certificate) =>
          certificate.issuer
      )
    ).size;
  }, [certificates]);

  const totalCategories = useMemo(() => {
    return new Set(
      certificates.map(
        (certificate) =>
          certificate.category
      )
    ).size;
  }, [certificates]);

  return (
    <div className="min-h-screen bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <motion.h1
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mb-6 text-center text-5xl font-bold text-white md:text-6xl"
          >
            Certificates
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="mx-auto max-w-3xl text-center text-lg leading-8 text-slate-400"
          >
            A collection of certifications that demonstrate my technical
            expertise, continuous learning, and commitment to professional
            growth.
          </motion.p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center backdrop-blur-lg">
              <h2 className="text-4xl font-bold text-cyan-400">
                {totalCertificates}
              </h2>

              <p className="mt-2 text-slate-400">
                Certificates
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center backdrop-blur-lg">
              <h2 className="text-4xl font-bold text-cyan-400">
                {totalProviders}
              </h2>

              <p className="mt-2 text-slate-400">
                Providers
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center backdrop-blur-lg">
              <h2 className="text-4xl font-bold text-cyan-400">
                {totalCategories}
              </h2>

              <p className="mt-2 text-slate-400">
                Categories
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12">
        <CertificateSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <CertificateFilter
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      </section>

      <CertificateGrid
        certificates={certificates}
        loading={loading}
        searchTerm={searchTerm}
        selectedSort={selectedSort}
      />
    </div>
  );
}

export default CertificatesPage;