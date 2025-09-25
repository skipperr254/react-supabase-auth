import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/utils/supabase";
import { CheckCircle, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Forgot Password Component
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: undefined, // Disable magic link
      });

      if (error) throw error;

      setMessage("Check your email for the reset code");
      navigate("/verify-otp", { state: { email, type: "password-reset" } });
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-1000'>
        <Card className='border-0 shadow-2xl bg-white/90 backdrop-blur'>
          <CardHeader className='space-y-1 pb-6'>
            <div className='flex items-center justify-center mb-4'>
              <div className='p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg'>
                <Lock className='h-6 w-6 text-white' />
              </div>
            </div>
            <CardTitle className='text-2xl text-center font-bold'>
              Reset Password
            </CardTitle>
            <CardDescription className='text-center'>
              Enter your email to receive a reset code
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleForgotPassword} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='pl-10 transition-all duration-300 focus:ring-2 focus:ring-red-500'
                  />
                </div>
              </div>

              {message && (
                <Alert className='animate-in slide-in-from-top-2 duration-300 border-green-200 bg-green-50'>
                  <CheckCircle className='h-4 w-4' />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <Button
                type='submit'
                disabled={loading}
                className='w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                {loading ? (
                  <div className='flex items-center'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    Sending...
                  </div>
                ) : (
                  "Send Reset Code"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className='flex flex-col space-y-4'>
            <div className='text-center text-sm text-gray-600'>
              Remember your password?{" "}
              <Link to='/sign-in'>
                <button className='text-red-600 hover:underline font-medium transition-all duration-300'>
                  Sign in
                </button>
              </Link>
            </div>
            <Link to='/'>
              <button className='text-sm text-gray-500 hover:text-gray-700 transition-colors'>
                ← Back to home
              </button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
