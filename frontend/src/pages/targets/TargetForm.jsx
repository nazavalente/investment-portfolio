import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TargetFormComponent from "../../components/forms/TargetForm";
import PageHeader from "../../components/common/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { targetService } from "../../services/targetService";

function TargetForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchTarget = async () => {
      if (!isEditMode) return;

      try {
        setLoading(true);
        setError("");

        const target = await targetService.getTargetById(id);
        setInitialData(target);
      } catch (err) {
        console.error("Gagal mengambil data target:", err);
        setError("Gagal mengambil data target");
      } finally {
        setLoading(false);
      }
    };

    fetchTarget();
  }, [id, isEditMode]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...formData,
        target_amount:
          formData.target_amount === "" ? 0 : Number(formData.target_amount),
        current_progress:
          formData.current_progress === "" ? 0 : Number(formData.current_progress),
      };

      if (isEditMode) {
        await targetService.updateTarget(id, payload);
      } else {
        await targetService.createTarget(payload);
      }

      navigate("/targets", { replace: true });
    } catch (err) {
      console.error("Gagal menyimpan target:", err);
      setError(err.response?.data?.message || "Gagal menyimpan target");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/targets");
  };

  if (loading && isEditMode) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <PageHeader
        title={isEditMode ? "Edit Target" : "Tambah Target"}
        subtitle={
          isEditMode
            ? "Perbarui target keuangan Anda"
            : "Tambahkan target keuangan baru"
        }
      />

      {error && (
        <div className="mb-4 bg-red-100 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <TargetFormComponent
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default TargetForm;