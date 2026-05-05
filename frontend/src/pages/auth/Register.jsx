import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import { authService } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-[#1E293B] bg-[#0F172A] px-4 py-3.5 text-[#E2E8F0] outline-none transition placeholder:text-[#64748B] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await authService.register({
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.error("Register gagal:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Register gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Register"
      subtitle="Buat akun baru untuk mulai memantau portofolio investasi Anda"
      footer={
        <p className="text-sm text-[#94A3B8]">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#6366F1] transition hover:text-[#818CF8]"
          >
            Login
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-2xl border border-[#7F1D1D] bg-[#2A0F14] px-4 py-3 text-sm text-[#FCA5A5]">
            {error}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Nama
          </label>
          <input
            type="text"
            placeholder="Masukkan nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Email
          </label>
          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Password
          </label>
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[#6366F1] px-4 py-3.5 text-base font-semibold text-white transition hover:bg-[#5558E8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </AuthShell>
  );
}

export default Register;