import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/modals/ConfirmModal";
import AssetTable from "../../components/tables/AssetTable";
import { useFetch } from "../../hooks/useFetch";
import { assetService } from "../../services/assetService";

function AssetsPage() {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: assets,
    loading,
    error,
    refetch,
  } = useFetch(assetService.getAllAssets, {
    initialData: [],
  });

  const handleCreate = () => {
    navigate("/assets/create");
  };

  const handleEdit = (asset) => {
    navigate(`/assets/edit/${asset.id}`);
  };

  const handleDeleteClick = (asset) => {
    setSelectedAsset(asset);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!selectedAsset) return;

      await assetService.deleteAsset(selectedAsset.id);
      setIsDeleteModalOpen(false);
      setSelectedAsset(null);
      refetch();
    } catch (err) {
      console.error("Gagal menghapus aset:", err);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedAsset(null);
  };

  return (
    <div>
      <PageHeader
        title="Assets"
        subtitle="Kelola seluruh aset investasi yang Anda miliki"
        action={
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tambah Aset
          </button>
        }
      />

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg">
          Gagal memuat data aset.
        </div>
      )}

      {!loading && !error && assets.length === 0 && (
        <EmptyState
          title="Belum ada aset"
          description="Tambahkan aset pertama Anda untuk mulai memantau portofolio investasi."
        />
      )}

      {!loading && !error && assets.length > 0 && (
        <AssetTable
          assets={assets}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Hapus Aset"
        message={`Apakah Anda yakin ingin menghapus aset "${
          selectedAsset?.asset_name || ""
        }"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}

export default AssetsPage;