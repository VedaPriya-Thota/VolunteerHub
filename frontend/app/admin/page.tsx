"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Award,
  Bell,
  CalendarDays,
  ChevronDown,
  Clock3,
  FileText,
  HeartHandshake,
  Leaf,
  LayoutGrid,
  MapPin,
  PlusCircle,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import API from "../../services/api";

interface Application {
  id: number;
  title: string;
  name: string;
  email: string;
  location: string;
  status: string;
  applied_at: string;
}

const quickActions = [
  {
    title: "Create Event",
    subtitle: "Launch a new mission",
    icon: PlusCircle,
    gradient: "from-emerald-500 to-green-600",
    section: "events",
  },
  {
    title: "Manage Volunteers",
    subtitle: "Review active members",
    icon: Users,
    gradient: "from-sky-500 to-cyan-600",
    section: "volunteers",
  },
  {
    title: "View Applications",
    subtitle: "Approve pending requests",
    icon: FileText,
    gradient: "from-violet-500 to-fuchsia-600",
    section: "applications",
  },
  {
    title: "Issue Certificates",
    subtitle: "Reward completed service",
    icon: Award,
    gradient: "from-amber-500 to-orange-600",
    route: "/dashboard/certificates",
  },
  {
    title: "Analytics",
    subtitle: "Track platform growth",
    icon: TrendingUp,
    gradient: "from-rose-500 to-pink-600",
    section: "analytics",
  },
];

const impactMetrics = [
  { label: "Trees Planted", value: "1,284", icon: Leaf },
  { label: "Lives Impacted", value: "9,860", icon: HeartHandshake },
  { label: "Students Reached", value: "3,240", icon: Sparkles },
  { label: "Beaches Cleaned", value: "46", icon: ShieldCheck },
];

const activityFeed = [
  {
    icon: "🌱",
    title: "Veda joined Tree Plantation Drive",
    time: "2 min ago",
  },
  {
    icon: "❤️",
    title: "Rahul registered as a volunteer",
    time: "15 min ago",
  },
  {
    icon: "🏆",
    title: "Certificate issued to Amala",
    time: "35 min ago",
  },
  {
    icon: "📅",
    title: "New event created: Community Food Drive",
    time: "1 hour ago",
  },
];

const monthlyData = [
  { month: "Jan", applications: 38, volunteers: 52 },
  { month: "Feb", applications: 47, volunteers: 61 },
  { month: "Mar", applications: 56, volunteers: 74 },
  { month: "Apr", applications: 64, volunteers: 87 },
  { month: "May", applications: 81, volunteers: 96 },
  { month: "Jun", applications: 94, volunteers: 112 },
];

