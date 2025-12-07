"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Home, HeadsetIcon, Stethoscope, Heart, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";

const NotFound = () => {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-accent-light/30 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[15%] left-[10%] animate-float opacity-20">
                    <Heart className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute top-[25%] right-[15%] animate-float opacity-15" style={{ animationDelay: "1s" }}>
                    <Stethoscope className="w-16 h-16 text-accent" />
                </div>
                <div className="absolute bottom-[20%] left-[20%] animate-float opacity-20" style={{ animationDelay: "2s" }}>
                    <Activity className="w-10 h-10 text-primary" />
                </div>
                <div className="absolute bottom-[30%] right-[10%] animate-float opacity-15" style={{ animationDelay: "3s" }}>
                    <Heart className="w-8 h-8 text-accent" />
                </div>

                <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center max-w-lg mx-auto">
                <div className="mb-8 relative">
                    <div className="w-48 h-48 mx-auto relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/20 rounded-full animate-pulse-soft" />
                        <div className="absolute inset-4 bg-card rounded-full shadow-xl flex items-center justify-center border border-border/50">
                            <Image
                                src="/logo/iconlightNoBg.png"
                                alt="App Icon"
                                width={90}
                                height={90}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                <h1 className="text-8xl md:text-9xl font-bold text-primary mb-2 tracking-tighter">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-md mx-auto">
                    The page you are looking for does not exist or may have been moved. Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        asChild
                        size="lg"
                        className="rounded-2xl px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                        <Link href="/dashboard" className="flex items-center">
                            <Home className="w-5 h-5 mr-2" />
                            Go Back to Dashboard
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="rounded-2xl px-8 py-6 text-base font-medium border-2 hover:bg-secondary transition-all duration-300"
                    >
                        <a href="mailto:support@medflow.com" className="flex items-center">
                            <HeadsetIcon className="w-5 h-5 mr-2" />
                            Contact Support
                        </a>
                    </Button>
                </div>

                <p className="mt-12 text-sm text-muted-foreground">
                    Error code: 404 • Path: <code className="bg-muted px-2 py-1 rounded-md text-xs">{pathname}</code>
                </p>
            </div>
        </div>
    );
};

export default NotFound;