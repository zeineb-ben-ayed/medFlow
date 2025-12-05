'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Activity } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "@/src/graphql/mutations";
import { LoginResponse, LoginVariables } from "@/src/interfaces/login";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation<LoginResponse, LoginVariables>(LOGIN_MUTATION);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { username, password },
      });

      if (!data?.login?.access_token) {
        toast.error("Invalid server response");
        return;
      }

      localStorage.setItem("access_token", data.login.access_token);
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center medical-gradient p-4">
      <div className="w-full max-w-md">
        <div className="medical-card p-8 space-y-6">

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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="your.email@clinic.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
