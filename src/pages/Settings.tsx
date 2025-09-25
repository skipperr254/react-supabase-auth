import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  User,
  LogOut,
  Mail,
  Lock,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

// Settings Component
export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { handleSignOut } = useAuth();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setMessage("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        // Note: In a real app, you'd want to handle account deletion on the server side
        setMessage("Account deletion would be handled by your backend");
      } catch (error: any) {
        setMessage(error.message);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50'>
      <nav className='bg-white/80 backdrop-blur border-b shadow-sm sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-3'>
              <Link to='/dashboard'>
                <Button
                  variant='ghost'
                  className='hover:bg-gray-100 transition-colors'
                >
                  ← Dashboard
                </Button>
              </Link>
            </div>

            <div className='flex items-center space-x-4'>
              <Link to='/profile'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='hover:bg-slate-100 transition-colors'
                >
                  <User className='h-4 w-4 mr-2' />
                  Profile
                </Button>
              </Link>
              <Button
                variant='ghost'
                size='sm'
                onClick={handleSignOut}
                className='hover:bg-red-100 hover:text-red-600 transition-colors'
              >
                <LogOut className='h-4 w-4 mr-2' />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='animate-in fade-in-0 slide-in-from-bottom-4 duration-1000'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Account Settings
            </h1>
            <p className='text-gray-600'>
              Manage your account security and preferences
            </p>
          </div>

          <Tabs defaultValue='security' className='space-y-6'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='security'>Security</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger>
              <TabsTrigger value='danger'>Danger Zone</TabsTrigger>
            </TabsList>

            <TabsContent value='security'>
              <Card className='border-0 shadow-xl bg-white/90 backdrop-blur'>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <Shield className='h-5 w-5 mr-2 text-blue-600' />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Update your password and security preferences
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handlePasswordChange} className='space-y-6'>
                    <div className='space-y-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='newPassword'>New Password</Label>
                        <div className='relative'>
                          <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <Input
                            id='newPassword'
                            type={showNewPassword ? "text" : "password"}
                            placeholder='Enter new password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className='pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500'
                          />
                          <button
                            type='button'
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className='absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors'
                          >
                            {showNewPassword ? (
                              <EyeOff className='h-4 w-4' />
                            ) : (
                              <Eye className='h-4 w-4' />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='confirmPassword'>
                          Confirm New Password
                        </Label>
                        <div className='relative'>
                          <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                          <Input
                            id='confirmPassword'
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder='Confirm new password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500'
                          />
                          <button
                            type='button'
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className='absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors'
                          >
                            {showConfirmPassword ? (
                              <EyeOff className='h-4 w-4' />
                            ) : (
                              <Eye className='h-4 w-4' />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {message && (
                      <Alert
                        className={`animate-in slide-in-from-top-2 duration-300 ${
                          message.includes("success")
                            ? "border-green-200 bg-green-50"
                            : "border-red-200 bg-red-50"
                        }`}
                      >
                        {message.includes("success") ? (
                          <CheckCircle className='h-4 w-4' />
                        ) : (
                          <AlertCircle className='h-4 w-4' />
                        )}
                        <AlertDescription>{message}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type='submit'
                      disabled={loading || !newPassword || !confirmPassword}
                      className='bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl'
                    >
                      {loading ? (
                        <div className='flex items-center'>
                          <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                          Updating...
                        </div>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='notifications'>
              <Card className='border-0 shadow-xl bg-white/90 backdrop-blur'>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <Mail className='h-5 w-5 mr-2 text-green-600' />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose what notifications you'd like to receive
                  </CardDescription>
                </CardHeader>

                <CardContent className='space-y-6'>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between p-4 border rounded-lg'>
                      <div>
                        <h4 className='font-medium'>Security Alerts</h4>
                        <p className='text-sm text-gray-600'>
                          Get notified about security-related activities
                        </p>
                      </div>
                      <input
                        type='checkbox'
                        defaultChecked
                        className='h-4 w-4'
                      />
                    </div>

                    <div className='flex items-center justify-between p-4 border rounded-lg'>
                      <div>
                        <h4 className='font-medium'>Account Updates</h4>
                        <p className='text-sm text-gray-600'>
                          Receive updates about your account
                        </p>
                      </div>
                      <input
                        type='checkbox'
                        defaultChecked
                        className='h-4 w-4'
                      />
                    </div>

                    <div className='flex items-center justify-between p-4 border rounded-lg'>
                      <div>
                        <h4 className='font-medium'>Marketing Emails</h4>
                        <p className='text-sm text-gray-600'>
                          Get updates about new features and offers
                        </p>
                      </div>
                      <input type='checkbox' className='h-4 w-4' />
                    </div>
                  </div>

                  <Button className='bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl'>
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='danger'>
              <Card className='border-0 shadow-xl bg-white/90 backdrop-blur border-red-200'>
                <CardHeader>
                  <CardTitle className='flex items-center text-red-600'>
                    <AlertCircle className='h-5 w-5 mr-2' />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions
                  </CardDescription>
                </CardHeader>

                <CardContent className='space-y-6'>
                  <div className='p-4 border border-red-200 rounded-lg bg-red-50'>
                    <h4 className='font-medium text-red-800 mb-2'>
                      Delete Account
                    </h4>
                    <p className='text-sm text-red-600 mb-4'>
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    <Button
                      onClick={handleDeleteAccount}
                      variant='outline'
                      className='border-red-300 text-red-600 hover:bg-red-100 hover:border-red-400 transition-all duration-300'
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
