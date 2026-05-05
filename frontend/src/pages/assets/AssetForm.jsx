import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssetFormComponent from "../../components/forms/AssetForm";
import PageHeader from "../../components/common/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { assetService } from "../../services/assetService";

function AssetForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchAsset = async () => {
      if (!isEditMode) return;

      try {
        setLoading(true);
        setError("");

        const asset = await assetService.getAssetById(id);
        setInitialData(asset);
      } catch (err) {
        console.error("Gagal mengambil data aset:", err);
        setError("Gagal mengambil data aset");
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id, isEditMode]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      if (isEditMode) {
        await assetService.updateAsset(id, formData);
      } else {
        await assetService.createAsset(formData);
      }

      navigate("/assets", { replace: true });
    } catch (err) {
      console.error("Gagal menyimpan aset:", err);
      setError(err.response?.data?.message || "Gagal menyimpan aset");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/assets");
  };

  if (loading && isEditMode) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader
        title={isEditMode ? "Edit Aset" : "Tambah Aset"}
        subtitle={
          isEditMode
            ? "Perbarui data aset investasi Anda"
            : "Tambahkan data aset investasi baru ke portofolio Anda"
        }
      />

      {error && (
        <div className="mb-4 bg-red-100 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <AssetFormComponent
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AssetForm;