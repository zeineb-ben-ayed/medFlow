"use client";

import Link from "next/link";

import { ArrowRight, Heart, Star } from "lucide-react";
import { Button } from "../ui/button";
import HeroStats from "./heroStats";

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
    <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Trusted by 500+ Clinics</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Manage Your Clinic <span className="text-primary">Smarter</span>{" "}
            with MedFlow
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
            Digitalize your clinic, manage patients, appointments, and billing
            effortlessly. The all-in-one platform designed for modern
            healthcare.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="text-base" asChild>
              <Link href="/register">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-accent border-2 border-background flex items-center justify-center"
                >
                  <span className="text-xs font-medium text-accent-foreground">
                    Dr
                  </span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                4.9/5 from 200+ reviews
              </p>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <HeroStats />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
