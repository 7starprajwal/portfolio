import { useMemo, useState } from "react";

import CertificateCard from "./CertificateCard";
import CertificateModal from "./CertificateModal";

function CertificateGrid({
  certificates = [],
  loading = false,
  searchTerm = "",
  selectedSort = "newest",
}) {
  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const displayedCertificates = useMemo(() => {
    const filtered = certificates.filter(
      (certificate) =>
        certificate.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        certificate.issuer
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    switch (selectedSort) {
      case "az":
        filtered.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "za":
        filtered.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;

      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.issueDate) -
            new Date(b.issueDate)
        );
        break;

      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.issueDate) -
            new Date(a.issueDate)
        );
        break;
    }

    return filtered;
  }, [
    certificates,
    searchTerm,
    selectedSort,
  ]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-12">
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            Loading certificates...
          </div>
        ) : displayedCertificates.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No Certificates Found
            </h3>

            <p className="mt-4 text-slate-400">
              Try changing the search.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {displayedCertificates.map(
              (certificate) => (
                <CertificateCard
                  key={certificate._id}
                  certificate={certificate}
                  onView={
                    setSelectedCertificate
                  }
                />
              )
            )}
          </div>
        )}
      </section>

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() =>
          setSelectedCertificate(null)
        }
      />
    </>
  );
}

export default CertificateGrid;