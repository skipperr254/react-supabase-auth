import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { Label } from "@/components/ui/label";
import {
  Lock,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/utils/supabase";
import { Link, useNavigate } from "react-router-dom";

// Reset Password Component
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setMessage("Password reset successful! Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-1000'>
        <Card className='border-0 shadow-2xl bg-white/90 backdrop-blur'>
          <CardHeader className='space-y-1 pb-6'>
            <div className='flex items-center justify-center mb-4'>
              <div className='p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg'>
                <Lock className='h-6 w-6 text-white' />
              </div>
            </div>
            <CardTitle className='text-2xl text-center font-bold'>
              Set New Password
            </CardTitle>
            <CardDescription className='text-center'>
              Create a new secure password for your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleResetPassword} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='password'>New Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter new password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-emerald-500'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Confirm new password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className='pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-emerald-500'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

              <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
                <div className='flex items-start'>
                  <Shield className='h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0' />
                  <div className='text-sm text-blue-700'>
                    <p className='font-medium mb-1'>Password Requirements:</p>
                    <ul className='text-xs space-y-1'>
                      <li>• At least 6 characters long</li>
                      <li>• Should contain a mix of letters and numbers</li>
                      <li>• Avoid common passwords</li>
                    </ul>
                  </div>
                </div>
              </div>

              {message && (
                <Alert
                  className={`animate-in slide-in-from-top-2 duration-300 ${
                    message.includes("successful")
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  {message.includes("successful") ? (
                    <CheckCircle className='h-4 w-4' />
                  ) : (
                    <AlertCircle className='h-4 w-4' />
                  )}
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <Button
                type='submit'
                disabled={loading || !password || !confirmPassword}
                className='w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                {loading ? (
                  <div className='flex items-center'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    Updating Password...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <Link to='/sign-in'>
              <button className='text-sm text-gray-500 hover:text-gray-700 transition-colors mx-auto'>
                ← Back to sign in
              </button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
