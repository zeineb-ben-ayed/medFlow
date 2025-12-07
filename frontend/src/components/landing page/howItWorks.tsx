const steps = [
  {
    step: 1,
    title: "Sign Up",
    description: "Create your account and set up your clinic profile",
  },
  {
    step: 2,
    title: "Add Your Team",
    description: "Invite doctors, nurses, and staff members",
  },
  {
    step: 3,
    title: "Import Patients",
    description: "Easily migrate existing patient records",
  },
  {
    step: 4,
    title: "Start Growing",
    description: "Track revenue and grow your practice",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Get Started in Minutes
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Simple onboarding process to get your clinic up and running quickly.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <div key={i} className="relative text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6 relative z-10">
              {s.step}
            </div>
            {i < 3 && (
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-accent" />
            )}
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {s.title}
            </h3>
            <p className="text-muted-foreground">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
