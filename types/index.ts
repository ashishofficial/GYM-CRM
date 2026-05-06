export type Gender = "Male" | "Female" | "Other";

export type PlanDuration = "Monthly" | "Quarterly" | "Yearly";

export type PaymentStatus = "Paid" | "Pending" | "Failed";

export type PaymentMethod = "Card" | "Cash" | "UPI" | "Bank Transfer";

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: PlanDuration;
  durationDays: number;
  features: string[];
  popular?: boolean;
}

export interface MemberPlanHistory {
  id: string;
  planId: string;
  planName: string;
  startDate: string;
  endDate: string;
  pricePaid: number;
  discount: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  planName: string;
}

export interface Member {
  id: string;
  membershipId: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  dob: string;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContact: { name: string; phone: string; relation: string };
  joinDate: string;
  isActive: boolean;
  currentPlan: {
    planId: string;
    planName: string;
    price: number;
    duration: PlanDuration;
    startDate: string;
    expiryDate: string;
  } | null;
  planHistory: MemberPlanHistory[];
  payments: Payment[];
  notes: string[];
  lastVisit: string;
  attendanceThisMonth: number;
}

export interface Activity {
  id: string;
  type: "join" | "renewal" | "payment" | "plan-change" | "note";
  memberId: string;
  memberName: string;
  description: string;
  timestamp: string;
}

export interface Offer {
  id: string;
  name: string;
  type: "percentage" | "flat";
  value: number;
  description: string;
  active: boolean;
}
