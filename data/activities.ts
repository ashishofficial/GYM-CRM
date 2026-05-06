import type { Activity } from "@/types";

export const activities: Activity[] = [
  {
    id: "a-1",
    type: "join",
    memberId: "m-008",
    memberName: "Isabella Romano",
    description: "Joined the gym with the Pro plan",
    timestamp: "2026-04-30T09:24:00",
  },
  {
    id: "a-2",
    type: "renewal",
    memberId: "m-006",
    memberName: "Maya Singh",
    description: "Renewed Student plan",
    timestamp: "2026-04-25T17:11:00",
  },
  {
    id: "a-3",
    type: "payment",
    memberId: "m-002",
    memberName: "Ava Patel",
    description: "Paid $199 for Elite plan (Loyalty offer applied)",
    timestamp: "2026-04-01T11:02:00",
  },
  {
    id: "a-4",
    type: "plan-change",
    memberId: "m-007",
    memberName: "Jordan Walsh",
    description: "Upgraded from Pro to Elite",
    timestamp: "2025-12-01T14:48:00",
  },
  {
    id: "a-5",
    type: "note",
    memberId: "m-001",
    memberName: "Liam Carter",
    description: "Trainer added a new note",
    timestamp: "2026-05-04T08:30:00",
  },
  {
    id: "a-6",
    type: "payment",
    memberId: "m-005",
    memberName: "Ethan Brooks",
    description: "Paid $79 via Bank Transfer",
    timestamp: "2026-02-21T10:00:00",
  },
];
