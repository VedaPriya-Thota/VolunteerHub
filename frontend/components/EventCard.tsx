import { motion } from "framer-motion";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";

type EventCardProps = {
  event: {
    id: number;
    title: string;
    description: string;
    location: string;
    event_date?: string;
    capacity?: number | string;
  };
  onApply: (id: number) => void;
};

const categoryStyles: Record<string, string> = {
  environment: "from-emerald-500 to-green-600",
  health: "from-sky-500 to-cyan-600",
  community: "from-teal-500 to-emerald-600",
};

const getCategory = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("tree") || lower.includes("plant") || lower.includes("green")) return "environment";
  if (lower.includes("blood") || lower.includes("health") || lower.includes("donation")) return "health";
  return "community";
};

export default function EventCard({ event, onApply }: EventCardProps) {
  const category = getCategory(event.title);
  const gradient = categoryStyles[category];

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg shadow-slate-200/60"
    >
      <div className={`h-48 bg-linear-to-br ${gradient} p-6`}>
        <div className="flex h-full items-start justify-between">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl">
            {category}
          </span>
          <div className="rounded-2xl bg-white/10 p-3 text-white backdrop-blur-xl">
            <Sparkles size={18} />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-semibold text-slate-900">{event.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">{event.description}</p>

        <div className="mt-5 space-y-2 text-sm text-slate-600">
          <p className="flex items-center gap-2"><MapPin size={16} className="text-emerald-600" /> {event.location}</p>
          <p className="flex items-center gap-2"><CalendarDays size={16} className="text-emerald-600" /> {event.event_date?.split("T")[0]}</p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">{event.capacity} spots available</p>
          <button
            onClick={() => onApply(event.id)}
            className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-600"
          >
            Join Mission
          </button>
        </div>
      </div>
    </motion.article>
  );
}