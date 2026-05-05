import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/modals/ConfirmModal";
import TargetTable from "../../components/tables/TargetTable";
import { useFetch } from "../../hooks/useFetch";
import { targetService } from "../../services/targetService";

function TargetsPage() {
  const navigate = useNavigate();
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: targets,
    loading,
    error,
    refetch,
  } = useFetch(targetService.getAllTargets, {
    initialData: [],
  });

  const handleCreate = () => {
    navigate("/targets/create");
  };

  const handleEdit = (target) => {
    navigate(`/targets/edit/${target.id}`);
  };

  const handleDeleteClick = (target) => {
    setSelectedTarget(target);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!selectedTarget) return;

      await targetService.deleteTarget(selectedTarget.id);
      setIsDeleteModalOpen(false);
      setSelectedTarget(null);
      refetch();
    } catch (err) {
      console.error("Gagal menghapus target:", err);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTarget(null);
  };

  return (
    <div>
      <PageHeader
        title="Targets"
        subtitle="Kelola target keuangan dan pantau progres pencapaiannya"
        action={
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tambah Target
          </button>
        }
      />

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg">
          Gagal memuat data target.
        </div>
      )}

      {!loading && !error && targets.length === 0 && (
        <EmptyState
          title="Belum ada target keuangan"
          description="Tambahkan target agar rencana keuangan Anda lebih terarah."
        />
      )}

      {!loading && !error && targets.length > 0 && (
        <TargetTable
          targets={targets}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Hapus Target"
        message={`Apakah Anda yakin ingin menghapus target "${
          selectedTarget?.target_name || ""
        }"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}

export default TargetsPage;