"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Award, CalendarDays, CheckCircle2, Clock3, HeartHandshake, MapPin, Sparkles } from "lucide-react";
import API from "../../services/api";

interface Application {
  id: number;
  status: string;
  applied_at: string;
  event_id: number;
  title: string;
  location: string;
  event_date: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const journeySteps = [
  "Registered",
  "Applied",
  "Approved",
  "Attended",
  "Certificate earned",
];

const achievements = [
  {
    icon: "🌱",
    title: "Green Starter",
    text: "Applied to your first event",
    unlocked: true,
  },
  {
    icon: "🤝",
    title: "Community Helper",
    text: "5 volunteer hours",
    unlocked: true,
  },
  {
    icon: "🏆",
    title: "Impact Champion",
    text: "10 events completed",
    unlocked: false,
  },
  {
    icon: "❤️",
    title: "Social Hero",
    text: "25 volunteer hours",
    unlocked: false,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          if (parsedUser.role === "admin" || parsedUser.role === "coordinator") {
            router.replace("/admin");
            return;
          }
        }

        const res = await API.get("/applications/my-applications");
        setApplications(res.data || []);
      } catch (error: any) {
        if (error.response?.status !== 404) {
          console.error(error);
        }
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, [router]);

  const approvedCount = applications.filter((app) => app.status === "approved").length;
  const attendedCount = applications.filter((app) => app.status === "attended").length;
  const completedCount = applications.filter((app) => app.status === "approved" || app.status === "attended").length;

  const currentStep = Math.min(
    Math.max(0, completedCount),
    journeySteps.length - 1
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-3xl bg-white px-8 py-6 text-slate-700 shadow-lg">Loading your impact dashboard...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7fbf7]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] bg-linear-to-br from-emerald-600 via-green-500 to-teal-500 p-8 text-white shadow-2xl"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-50">Dashboard</p>
              <h1 className="mt-3 text-4xl font-bold">Welcome back, {user?.name || "Volunteer"} 👋</h1>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-xl">
              <p className="text-sm text-emerald-50">Your impact score</p>
              <p className="text-3xl font-semibold">{completedCount * 15 + 40}</p>
            </div>
          </div>
        </motion.section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">Your impact journey</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Progress path</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">{completedCount}/5 milestones</span>
            </div>

            <div className="mt-8 space-y-4">
              {journeySteps.map((step, index) => {
                const isDone = index <= currentStep;
                return (
                  <div key={step} className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isDone ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                      {isDone ? <CheckCircle2 size={18} /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className={`h-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 ${isDone ? "w-full" : "w-0"}`} />
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${isDone ? "text-slate-900" : "text-slate-400"}`}>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Applications</p>
              <p className="mt-2 text-4xl font-bold text-slate-900">{applications.length}</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Approved</p>
              <p className="mt-2 text-4xl font-bold text-slate-900">{approvedCount}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-4">
          {[
            { label: "Certificates", value: "0", icon: Award },
            { label: "Volunteer hours", value: "0", icon: Clock3 },
            { label: "Events joined", value: `${applications.length}`, icon: HeartHandshake },
            { label: "Impact score", value: `${completedCount * 15 + 40}`, icon: Sparkles },
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <Icon size={18} className="text-emerald-600" />
                </div>
                <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
              </motion.div>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Recent applications</h2>
              <a href="/events" className="text-sm font-semibold text-emerald-600">Explore more</a>
            </div>

            <div className="mt-6 space-y-4">
              {applications.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 p-6 text-slate-500">You haven’t applied for any events yet.</div>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-slate-900">{app.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><MapPin size={14} /> {app.location}</span>
                          <span className="flex items-center gap-1"><CalendarDays size={14} /> {app.event_date?.split("T")[0]}</span>
                        </div>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        app.status === "approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>{app.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Achievements</h2>
            <div className="mt-6 grid gap-4">
              {achievements.map((item) => (
                <div key={item.title} className={`rounded-2xl p-4 ${item.unlocked ? "bg-emerald-50" : "bg-slate-50"}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}