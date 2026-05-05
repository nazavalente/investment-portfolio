import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../../components/auth/AuthShell";
import { authService } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

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

      const response = await authService.login({
        email,
        password,
      });

      const token = response?.token || response?.data?.token;
      const user = response?.user || response?.data?.user;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      console.error("Login gagal:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Login"
      subtitle="Masuk untuk mengelola portofolio investasi Anda"
      footer={
        <p className="text-sm text-[#94A3B8]">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#6366F1] transition hover:text-[#818CF8]"
          >
            Register
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
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </AuthShell>
  );
}

export default Login;