"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../services/api";
import EventCard from "../../components/EventCard";

interface EventType {
  id: number;
  title: string;
  description: string;
  location: string;
  event_date: string;
  capacity: number;
}

const celebrationMessages: Record<string, { message: string; icon: string }> = {
  tree: {
    message: "🌱 Your impact journey begins. Thank you for helping create a greener tomorrow.",
    icon: "🌿",
  },
  beach: {
    message: "🌊 You are helping protect our oceans.",
    icon: "🌊",
  },
  blood: {
    message: "❤️ Your contribution could help save lives.",
    icon: "💗",
  },
  education: {
    message: "📚 You are helping shape future generations.",
    icon: "📘",
  },
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCelebrationData = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes("tree") || lower.includes("plant")) return celebrationMessages.tree;
    if (lower.includes("beach") || lower.includes("cleanup") || lower.includes("ocean")) return celebrationMessages.beach;
    if (lower.includes("blood") || lower.includes("donation") || lower.includes("health")) return celebrationMessages.blood;
    if (lower.includes("education") || lower.includes("learn") || lower.includes("school") || lower.includes("book")) return celebrationMessages.education;
    return {
      message: "🎉 Your kindness is now part of something bigger.",
      icon: "✨",
    };
  };

  const applyForEvent = async (eventId: number, eventTitle: string) => {
    try {
      await API.post(`/applications/${eventId}/apply`);
      const event = events.find((item) => item.id === eventId);
      setSelectedEvent(event || null);
      toast.success("Application submitted successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Application failed");
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f7fbf7]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <section className="rounded-[32px] bg-linear-to-br from-emerald-600 via-green-500 to-teal-500 p-8 text-white shadow-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-50">Discover missions</p>
              <h1 className="mt-3 text-4xl font-bold">Explore meaningful events</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-xl">
              <Sparkles size={16} />
              {events.length} opportunities waiting
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or location..."
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>
        </section>

        <section className="mt-8">
          {loading ? (
            <div className="rounded-3xl bg-white p-8 text-center text-slate-600 shadow-sm">Loading events...</div>
          ) : filteredEvents.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center text-slate-600 shadow-sm">No events found for your search.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} onApply={() => applyForEvent(event.id, event.title)} />
              ))}
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-full max-w-md rounded-[30px] bg-white p-8 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
                {getCelebrationData(selectedEvent.title).icon}
              </div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">You’re in!</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{getCelebrationData(selectedEvent.title).message}</p>
              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-6 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-500 px-6 py-3 font-semibold text-white"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}