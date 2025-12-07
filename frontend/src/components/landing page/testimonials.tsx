import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "MedFlow has transformed how we manage our clinic. Patient scheduling is now a breeze, and we've reduced no-shows by 40%.",
    name: "Dr. Sarah Wilson",
    role: "Family Medicine",
    avatar: "SW",
  },
  {
    quote:
      "The billing integration saved us hours every week. Everything is automated and our revenue tracking is crystal clear.",
    name: "Dr. Michael Chen",
    role: "Pediatrics",
    avatar: "MC",
  },
  {
    quote:
      "Finally, a platform that understands healthcare. The consultation notes and prescription system is incredibly intuitive.",
    name: "Dr. Emily Rodriguez",
    role: "Internal Medicine",
    avatar: "ER",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-20 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Loved by Healthcare Professionals
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See what doctors and clinic managers are saying about MedFlow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-card rounded-3xl p-8 shadow-sm border border-border"
          >
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-warning text-warning" />
              ))}
            </div>
            <p className="text-foreground mb-6 leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {t.avatar}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
