"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import toast from "react-hot-toast";

import { login, isAuthenticated } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = login(email, password);

    if (!success) {
      toast.error("Invalid credentials");
      setLoading(false);
      return;
    }

    toast.success("Welcome back");

    router.replace("/dashboard");
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardContent className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Sign In</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Access the TDC Matchmaker Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              type="email"
              placeholder="Email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 rounded-lg border p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Demo Credentials
          </p>

          <p className="mt-2 text-sm">matchmaker@tdc.com</p>

          <p className="text-sm">password123</p>
        </div>
      </CardContent>
    </Card>
  );
}
