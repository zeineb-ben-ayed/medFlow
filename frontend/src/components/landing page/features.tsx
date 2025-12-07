import { Users, CalendarDays, FileText, CreditCard } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Patient Management",
    description:
      "Complete patient records, medical history, documents, and CRUD operations in one place.",
    color: "primary",
  },
  {
    icon: CalendarDays,
    title: "Appointments & Calendar",
    description:
      "Smart scheduling, automatic reminders, rescheduling, and conflict detection.",
    color: "info",
  },
  {
    icon: FileText,
    title: "Consultations & Prescriptions",
    description:
      "Digital notes, prescription generation, PDF export, and consultation history.",
    color: "success",
  },
  {
    icon: CreditCard,
    title: "Billing & Payments",
    description:
      "Invoice generation, payment tracking, Stripe integration, and revenue reports.",
    color: "warning",
  },
];

const Features = () => (
  <section id="features" className="py-20 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Everything You Need to Run Your Clinic
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Powerful features designed specifically for healthcare professionals
          to streamline operations and improve patient care.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="group relative bg-card rounded-3xl p-8 shadow-sm border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300"
          >
            {f.title === "Billing & Payments" && (
              <span className="absolute top-8 right-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase  animate-float">
                SOON
              </span>
            )}

            <div
              className={`w-14 h-14 rounded-2xl bg-${f.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
            >
              <f.icon className={`w-7 h-7 text-${f.color}`} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {f.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
