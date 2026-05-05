import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/modals/ConfirmModal";
import WatchlistTable from "../../components/tables/WatchlistTable";
import { useFetch } from "../../hooks/useFetch";
import { watchlistService } from "../../services/watchlistService";

function WatchlistPage() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: watchlist,
    loading,
    error,
    refetch,
  } = useFetch(watchlistService.getAllWatchlistItems, {
    initialData: [],
  });

  const handleCreate = () => {
    navigate("/watchlist/create");
  };

  const handleEdit = (item) => {
    navigate(`/watchlist/edit/${item.id}`);
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!selectedItem) return;

      await watchlistService.deleteWatchlistItem(selectedItem.id);
      setIsDeleteModalOpen(false);
      setSelectedItem(null);
      refetch();
    } catch (err) {
      console.error("Gagal menghapus watchlist:", err);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <PageHeader
        title="Watchlist"
        subtitle="Pantau aset yang ingin Anda beli atau perhatikan"
        action={
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tambah Watchlist
          </button>
        }
      />

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg">
          Gagal memuat data watchlist.
        </div>
      )}

      {!loading && !error && watchlist.length === 0 && (
        <EmptyState
          title="Belum ada watchlist"
          description="Tambahkan aset ke watchlist untuk memantau peluang investasi."
        />
      )}

      {!loading && !error && watchlist.length > 0 && (
        <WatchlistTable
          watchlist={watchlist}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Hapus Watchlist"
        message={`Apakah Anda yakin ingin menghapus watchlist "${
          selectedItem?.asset_name || ""
        }"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}

export default WatchlistPage;