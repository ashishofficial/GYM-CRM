export const membershipGrowth = [
  { month: "Jun", new: 4, total: 42 },
  { month: "Jul", new: 6, total: 48 },
  { month: "Aug", new: 5, total: 53 },
  { month: "Sep", new: 8, total: 61 },
  { month: "Oct", new: 7, total: 68 },
  { month: "Nov", new: 9, total: 77 },
  { month: "Dec", new: 6, total: 83 },
  { month: "Jan", new: 11, total: 94 },
  { month: "Feb", new: 8, total: 102 },
  { month: "Mar", new: 10, total: 112 },
  { month: "Apr", new: 13, total: 125 },
  { month: "May", new: 9, total: 134 },
];

export const revenueByMonth = [
  { month: "Jun", revenue: 5840 },
  { month: "Jul", revenue: 6210 },
  { month: "Aug", revenue: 5990 },
  { month: "Sep", revenue: 7320 },
  { month: "Oct", revenue: 6880 },
  { month: "Nov", revenue: 8450 },
  { month: "Dec", revenue: 7610 },
  { month: "Jan", revenue: 9220 },
  { month: "Feb", revenue: 8740 },
  { month: "Mar", revenue: 9980 },
  { month: "Apr", revenue: 10620 },
  { month: "May", revenue: 8430 },
];

export const attendanceLast7Days = [
  { day: "Mon", count: 38 },
  { day: "Tue", count: 52 },
  { day: "Wed", count: 47 },
  { day: "Thu", count: 61 },
  { day: "Fri", count: 58 },
  { day: "Sat", count: 73 },
  { day: "Sun", count: 41 },
];

export const initialAdminTasks = [
  { id: "t-1", text: "Follow up with Sophia Reyes about renewal", done: false, createdAt: "2026-05-04" },
  { id: "t-2", text: "Restock protein bars at front desk", done: false, createdAt: "2026-05-05" },
  { id: "t-3", text: "Review trainer schedule for June", done: true, createdAt: "2026-05-02" },
];

// Monthly recurring revenue trend (last 8 weeks)
export const mrrSparkline = [7420, 7680, 7920, 8120, 8350, 8430, 8580, 8740];

// Goal tracking
export const monthlyGoals = {
  revenue: { current: 8430, target: 12000, label: "Revenue", unit: "$" },
  newMembers: { current: 9, target: 15, label: "New members", unit: "" },
  renewals: { current: 18, target: 22, label: "Renewals", unit: "" },
};

// Peak hours heatmap data — 7 days × 14 hours (6am-7pm)
export const peakHoursData = {
  hours: ["6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p"],
  rows: [
    { day: "Mon", values: [10, 35, 60, 70, 50, 30, 20, 25, 30, 40, 55, 80, 90, 50] },
    { day: "Tue", values: [15, 40, 65, 75, 55, 35, 22, 28, 32, 45, 60, 85, 95, 55] },
    { day: "Wed", values: [12, 38, 62, 72, 52, 32, 21, 26, 31, 42, 58, 82, 92, 52] },
    { day: "Thu", values: [14, 42, 68, 78, 58, 38, 24, 30, 34, 47, 62, 88, 98, 58] },
    { day: "Fri", values: [13, 40, 65, 75, 55, 35, 23, 29, 33, 45, 60, 75, 80, 45] },
    { day: "Sat", values: [25, 60, 85, 95, 90, 70, 45, 50, 55, 60, 65, 70, 60, 30] },
    { day: "Sun", values: [20, 50, 75, 85, 80, 60, 40, 45, 50, 55, 50, 45, 35, 20] },
  ],
};

// Live check-ins state
export const liveCheckIns = {
  current: 23,
  capacity: 80,
  recentMemberIds: ["m-002", "m-005", "m-007", "m-001", "m-006", "m-008"],
  minutesAgo: [4, 8, 21, 34, 47, 58],
};

// Cohort retention — % of members from each join cohort still active
export const cohortRetention = [
  { cohort: "Nov '25", joined: 12, retained: 11, percentage: 92 },
  { cohort: "Dec '25", joined: 18, retained: 16, percentage: 89 },
  { cohort: "Jan '26", joined: 22, retained: 19, percentage: 86 },
  { cohort: "Feb '26", joined: 15, retained: 14, percentage: 93 },
  { cohort: "Mar '26", joined: 21, retained: 18, percentage: 86 },
  { cohort: "Apr '26", joined: 19, retained: 15, percentage: 79 },
];

// Churn rate
export const churnRate = {
  current: 2.4,
  previous: 3.1,
};
