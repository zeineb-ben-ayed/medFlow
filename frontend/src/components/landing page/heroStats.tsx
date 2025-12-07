import {
  Users,
  CalendarDays,
  Activity,
  CreditCard,
  ChevronRight,
  Stethoscope,
  Heart,
  CheckCircle,
} from "lucide-react";

const HeroStats = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/20 rounded-[2rem] transform rotate-3" />
    <div className="relative bg-card rounded-[2rem] p-8 shadow-xl border border-border">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary rounded-2xl p-6">
          <Users className="w-8 h-8 text-primary mb-3" />
          <p className="font-semibold text-foreground">1,234</p>
          <p className="text-sm text-muted-foreground">Active Patients</p>
        </div>
        <div className="bg-secondary rounded-2xl p-6">
          <CalendarDays className="w-8 h-8 text-primary mb-3" />
          <p className="font-semibold text-foreground">89</p>
          <p className="text-sm text-muted-foreground">
            Today&apos;s Appointments
          </p>
        </div>
        <div className="bg-secondary rounded-2xl p-6">
          <Activity className="w-8 h-8 text-success mb-3" />
          <p className="font-semibold text-success">+24%</p>
          <p className="text-sm text-muted-foreground">Growth This Month</p>
        </div>
        <div className="bg-secondary rounded-2xl p-6">
          <CreditCard className="w-8 h-8 text-info mb-3" />
          <p className="font-semibold text-foreground">$45.2K</p>
          <p className="text-sm text-muted-foreground">Revenue</p>
        </div>
      </div>

      <div className="mt-4 bg-secondary/50 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Next Appointment</p>
            <p className="text-sm text-muted-foreground">
              Dr. Sarah Wilson • 10:30 AM
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div className="absolute -top-4 -right-4 w-20 h-20 bg-success/20 rounded-2xl flex items-center justify-center animate-float">
        <CheckCircle className="w-10 h-10 text-success" />
      </div>
      <div
        className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Heart className="w-8 h-8 text-primary" />
      </div>
    </div>
  </>
);

export default HeroStats;
