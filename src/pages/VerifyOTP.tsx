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
import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabaseAdmin } from "@/utils/supabase";

// OTP Verification Component
export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { email, type } = location.state as {
    email: string;
    type: "signup" | "password-reset";
  };

  console.log(email, type);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabaseAdmin.auth.verifyOtp({
        email,
        token: otp,
        type: type === "signup" ? "signup" : "recovery",
      });

      if (error) {
        console.log(error);
        throw error;
      }

      setMessage("Verification successful! Redirecting...");
      setTimeout(() => {
        if (type === "signup") {
          navigate("/dashboard");
        } else {
          navigate("/reset-password", { state: { email } });
        }
      }, 1500);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      if (type === "signup") {
        await supabaseAdmin.auth.resend({
          type: "signup",
          email: email,
        });
      } else {
        await supabaseAdmin.auth.resetPasswordForEmail(email);
      }
      setMessage("OTP resent to your email");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-1000'>
        <Card className='border-0 shadow-2xl bg-white/90 backdrop-blur'>
          <CardHeader className='space-y-1 pb-6'>
            <div className='flex items-center justify-center mb-4'>
              <div className='p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg'>
                <Mail className='h-6 w-6 text-white' />
              </div>
            </div>
            <CardTitle className='text-2xl text-center font-bold'>
              Verify Your Email
            </CardTitle>
            <CardDescription className='text-center'>
              We've sent a verification code to
              <br />
              <span className='font-medium text-gray-900'>{email}</span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerifyOTP} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='otp'>Verification Code</Label>
                <Input
                  id='otp'
                  type='text'
                  placeholder='Enter 6-digit code'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  className='text-center text-lg tracking-widest transition-all duration-300 focus:ring-2 focus:ring-orange-500'
                />
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
                disabled={loading || otp.length !== 6}
                className='w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                {loading ? (
                  <div className='flex items-center'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify Code"
                )}
              </Button>

              <div className='text-center'>
                <button
                  type='button'
                  onClick={resendOTP}
                  className='text-sm text-orange-600 hover:underline transition-all duration-300'
                >
                  Didn't receive the code? Resend
                </button>
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <Link to={type === "signup" ? "/sign-up" : "/forgot-password"}>
              <button className='text-sm text-gray-500 hover:text-gray-700 transition-colors mx-auto'>
                ← Back
              </button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
