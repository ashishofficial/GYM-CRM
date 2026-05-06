"use client";

import { ChartCard } from "@/components/dashboard/ChartCard";
import { Input } from "@/components/ui/Input";
import { initialAdminTasks } from "@/data/analytics";
import { cn, formatDate } from "@/lib/utils";
import { CheckSquare, Plus, Square, Trash2 } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
}

export function AdminTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialAdminTasks);
  const [draft, setDraft] = useState("");

  const todayISO = () => new Date().toISOString().slice(0, 10);

  const add = () => {
    if (!draft.trim()) return;
    setTasks((prev) => [
      { id: `t-${Date.now()}`, text: draft.trim(), done: false, createdAt: todayISO() },
      ...prev,
    ]);
    setDraft("");
  };

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const pending = tasks.filter((t) => !t.done).length;

  return (
    <ChartCard
      title="Admin tasks"
      description="Reminders and follow-ups"
      icon={CheckSquare}
      actions={
        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
          {pending} open
        </span>
      }
      bodyClassName="space-y-3"
    >
      <div className="flex gap-2">
        <Input
          placeholder="Add a reminder..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button
          onClick={add}
          disabled={!draft.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white shadow-soft transition-colors hover:bg-brand-700 disabled:bg-brand-300"
          aria-label="Add task"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <ul className="space-y-1.5">
        {tasks.length === 0 ? (
          <li className="rounded-lg border border-dashed border-slate-200 bg-slate-50/40 p-6 text-center text-xs text-slate-500">
            No tasks yet
          </li>
        ) : (
          tasks.map((t) => (
            <li
              key={t.id}
              className="group flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/40 px-3 py-2 transition-colors hover:bg-slate-50"
            >
              <button
                onClick={() => toggle(t.id)}
                className="mt-0.5 text-slate-400 transition-colors hover:text-brand-600"
                aria-label="Toggle task"
              >
                {t.done ? (
                  <CheckSquare className="h-4 w-4 text-brand-600" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
              </button>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "text-xs",
                    t.done ? "text-slate-400 line-through" : "text-slate-700",
                  )}
                >
                  {t.text}
                </p>
                <p className="text-[10px] text-slate-400">{formatDate(t.createdAt)}</p>
              </div>
              <button
                onClick={() => remove(t.id)}
                className="opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100"
                aria-label="Delete task"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))
        )}
      </ul>
    </ChartCard>
  );
}
