"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, Sparkles, User, Users } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "volunteer",
  });
  const [loading, setLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/register", form);
      toast.success("Welcome aboard — your impact journey starts here.");
      setShowCelebration(true);
      setTimeout(() => {
        router.push("/login");
      }, 2200);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-emerald-50 via-white to-sky-50">
      <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-teal-100/50 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid w-full overflow-hidden rounded-[32px] border border-white/50 bg-white/70 shadow-2xl shadow-emerald-100/50 backdrop-blur-2xl lg:grid-cols-[1fr_1.1fr]"
        >
          <div className="relative hidden bg-linear-to-br from-emerald-600 via-teal-500 to-sky-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_18%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-xl">
                <Sparkles size={16} />
                Join the movement
              </span>
              <h2 className="mt-5 text-4xl font-bold leading-tight">Your volunteer story begins here.</h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-50/90">
                Meet people who care, discover missions that matter, and help build stronger communities.
              </p>
            </div>
            <div className="relative rounded-[28px] bg-white/10 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-100">Community</p>
                  <p className="text-xl font-semibold">20,000+ volunteers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Create account</p>
              <h1 className="mt-2 text-4xl font-bold text-slate-900">Become a changemaker</h1>
            </div>

            <div className="mb-6 flex gap-2">
              {[
                "Profile",
                "Preferences",
                "Ready",
              ].map((step, index) => (
                <div key={step} className="flex-1">
                  <div className={`h-2 rounded-full ${index < 2 ? "bg-emerald-500" : "bg-slate-200"}`} />
                  <p className="mt-2 text-xs text-slate-500">{step}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
                  <User size={18} className="text-slate-400" />
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Avery Johnson"
                    className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
                  <Mail size={18} className="text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
                  <Sparkles size={18} className="text-slate-400" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Create a strong password"
                    className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">I am joining as</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="volunteer">Volunteer</option>
                  <option value="admin">Admin</option>
                  <option value="coordinator">Coordinator</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-emerald-600 to-teal-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-200 transition duration-300 hover:-translate-y-0.5 disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-md rounded-[30px] bg-white p-8 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="mt-4 text-3xl font-bold text-slate-900">Welcome to VolunteerHub!</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                You are now part of a community creating positive change across the world.
              </p>
              <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-emerald-400"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}