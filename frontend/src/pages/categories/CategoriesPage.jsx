import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/modals/ConfirmModal";
import CategoryTable from "../../components/tables/CategoryTable";
import { useFetch } from "../../hooks/useFetch";
import { categoryService } from "../../services/categoryService";

function CategoriesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: categories,
    loading,
    error,
    refetch,
  } = useFetch(categoryService.getAllCategories, {
    initialData: [],
  });

  const handleCreate = () => {
    navigate("/categories/create");
  };

  const handleEdit = (category) => {
    navigate(`/categories/edit/${category.id}`);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!selectedCategory) return;

      await categoryService.deleteCategory(selectedCategory.id);
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
      refetch();
    } catch (err) {
      console.error("Gagal menghapus kategori:", err);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Kelola kategori investasi untuk mengelompokkan aset Anda"
        action={
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tambah Kategori
          </button>
        }
      />

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg">
          Gagal memuat data kategori.
        </div>
      )}

      {!loading && !error && categories.length === 0 && (
        <EmptyState
          title="Belum ada kategori"
          description="Tambahkan kategori agar aset investasi lebih terstruktur."
        />
      )}

      {!loading && !error && categories.length > 0 && (
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Hapus Kategori"
        message={`Apakah Anda yakin ingin menghapus kategori "${
          selectedCategory?.category_name || ""
        }"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}

export default CategoriesPage;