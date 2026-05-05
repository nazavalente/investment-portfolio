import { useAuth } from "../../hooks/useAuth";
import PageHeader from "../../components/common/PageHeader";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle="Informasi akun yang sedang digunakan"
      />

      <div className="max-w-3xl rounded-2xl border border-[#1E293B] bg-[#111827] p-8 shadow-[0_10px_25px_rgba(2,6,23,0.35)]">
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium text-[#94A3B8]">Nama</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-[#F8FAFC]">
              {user?.name || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[#94A3B8]">Email</p>
            <p className="mt-2 text-2xl font-semibold text-[#E2E8F0]">
              {user?.email || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[#94A3B8]">User ID</p>
            <p className="mt-2 text-2xl font-semibold text-[#6366F1]">
              {user?.id || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;