import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  isLogin: boolean;
  onToggleMode: () => void;
}

export function AuthForm({ isLogin, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = isLogin 
        ? await login(email, password, rememberMe)
        : await signup(email, password);
      
      if (success) {
        navigate("/");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMode = () => {
    setError("");
    onToggleMode();
  };

  return (
    <Card className="border-border/50 bg-card/95 shadow-2xl backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">
          {isLogin ? "Welcome back" : "Create your account"}
        </CardTitle>
        <CardDescription className="text-base">
          {isLogin
            ? "Enter your credentials to access your dashboard"
            : "Sign up to start managing your system"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              {isLogin && (
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() => setError("Password reset feature coming soon!")}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLoading}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-11 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {isLogin ? "Signing in..." : "Creating account..."}
              </span>
            ) : (
              isLogin ? "Sign in to dashboard" : "Create account"
            )}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                {isLogin ? "New to our platform?" : "Already have an account?"}
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleToggleMode}
              className="text-sm font-medium text-primary hover:underline"
              disabled={isLoading}
            >
              {isLogin ? "Create a new account" : "Sign in instead"}
            </button>
          </div>
        </div>

        {isLogin && (
          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-muted-foreground text-center">
              Demo credentials: Use any email and password (min 6 chars)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
