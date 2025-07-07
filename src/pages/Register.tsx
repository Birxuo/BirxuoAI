import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, Terminal, Zap, Home, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const {
    signUp,
    signInWithGoogle,
    isLoading
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await signUp(email, password);
  };

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return <>
      <header className="py-5 sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Terminal className="h-6 w-6 text-primary group-hover:opacity-0 transition-opacity duration-300" />
                <Zap className="h-6 w-6 text-primary absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="font-bold tracking-wider text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/70 group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300">
                BIRXUO
              </span>
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              <NavigationMenuItem>
                <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-foreground/90 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/10">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/login" className="flex items-center gap-1.5 text-sm font-medium text-foreground/90 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/10">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center p-4 bg-background">
        <motion.div className="w-full max-w-md" variants={containerVariants} initial="hidden" animate="visible">
          <Card className="border-border/5 backdrop-blur-sm bg-black/40">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-2">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-6 w-6 text-primary" />
                  <span className="font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-2xl">
                    BIRXUO
                  </span>
                </div>
              </div>
              <CardTitle className="font-bold text-center text-lg">Create an account</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Enter your email and password to register
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="name@example.com" className="pl-10" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                </motion.div>
                
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="password" className="text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </motion.div>
                
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                  </div>
                </motion.div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-4">
                <motion.div variants={itemVariants} className="w-full">
                  <Button type="submit" className="w-full transition-all group" disabled={isLoading}>
                    {isLoading ? "Signing up..." : (
                      <>
                        Sign Up
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.div>
                
                <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </motion.p>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </>;
};
export default Register;
