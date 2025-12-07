import {
  Stethoscope,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import Image from "next/image";
const icons = [
  { name: "twitter", component: Twitter },
  { name: "linkedin", component: Linkedin },
  { name: "facebook", component: Facebook },
];
const Footer = () => (
  <footer className="bg-secondary py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div>
          {/* <div className="flex items-center gap-2 mb-4"> */}
          <Image
            src="/logo/mediumlightlogo-withoutBG.png"
            width={200}
            height={200}
            className="mb-6"
            alt="Logo"
          />
          {/* </div> */}
          <p className="text-muted-foreground mb-6">
            The modern clinic management platform for healthcare professionals.
          </p>
          <div className="flex gap-4">
            {icons.map(({ name, component: Icon }) => (
              <a
                key={name}
                href="#"
                className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label={name}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Product</h4>
          <ul className="space-y-3">
            {["Features", "Pricing", "Integrations", "Updates"].map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Company</h4>
          <ul className="space-y-3">
            {["About", "Blog", "Careers", "Press"].map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" /> medflow@gmail.com
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" /> +216 22 123 567
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" /> Avenue de Liberté, Tunis
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground text-sm">
          © 2025 MedFlow. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
