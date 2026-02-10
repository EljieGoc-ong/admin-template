import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthFeaturePanel } from "@/components/auth/AuthFeaturePanel";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthFooter } from "@/components/auth/AuthFooter";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <AuthFeaturePanel />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <AuthLogo />
          <AuthForm isLogin={isLogin} onToggleMode={() => setIsLogin(!isLogin)} />
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}
