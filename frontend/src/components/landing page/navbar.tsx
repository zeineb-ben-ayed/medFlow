"use client";

import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Image
        src="/logo/mediumlightlogo-withoutBG.png"
        width={250}
        height={250}
        alt="Logo"
      />
      <div className="hidden md:flex items-center gap-8">
        {["Features", "How It Works", "Testimonials"].map((t) => (
          <a
            key={t}
            href={`#${t.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" asChild>
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Get Started</Link>
        </Button>
      </div>
    </div>
  </nav>
);

export default Navbar;
