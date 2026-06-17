"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 text-base font-bold text-white shadow-lg">
            VH
          </span>
          <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            VolunteerHub
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Home</Link>
          <Link href="/events" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Events</Link>
          <Link href="/dashboard" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Impact</Link>
          {user && (
            <>
              <Link href="/dashboard/profile" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Profile</Link>
              <Link href="/dashboard/ngos" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">NGOs</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-0.5"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {!user ? (
            <>
              <Link href="/login" className="hidden px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-600 sm:block">
                Login
              </Link>
              <Link href="/register" className="inline-flex items-center rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5">
                Join Community
              </Link>
            </>
          ) : (
            <button onClick={logout} className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}