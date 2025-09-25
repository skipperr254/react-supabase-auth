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
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase";
import { AlertCircle, Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Sign In Componen
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();
  if (user) {
    navigate("/dashboard");
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate("/dashboard");
      // Navigation handled by auth state change
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-1000'>
        <Card className='border-0 shadow-2xl bg-white/90 backdrop-blur'>
          <CardHeader className='space-y-1 pb-6'>
            <div className='flex items-center justify-center mb-4'>
              <div className='p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg'>
                <LogIn className='h-6 w-6 text-white' />
              </div>
            </div>
            <CardTitle className='text-2xl text-center font-bold'>
              Welcome Back
            </CardTitle>
            <CardDescription className='text-center'>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignIn} className='space-y-4'>
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
                    className='pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500'
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

              {message &&
                !message.toLowerCase().includes("email not confirmed") && (
                  <Alert className='animate-in slide-in-from-top-2 duration-300 border-red-200 bg-red-50'>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}

              {message &&
                message.toLowerCase().includes("email not confirmed") && (
                  <Alert className='animate-in slide-in-from-top-2 duration-300 border-red-200 bg-red-50'>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription className='flex items-center justify-between'>
                      {message}
                      <button
                        onClick={() => {
                          navigate("/verify-otp", {
                            state: { email, type: "signup" },
                          });
                        }}
                        className='ml-1 text-blue-600 hover:underline font-medium transition-all duration-300'
                      >
                        Verify Now
                      </button>
                    </AlertDescription>
                  </Alert>
                )}

              <div className='text-right'>
                <Link to='/forgot-password'>
                  <button
                    type='button'
                    className='text-sm text-blue-600 hover:underline transition-all duration-300'
                  >
                    Forgot password?
                  </button>
                </Link>
              </div>

              <Button
                type='submit'
                disabled={loading}
                className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                {loading ? (
                  <div className='flex items-center'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className='flex flex-col space-y-4'>
            <div className='text-center text-sm text-gray-600'>
              Don't have an account?{" "}
              <Link to='/sign-up'>
                <button className='text-blue-600 hover:underline font-medium transition-all duration-300'>
                  Sign up
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
