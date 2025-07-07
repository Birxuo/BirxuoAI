
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, LogOut, ChevronLeft, Shield, CreditCard, Bell, Settings, Clock, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch"; 
import Header from "@/components/Header";
import LoginButton from "@/components/LoginButton";

// Simulated credit usage data - in a real app, this would come from the backend
interface CreditUsage {
  total: number;
  used: number;
  dailyLimit: number;
  dailyUsed: number;
  lastUpdated: Date;
}

const Profile = () => {
  const {
    user,
    isLoading,
    updateUserEmail,
    updateUserPassword,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  
  // Security settings
  const [notifications, setNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  
  // Credits state (simulated)
  const [credits, setCredits] = useState<CreditUsage>({
    total: 396,
    used: 72,
    dailyLimit: 36,
    dailyUsed: 8,
    lastUpdated: new Date()
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await updateUserEmail(email);
      setEmail("");
    } else {
      toast({
        title: "Email required",
        description: "Please enter a valid email",
        variant: "destructive"
      });
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast({
        title: "Current password required",
        description: "Please enter your current password",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }
    
    await updateUserPassword(password);
    setPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
    toast({
      title: "Password updated",
      description: "Your password has been successfully updated"
    });
  };

  // Calculate credit percentages for progress bars
  const monthlyPercentage = Math.round((credits.used / credits.total) * 100);
  const dailyPercentage = Math.round((credits.dailyUsed / credits.dailyLimit) * 100);

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button variant="ghost" className="mb-6 group" onClick={() => navigate(-1)}>
            <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">User Profile</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>
            <LoginButton variant="destructive" size="sm" className="mt-4 md:mt-0">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </LoginButton>
          </div>
          
          <Tabs defaultValue="account" className="mt-6">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Account
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Security
              </TabsTrigger>
              <TabsTrigger value="credits" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Credits
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Preferences
              </TabsTrigger>
            </TabsList>
            
            {/* Account Tab */}
            <TabsContent value="account">
              <Card className="mb-8 shadow-md border-primary/20">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    View and update your account details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">User ID:</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">{user.id}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Email:</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">{user.email}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-8 border-primary/20">
                <CardHeader>
                  <CardTitle>Email Address</CardTitle>
                  <CardDescription>
                    Change your email address. You'll need to verify the new email.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateEmail} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">New Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder="Enter your new email" 
                        required 
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Updating..." : "Update Email"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Close Account</CardTitle>
                  <CardDescription className="text-destructive">
                    Permanently delete your account and all data. This action cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive">
                    Request Account Deletion
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="mb-8 shadow-md border-primary/20">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Update your password to secure your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        type="password" 
                        value={currentPassword} 
                        onChange={e => setCurrentPassword(e.target.value)} 
                        placeholder="Enter your current password" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">New Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Enter your new password" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm your new password" 
                        required 
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="mb-8 border-primary/20">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Enhance your account security with two-factor authentication.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="2fa">Two-Factor Authentication (2FA)</Label>
                      <p className="text-sm text-muted-foreground">
                        {twoFactorAuth 
                          ? "2FA is currently enabled for your account." 
                          : "Enable 2FA to add an extra layer of security."}
                      </p>
                    </div>
                    <Switch 
                      id="2fa" 
                      checked={twoFactorAuth} 
                      onCheckedChange={setTwoFactorAuth} 
                    />
                  </div>
                  
                  {twoFactorAuth && (
                    <Button className="mt-4" variant="outline">
                      Configure 2FA
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Session Security</CardTitle>
                  <CardDescription>
                    Manage your session timeout settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Login Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email alerts for new login activity
                        </p>
                      </div>
                      <Switch 
                        id="notifications" 
                        checked={notifications} 
                        onCheckedChange={setNotifications} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <select 
                        id="sessionTimeout" 
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(e.target.value)}
                        className="w-full p-2 rounded-md border border-input bg-background"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="240">4 hours</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Credits Tab */}
            <TabsContent value="credits">
              <Card className="mb-8 shadow-md border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" /> 
                    Credit Summary
                  </CardTitle>
                  <CardDescription>
                    Monitor your monthly and daily credit usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Monthly Credits</Label>
                        <span className="text-sm">{credits.used} / {credits.total}</span>
                      </div>
                      <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${monthlyPercentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <Clock className="inline h-3 w-3 mr-1" />
                        Resets on the 1st of next month
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Daily Credits</Label>
                        <span className="text-sm">{credits.dailyUsed} / {credits.dailyLimit}</span>
                      </div>
                      <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${dailyPercentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <Clock className="inline h-3 w-3 mr-1" />
                        Resets at midnight
                      </p>
                    </div>
                    
                    <div className="text-sm text-muted-foreground pt-2 border-t border-border">
                      <p className="flex items-center gap-1">
                        <Info className="h-4 w-4" />
                        Each message consumes 1 credit
                      </p>
                      <p className="mt-1">Last updated: {credits.lastUpdated.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Usage History</Button>
                  <Button>Purchase Additional Credits</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-md">
                      <p className="font-medium">Free Plan</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your account is currently on the free plan.
                      </p>
                      <Button className="mt-4" variant="outline">
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card className="mb-8 shadow-md border-primary/20">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates and alerts via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Product Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive news about product updates and features
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive marketing and promotional emails
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                  <CardDescription>
                    Customize the appearance of your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Interface Theme</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-[#121212]">
                          <span className="block mb-1">Dark</span>
                          <span className="block h-2 w-8 bg-primary rounded-full"></span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-[#f8f8f8] text-black">
                          <span className="block mb-1">Light</span>
                          <span className="block h-2 w-8 bg-primary rounded-full"></span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-gradient-to-b from-[#121212] to-[#2a2a2a]">
                          <span className="block mb-1">System</span>
                          <span className="block h-2 w-8 bg-primary rounded-full"></span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Accent Color</Label>
                      <div className="grid grid-cols-5 gap-2">
                        <Button variant="outline" className="h-10 w-10 p-0 rounded-full bg-purple-500"></Button>
                        <Button variant="outline" className="h-10 w-10 p-0 rounded-full bg-blue-500"></Button>
                        <Button variant="outline" className="h-10 w-10 p-0 rounded-full bg-green-500"></Button>
                        <Button variant="outline" className="h-10 w-10 p-0 rounded-full bg-amber-500"></Button>
                        <Button variant="outline" className="h-10 w-10 p-0 rounded-full bg-rose-500"></Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
