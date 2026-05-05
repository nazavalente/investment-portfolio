import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryFormComponent from "../../components/forms/CategoryForm";
import PageHeader from "../../components/common/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { categoryService } from "../../services/categoryService";

function CategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!isEditMode) return;

      try {
        setLoading(true);
        setError("");

        const category = await categoryService.getCategoryById(id);
        setInitialData(category);
      } catch (err) {
        console.error("Gagal mengambil data kategori:", err);
        setError("Gagal mengambil data kategori");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, isEditMode]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      if (isEditMode) {
        await categoryService.updateCategory(id, formData);
      } else {
        await categoryService.createCategory(formData);
      }

      navigate("/categories", { replace: true });
    } catch (err) {
      console.error("Gagal menyimpan kategori:", err);
      setError(err.response?.data?.message || "Gagal menyimpan kategori");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  if (loading && isEditMode) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader
        title={isEditMode ? "Edit Kategori" : "Tambah Kategori"}
        subtitle={
          isEditMode
            ? "Perbarui kategori investasi Anda"
            : "Tambahkan kategori investasi baru"
        }
      />

      {error && (
        <div className="mb-4 bg-red-100 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <CategoryFormComponent
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default CategoryForm;