import { useMemo, useState } from "react";

import CertificateCard from "./CertificateCard";
import CertificateModal from "./CertificateModal";

function CertificateGrid({
  certificates = [],
  loading = false,
  searchTerm = "",
  selectedCategory = "All",
}) {
  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const filteredCertificates = useMemo(() => {
    return certificates.filter((certificate) => {
      const matchesSearch =
        certificate.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        certificate.issuer
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        certificate.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [certificates, searchTerm, selectedCategory]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-12">
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            Loading certificates...
          </div>
        ) : filteredCertificates.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No Certificates Found
            </h3>

            <p className="mt-4 text-slate-400">
              Try changing the search or filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCertificates.map((certificate) => (
              <CertificateCard
                key={certificate._id}
                certificate={certificate}
                onView={setSelectedCertificate}
              />
            ))}
          </div>
        )}
      </section>

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </>
  );
}

export default CertificateGrid;