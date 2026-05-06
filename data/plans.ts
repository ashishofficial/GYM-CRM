import type { Plan } from "@/types";

export const plans: Plan[] = [
  {
    id: "plan-basic",
    name: "Basic",
    price: 29,
    duration: "Monthly",
    durationDays: 30,
    features: [
      "Access to gym floor",
      "Locker room access",
      "1 group class / week",
      "Standard equipment",
    ],
  },
  {
    id: "plan-pro",
    name: "Pro",
    price: 79,
    duration: "Quarterly",
    durationDays: 90,
    popular: true,
    features: [
      "Unlimited gym access",
      "All group classes",
      "1 PT session / month",
      "Sauna & steam room",
      "Nutrition guidance",
    ],
  },
  {
    id: "plan-elite",
    name: "Elite",
    price: 249,
    duration: "Yearly",
    durationDays: 365,
    features: [
      "Everything in Pro",
      "4 PT sessions / month",
      "Custom training plan",
      "Body composition analysis",
      "Guest passes (4/month)",
      "Premium locker",
    ],
  },
  {
    id: "plan-student",
    name: "Student",
    price: 19,
    duration: "Monthly",
    durationDays: 30,
    features: [
      "Off-peak gym access",
      "2 group classes / week",
      "Valid student ID required",
    ],
  },
];

export const offers = [
  {
    id: "offer-1",
    name: "New Year Special",
    type: "percentage" as const,
    value: 20,
    description: "20% off any plan",
    active: true,
  },
  {
    id: "offer-2",
    name: "Refer a Friend",
    type: "flat" as const,
    value: 25,
    description: "$25 off when you refer a friend",
    active: true,
  },
  {
    id: "offer-3",
    name: "Summer Body",
    type: "percentage" as const,
    value: 15,
    description: "15% off Pro & Elite plans",
    active: true,
  },
  {
    id: "offer-4",
    name: "Loyalty Discount",
    type: "flat" as const,
    value: 50,
    description: "$50 off renewals over 1 year",
    active: false,
  },
];
