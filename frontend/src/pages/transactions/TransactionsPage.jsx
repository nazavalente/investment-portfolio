import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/modals/ConfirmModal";
import TransactionTable from "../../components/tables/TransactionTable";
import { useFetch } from "../../hooks/useFetch";
import { transactionService } from "../../services/transactionService";

function TransactionsPage() {
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: transactions,
    loading,
    error,
    refetch,
  } = useFetch(transactionService.getAllTransactions, {
    initialData: [],
  });

  const handleCreate = () => {
    navigate("/transactions/create");
  };

  const handleEdit = (transaction) => {
    navigate(`/transactions/edit/${transaction.id}`);
  };

  const handleDeleteClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!selectedTransaction) return;

      await transactionService.deleteTransaction(selectedTransaction.id);
      setIsDeleteModalOpen(false);
      setSelectedTransaction(null);
      refetch();
    } catch (err) {
      console.error("Gagal menghapus transaksi:", err);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div>
      <PageHeader
        title="Transactions"
        subtitle="Kelola seluruh transaksi beli dan jual aset investasi Anda"
        action={
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tambah Transaksi
          </button>
        }
      />

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg">
          Gagal memuat data transaksi.
        </div>
      )}

      {!loading && !error && transactions.length === 0 && (
        <EmptyState
          title="Belum ada transaksi"
          description="Tambahkan transaksi beli atau jual untuk mulai memantau performa portofolio."
        />
      )}

      {!loading && !error && transactions.length > 0 && (
        <TransactionTable
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Hapus Transaksi"
        message={`Apakah Anda yakin ingin menghapus transaksi "${
          selectedTransaction?.asset_name || ""
        }"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}

export default TransactionsPage;