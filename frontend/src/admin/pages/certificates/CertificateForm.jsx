import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  issuer: "",
  issueDate: "",
  credentialId: "",
  credentialUrl: "",
  description: "",
  featured: false,
  isPublished: true,
  image: null,
  certificatePdf: null,
};

function CertificateForm({
  onSubmit,
  initialData = null,
  loading = false,
}) {
  const [formData, setFormData] =
    useState(initialForm);

  const [imagePreview, setImagePreview] =
    useState("");

  useEffect(() => {
    if (!initialData) {
      setFormData(initialForm);
      setImagePreview("");
      return;
    }

    setFormData({
      ...initialForm,
      ...initialData,
      image: null,
      certificatePdf: null,

      issueDate: initialData.issueDate
        ? initialData.issueDate.substring(0, 10)
        : "",
    });

    setImagePreview(
      initialData.image?.url || ""
    );
  }, [initialData]);

  const handleChange = (event) => {
    const {
      name,
      value,
      checked,
      type,
      files,
    } = event.target;

    if (type === "file") {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (name === "image" && file) {
        setImagePreview(
          URL.createObjectURL(file)
        );
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("issuer", formData.issuer);
    data.append(
      "issueDate",
      formData.issueDate
    );
    data.append(
      "credentialId",
      formData.credentialId
    );
    data.append(
      "credentialUrl",
      formData.credentialUrl
    );
    data.append(
      "description",
      formData.description
    );
    data.append(
      "featured",
      formData.featured
    );
    data.append(
      "isPublished",
      formData.isPublished
    );

    if (formData.image) {
      data.append(
        "image",
        formData.image
      );
    }

    if (formData.certificatePdf) {
      data.append(
        "certificatePdf",
        formData.certificatePdf
      );
    }

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-white">
          Certificate Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-white">
          Issuing Organization
        </label>

        <input
          type="text"
          name="issuer"
          value={formData.issuer}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-white">
            Issue Date
          </label>

          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-white">
            Credential ID
          </label>

          <input
            type="text"
            name="credentialId"
            value={formData.credentialId}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-white">
          Credential URL
        </label>

        <input
          type="url"
          name="credentialUrl"
          value={formData.credentialUrl}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-white">
          Description
        </label>

        <textarea
          rows="5"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-white">
          Certificate Image
        </label>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="block w-full text-white"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Certificate Preview"
            className="mt-4 h-48 rounded-lg border border-slate-700 object-cover"
          />
        )}
      </div>

      <div>
        <label className="mb-2 block text-white">
          Certificate PDF
        </label>

        <input
          type="file"
          name="certificatePdf"
          accept="application/pdf"
          onChange={handleChange}
          className="block w-full text-white"
        />

        {formData.certificatePdf && (
          <p className="mt-3 text-sm text-cyan-400">
            {formData.certificatePdf.name}
          </p>
        )}

        {!formData.certificatePdf &&
          initialData?.certificatePdf?.url && (
            <a
              href={
                initialData.certificatePdf.url
              }
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-cyan-400 hover:underline"
            >
              View Current PDF
            </a>
          )}
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          Published
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Certificate"
          : "Save Certificate"}
      </button>
    </form>
  );
}

export default CertificateForm;