export default function AdminPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("overview");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalApplications: 0,
    pendingApplications: 0,
  });

  const [applications, setApplications] = useState<Application[]>([]);

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    event_date: "",
    capacity: "",
  });

  useEffect(() => {
    fetchStats();
    fetchApplications();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await API.get("/admin/applications");
      setApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createEvent = async () => {
    try {
      await API.post("/events", {
        ...eventData,
        capacity: Number(eventData.capacity),
      });

      setEventData({
        title: "",
        description: "",
        location: "",
        event_date: "",
        capacity: "",
      });

      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  const approveApplication = async (id: number) => {
    try {
      await API.put(`/applications/${id}/approve`);
      setApplications((prev) =>
        prev.map((application) =>
          application.id === id
            ? { ...application, status: "approved" }
            : application
        )
      );
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectApplication = async (id: number) => {
    try {
      await API.put(`/applications/${id}/reject`);
      setApplications((prev) =>
        prev.map((application) =>
          application.id === id
            ? { ...application, status: "rejected" }
            : application
        )
      );
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  const analyticsCards = useMemo(
    () => [
      {
        label: "Total Volunteers",
        value: stats.totalUsers,
        change: "+15%",
        icon: Users,
        gradient: "from-emerald-500 to-green-600",
      },
      {
        label: "Total Events",
        value: stats.totalEvents,
        change: "+8%",
        icon: CalendarDays,
        gradient: "from-sky-500 to-cyan-600",
      },
      {
        label: "Applications",
        value: stats.totalApplications,
        change: "+12%",
        icon: FileText,
        gradient: "from-violet-500 to-fuchsia-600",
      },
      {
        label: "Pending Approvals",
        value: stats.pendingApplications,
        change: "5 due today",
        icon: Clock3,
        gradient: "from-amber-500 to-orange-600",
      },
      {
        label: "Certificates Issued",
        value: "184",
        change: "+22%",
        icon: Award,
        gradient: "from-rose-500 to-pink-600",
      },
      {
        label: "Volunteer Hours",
        value: "3,420",
        change: "+9%",
        icon: Activity,
        gradient: "from-indigo-500 to-blue-600",
      },
    ],
    [stats]
  );

  const maxApplications = Math.max(...monthlyData.map((item) => item.applications));
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNavClick = (sectionId: string, route?: string) => {
    setActiveSection(sectionId);
    if (route) {
      router.push(route);
      return;
    }
    scrollToSection(sectionId);
  };

  return (
    <main className="min-h-screen bg-[#f5f7f2]">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white">
              <LayoutGrid size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Platform</p>
              <h2 className="text-sm font-semibold text-slate-900">VolunteerHub Admin</h2>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {[
              { label: "Overview", section: "overview" },
              { label: "Events", section: "events", route: "/events" },
              { label: "Volunteers", section: "volunteers" },
              { label: "Applications", section: "applications" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.section, item.route)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  activeSection === item.section
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50">
              <Search size={18} />
            </button>
            <button className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50">
              <Bell size={18} />
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white">
              Admin <ChevronDown size={16} />
            </button>
          </div>
        </nav>

        <motion.section
          id="overview"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-4xl bg-linear-to-br from-emerald-600 via-green-500 to-teal-500 p-8 text-white shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_18%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm backdrop-blur-xl">
                <Sparkles size={16} />
                Live activity · 36 updates
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight">Welcome Back, Admin 👋</h1>
              <p className="mt-2 text-sm text-emerald-50/90">
                Here&apos;s what&apos;s happening across VolunteerHub today.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-8">
                <span className="text-sm text-emerald-50">Platform status</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Healthy
                </span>
              </div>
              <p className="text-xs text-emerald-50/80">{today}</p>
            </div>
          </div>
        </motion.section>

        <section id="analytics" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {analyticsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-lg shadow-slate-200/40"
              >
                <div className={`absolute right-0 top-0 h-28 w-28 bg-linear-to-br ${card.gradient} opacity-10 blur-2xl`} />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{card.label}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${card.gradient} text-white`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">{card.change}</span>
                  <span className="text-slate-400">this month</span>
                </div>
              </motion.div>
            );
          })}
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Quick Actions</h2>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-5">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.04 }}
                  whileHover={{ y: -3 }}
                  onClick={() => {
                    if (action.route) {
                      router.push(action.route);
                    } else if (action.section) {
                      scrollToSection(action.section);
                    }
                  }}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${action.gradient} text-white`}>
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">{action.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{action.subtitle}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                    Open <ArrowRight size={16} />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            id="events"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-4xl border border-slate-200/70 bg-white/80 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Event Management</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Create New Mission</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Ready</span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="group relative">
                <span className="absolute left-4 top-3 text-xs text-slate-400 transition group-focus-within:text-emerald-600">Event Title</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pb-3 pt-7 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                  placeholder="Volunteer cleanup drive"
                  value={eventData.title}
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                />
              </label>
              <label className="group relative">
                <span className="absolute left-4 top-3 text-xs text-slate-400 transition group-focus-within:text-emerald-600">Location</span>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pb-3 pt-7 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                  placeholder="Bangalore, India"
                  value={eventData.location}
                  onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                />
              </label>
              <label className="group relative">
                <span className="absolute left-4 top-3 text-xs text-slate-400 transition group-focus-within:text-emerald-600">Date</span>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pb-3 pt-7 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                  value={eventData.event_date}
                  onChange={(e) => setEventData({ ...eventData, event_date: e.target.value })}
                />
              </label>
              <label className="group relative">
                <span className="absolute left-4 top-3 text-xs text-slate-400 transition group-focus-within:text-emerald-600">Capacity</span>
                <input
                  type="number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pb-3 pt-7 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                  placeholder="50"
                  value={eventData.capacity}
                  onChange={(e) => setEventData({ ...eventData, capacity: e.target.value })}
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm text-slate-500">Description</span>
              <textarea
                rows={5}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                placeholder="Describe the mission, expected impact, and volunteer responsibilities..."
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              />
            </label>

            <button
              onClick={createEvent}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:scale-[1.01]"
            >
              <PlusCircle size={18} />
              Create Event
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-4xl border border-slate-200/70 bg-white/80 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Analytics</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Platform Performance</h2>
              </div>
              <span className="text-sm font-semibold text-emerald-700">+18.4%</span>
            </div>

            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="applicationsGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip
                    cursor={{ stroke: "#10b981", strokeDasharray: "4 4" }}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#applicationsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Volunteer Growth</p>
                <div className="mt-3 h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="volunteers" radius={[8, 8, 0, 0]} fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Event Participation</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-3xl font-bold text-slate-900">74%</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">+6.3%</span>
                </div>
                <div className="mt-4 h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[74%] rounded-full bg-linear-to-r from-emerald-500 to-teal-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="volunteers" className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            id="applications"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-4xl border border-slate-200/70 bg-white/80 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Recent Applications</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Volunteer Requests</h2>
              </div>
              <button className="text-sm font-semibold text-emerald-700">View all</button>
            </div>

            <div className="mt-6 space-y-4">
              {applications.map((app) => (
                <motion.div
                  key={app.id}
                  layout
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-200 hover:bg-white"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-slate-900">{app.name}</h3>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            app.status === "approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : app.status === "rejected"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{app.title}</p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1"><MapPin size={13} /> {app.location}</span>
                        <span className="inline-flex items-center gap-1"><CalendarDays size={13} /> {app.applied_at?.slice(0, 10)}</span>
                      </div>
                    </div>

                    {app.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveApplication(app.id)}
                          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectApplication(app.id)}
                          className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-4xl border border-slate-200/70 bg-white/80 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Activity Feed</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Live Updates</h2>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                <Activity size={14} />
                Now
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {activityFeed.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-base">{item.icon}</div>
                    {index !== activityFeed.length - 1 && <div className="mt-2 h-full w-px bg-slate-200" />}
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="mt-8 rounded-4xl border border-slate-200/70 bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">Community Impact</p>
              <h2 className="mt-2 text-2xl font-semibold">Platform Impact</h2>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-emerald-100">This quarter</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {impactMetrics.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.06 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">{item.label}</span>
                    <Icon size={18} className="text-emerald-300" />
                  </div>
                  <p className="mt-3 text-3xl font-bold">{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}