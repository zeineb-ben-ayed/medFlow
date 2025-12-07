import {
  Users,
  UserCircle,
  Calendar,
  DollarSign,
  Settings,
  FileText,
  UserPlus,
  BarChart3,
  ClipboardList,
  Receipt,
  CheckCircle2,
  Phone,
} from "lucide-react";
export type MetricType = {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: string; positive: boolean };
  variant?: "default" | "primary" | "accent" | "info" | "success" | "warning";
};
export type ChartType = {
  title: string;
  subtitle?: string;
  data: any[];
  type?: "area" | "bar";
  dataKey: string;
  xAxisKey?: string;
  color?: string;
};

export const navItems = [
  { title: "Dashboard", href: "/admin", icon: BarChart3 },
  { title: "Patients", href: "/patients", icon: Users },
  { title: "Doctors", href: "/admin/doctors", icon: UserCircle },
  { title: "Receptionists", href: "/admin/receptionists", icon: ClipboardList },
  { title: "Appointments", href: "/appointments", icon: Calendar },
  { title: "Billing", href: "/admin/billing", icon: Receipt },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export const appointmentData = [
  { name: "Mon", appointments: 45 },
  { name: "Tue", appointments: 52 },
  { name: "Wed", appointments: 38 },
  { name: "Thu", appointments: 65 },
  { name: "Fri", appointments: 48 },
  { name: "Sat", appointments: 32 },
  { name: "Sun", appointments: 18 },
];

export const revenueData = [
  { name: "Jan", revenue: 42000 },
  { name: "Feb", revenue: 38000 },
  { name: "Mar", revenue: 51000 },
  { name: "Apr", revenue: 47000 },
  { name: "May", revenue: 53000 },
  { name: "Jun", revenue: 58000 },
];

export const departmentOverview = [
  { dept: "General Medicine", doctors: 8, patients: 342 },
  { dept: "Pediatrics", doctors: 4, patients: 156 },
  { dept: "Cardiology", doctors: 3, patients: 98 },
  { dept: "Orthopedics", doctors: 5, patients: 187 },
];

export const metrics: MetricType[] = [
  {
    title: "Total Patients",
    value: "1,284",
    subtitle: "Active records",
    icon: Users,
    trend: { value: "12% this month", positive: true },
    variant: "primary",
  },
  {
    title: "Total Doctors",
    value: "24",
    subtitle: "8 specialists",
    icon: UserCircle,
    trend: { value: "2 new this quarter", positive: true },
    variant: "accent",
  },
  {
    title: "Receptionists",
    value: "6",
    subtitle: "All active",
    icon: ClipboardList,
    variant: "info",
  },
  {
    title: "Monthly Revenue",
    value: "$58,420",
    subtitle: "June 2024",
    icon: DollarSign,
    trend: { value: "8.3% vs last month", positive: true },
    variant: "success",
  },
];

export const charts: ChartType[] = [
  {
    title: "Weekly Appointments",
    subtitle: "Patient visits this week",
    data: appointmentData,
    type: "bar",
    dataKey: "appointments",
    color: "hsl(350, 35%, 42%)",
  },
  {
    title: "Revenue Trend",
    subtitle: "Monthly revenue (2024)",
    data: revenueData,
    type: "area",
    dataKey: "revenue",
    color: "hsl(142, 71%, 45%)",
  },
];

export const quickActions = [
  {
    title: "Add Patient",
    description: "Register new patient",
    icon: UserPlus,
  },
  {
    title: "Add Staff",
    description: "New team member",
    icon: Users,
  },
  {
    title: "View Reports",
    description: "Analytics & insights",
    icon: FileText,
  },
  {
    title: "Clinic Settings",
    description: "Configuration",
    icon: Settings,
  },
];

export const recentActivity = [
  { action: "New patient registered", time: "2 min ago", type: "patient" },
  {
    action: "Dr. Smith completed consultation",
    time: "15 min ago",
    type: "doctor",
  },
  { action: "Invoice #1234 paid", time: "32 min ago", type: "billing" },
  {
    action: "Appointment rescheduled",
    time: "1 hour ago",
    type: "appointment",
  },
  { action: "New staff member added", time: "2 hours ago", type: "staff" },
];

export const metricCards: MetricType[] = [
  {
    title: "Today's Appointments",
    value: "24",
    subtitle: "4 waiting, 8 checked-in",
    icon: Calendar,
    variant: "primary",
  },
  {
    title: "New Patients Today",
    value: "5",
    subtitle: "3 registered",
    icon: UserPlus,
    variant: "accent",
  },
  {
    title: "Pending Payments",
    value: "$520",
    subtitle: "3 invoices",
    icon: DollarSign,
    variant: "warning",
  },
  {
    title: "Check-ins Complete",
    value: "12",
    subtitle: "50% of today",
    icon: CheckCircle2,
    variant: "success",
  },
];

export const quickActionsR = [
  {
    title: "Register Patient",
    description: "New registration",
    icon: UserPlus,
    // variant: "primary",
  },
  {
    title: "Confirm Appointment",
    description: "Send reminder",
    icon: CheckCircle2,
    // variant: "accent",
  },
  {
    title: "Generate Invoice",
    description: "Create billing",
    icon: Receipt,
    // variant: undefined,
  },
  {
    title: "Contact Patient",
    description: "Call or message",
    icon: Phone,
    // variant: undefined,
  },
];

export const todayAppointments = [
  {
    time: "09:00 AM",
    patient: "John Miller",
    doctor: "Dr. Wilson",
    type: "Follow-up",
    status: "checked-in",
    phone: "(555) 123-4567",
  },
  {
    time: "09:30 AM",
    patient: "Emma Wilson",
    doctor: "Dr. Smith",
    type: "Consultation",
    status: "in-progress",
    phone: "(555) 234-5678",
  },
  {
    time: "10:00 AM",
    patient: "Michael Brown",
    doctor: "Dr. Wilson",
    type: "Check-up",
    status: "waiting",
    phone: "(555) 345-6789",
  },
  {
    time: "10:30 AM",
    patient: "Sarah Davis",
    doctor: "Dr. Johnson",
    type: "Follow-up",
    status: "confirmed",
    phone: "(555) 456-7890",
  },
  {
    time: "11:00 AM",
    patient: "James Johnson",
    doctor: "Dr. Wilson",
    type: "New Patient",
    status: "pending",
    phone: "(555) 567-8901",
  },
  {
    time: "11:30 AM",
    patient: "Lisa Anderson",
    doctor: "Dr. Smith",
    type: "Consultation",
    status: "confirmed",
    phone: "(555) 678-9012",
  },
];

export const pendingPayments = [
  {
    patient: "Robert Taylor",
    amount: "$150.00",
    date: "Dec 5, 2024",
    invoice: "INV-1234",
  },
  {
    patient: "Jennifer White",
    amount: "$275.00",
    date: "Dec 4, 2024",
    invoice: "INV-1233",
  },
  {
    patient: "David Lee",
    amount: "$95.00",
    date: "Dec 3, 2024",
    invoice: "INV-1232",
  },
];
