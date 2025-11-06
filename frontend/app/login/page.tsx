'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Activity } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - router based on role
    toast.success(`Welcome back!`);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center medical-gradient p-4">
      <div className="w-full max-w-md">
        <div className="medical-card p-8 space-y-6">
          {/* Logo */}
          {/* <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">MedFlow</h1>
          </div> */}

          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-57 h-auto flex items-center justify-center">
              <img
                src="logo\mediumlightlogo.png"
                alt="MedFlow Logo"
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@clinic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Register here
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Secure healthcare management platform
        </p>
      </div>
    </div>
  );
};

export default Login;
