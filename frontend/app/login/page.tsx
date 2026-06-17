"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeartHandshake, Lock, Mail, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Welcome back! Your impact journey continues.");

      if (res.data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-emerald-50 via-white to-sky-50">
      <div className="absolute left-10 top-20 h-48 w-48 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-100/50 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/50 bg-white/60 shadow-2xl shadow-emerald-100/40 backdrop-blur-2xl lg:grid-cols-[1fr_0.95fr]"
        >
          <div className="relative hidden overflow-hidden bg-linear-to-br from-emerald-600 via-teal-500 to-sky-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_18%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-xl">
                <Sparkles size={16} />
                VolunteerHub
              </span>
              <h2 className="mt-6 text-4xl font-bold leading-tight">Make every action count.</h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-emerald-50/90">
                Join a community dedicated to creating meaningful change across the world.
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative h-80 w-80 rounded-full bg-white/10 backdrop-blur-xl">
                <div className="absolute left-1/2 top-16 h-32 w-32 -translate-x-1/2 rounded-full bg-white/15" />
                <div className="absolute bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-[50%] bg-emerald-200/20" />
                <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-white/15 text-4xl shadow-xl">
                  🤝
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Welcome back</p>
              <h1 className="mt-2 text-4xl font-bold text-slate-900">Log in</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
                  <Mail size={18} className="text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
                  <Lock size={18} className="text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-emerald-600 to-teal-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-200 transition duration-300 hover:-translate-y-0.5 disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-slate-500">New here?</span>
              <a href="/register" className="font-semibold text-emerald-600">Create account</a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}