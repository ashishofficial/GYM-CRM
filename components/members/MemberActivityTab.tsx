"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Member } from "@/types";
import { formatDate } from "@/lib/utils";
import { CalendarDays, ClipboardCheck, StickyNote } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function MemberActivityTab({ member }: { member: Member }) {
  const [notes, setNotes] = useState(member.notes);
  const [draft, setDraft] = useState("");

  const addNote = () => {
    if (!draft.trim()) return;
    setNotes((prev) => [draft.trim(), ...prev]);
    setDraft("");
    toast.success("Note added");
  };

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            <span className="inline-flex items-center gap-2">
              <StickyNote className="h-4 w-4 text-slate-400" />
              Admin notes
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Textarea
              placeholder="Add a note about this member..."
              rows={3}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className="mt-2 flex justify-end">
              <Button size="sm" onClick={addNote} disabled={!draft.trim()}>
                Save note
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {notes.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                No notes yet.
              </p>
            ) : (
              notes.map((note, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-sm text-slate-700"
                >
                  {note}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                Last visit
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tracking-tight text-slate-900">
              {formatDate(member.lastVisit)}
            </p>
            <p className="mt-1 text-xs text-slate-500">Checked in via main entrance.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <span className="inline-flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-slate-400" />
                Attendance this month
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-semibold tracking-tight text-slate-900">
                {member.attendanceThisMonth}
              </p>
              <p className="mb-1 text-sm text-slate-500">/ 30 days</p>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700"
                style={{ width: `${Math.min(100, (member.attendanceThisMonth / 30) * 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
