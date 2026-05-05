import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransactionFormComponent from "../../components/forms/TransactionForm";
import PageHeader from "../../components/common/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { transactionService } from "../../services/transactionService";

function TransactionForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!isEditMode) return;

      try {
        setLoading(true);
        setError("");

        const transaction = await transactionService.getTransactionById(id);
        setInitialData(transaction);
      } catch (err) {
        console.error("Gagal mengambil data transaksi:", err);
        setError(
          err.response?.data?.message ||
            err.response?.data?.errors?.[0] ||
            "Gagal mengambil data transaksi"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id, isEditMode]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      if (isEditMode) {
        await transactionService.updateTransaction(id, formData);
      } else {
        await transactionService.createTransaction(formData);
      }

      navigate("/transactions", { replace: true });
    } catch (err) {
      console.error("Gagal menyimpan transaksi:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0] ||
          "Gagal menyimpan transaksi"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/transactions");
  };

  if (loading && isEditMode) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader
        title={isEditMode ? "Edit Transaksi" : "Tambah Transaksi"}
        subtitle={
          isEditMode
            ? "Perbarui data transaksi investasi Anda"
            : "Tambahkan transaksi beli atau jual ke portofolio Anda"
        }
      />

      {error && (
        <div className="mb-4 bg-red-100 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <TransactionFormComponent
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default TransactionForm;