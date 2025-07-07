
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut, Terminal, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface LoginButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
  showLogo?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ 
  variant = "default", 
  size = "default",
  className,
  children,
  showLogo = false
}) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleClick = () => {
    if (user) {
      if (children) {
        // If children are provided, assume this is for signout
        signOut();
      } else {
        // If no children, navigate to profile
        navigate("/profile");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      className={className}
      onClick={handleClick}
    >
      {user ? (
        <>
          {children || (
            <>
              <User className="mr-2 h-4 w-4" />
              Profile
            </>
          )}
        </>
      ) : (
        <>
          {children || (
            <>
              {showLogo && (
                <div className="flex items-center mr-2">
                  <Terminal className="h-4 w-4 mr-1" />
                  <span className="font-bold text-xs">BIRXUO</span>
                </div>
              )}
              <LogIn className={`${showLogo ? '' : 'mr-2'} h-4 w-4`} />
              Sign In
            </>
          )}
        </>
      )}
    </Button>
  );
};

export default LoginButton;
