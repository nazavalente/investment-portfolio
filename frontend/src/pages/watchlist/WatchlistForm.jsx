import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WatchlistFormComponent from "../../components/forms/WatchlistForm";
import PageHeader from "../../components/common/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { watchlistService } from "../../services/watchlistService";

function WatchlistForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchWatchlistItem = async () => {
      if (!isEditMode) return;

      try {
        setLoading(true);
        setError("");

        const item = await watchlistService.getWatchlistItemById(id);
        setInitialData(item);
      } catch (err) {
        console.error("Gagal mengambil data watchlist:", err);
        setError("Gagal mengambil data watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistItem();
  }, [id, isEditMode]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...formData,
        target_buy_price:
          formData.target_buy_price === "" ? 0 : Number(formData.target_buy_price),
        current_price:
          formData.current_price === "" ? 0 : Number(formData.current_price),
      };

      if (isEditMode) {
        await watchlistService.updateWatchlistItem(id, payload);
      } else {
        await watchlistService.createWatchlistItem(payload);
      }

      navigate("/watchlist", { replace: true });
    } catch (err) {
      console.error("Gagal menyimpan watchlist:", err);
      setError(err.response?.data?.message || "Gagal menyimpan watchlist");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/watchlist");
  };

  if (loading && isEditMode) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader
        title={isEditMode ? "Edit Watchlist" : "Tambah Watchlist"}
        subtitle={
          isEditMode
            ? "Perbarui item watchlist Anda"
            : "Tambahkan aset baru ke watchlist"
        }
      />

      {error && (
        <div className="mb-4 bg-red-100 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <WatchlistFormComponent
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default WatchlistForm;