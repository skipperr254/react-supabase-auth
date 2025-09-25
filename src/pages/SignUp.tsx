import AuthDivider from "@/components/AuthDivider";
import GoogleAuthButton from "@/components/GoogleAuthButton";
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
import { AlertCircle, Eye, EyeOff, Lock, Mail, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Sign Up Component
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const { user } = useAuth();
  if (user) {
    navigate("/dashboard");
  }

  const handleSignUp = async (e: React.FormEvent) => {
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined, // Disable magic link
        },
      });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        setMessage("Please check your email for the OTP verification code.");
        navigate("/verify-otp", { state: { email, type: "signup" } });
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGoogle = async () => {
    setGoogleLoading(true);
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/dashboard",
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-1000'>
        <Card className='border-0 shadow-2xl bg-white/90 backdrop-blur'>
          <CardHeader className='space-y-1 pb-6'>
            <div className='flex items-center justify-center mb-4'>
              <div className='p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg'>
                <UserPlus className='h-6 w-6 text-white' />
              </div>
            </div>
            <CardTitle className='text-2xl text-center font-bold'>
              Create Account
            </CardTitle>
            <CardDescription className='text-center'>
              Sign up for your account using email or Google
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* Google Sign Up Button */}
            <GoogleAuthButton
              onGoogleAuth={signUpWithGoogle}
              loading={googleLoading}
              mode='signup'
              disabled={googleLoading}
            />
          </CardContent>

          <AuthDivider />

          <CardContent>
            <form onSubmit={handleSignUp} className='space-y-4'>
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
                    className='pl-10 transition-all duration-300 focus:ring-2 focus:ring-purple-500'
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
                    placeholder='Create a password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-purple-500'
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
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Confirm your password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className='pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-purple-500'
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

              {message && (
                <Alert
                  className={`animate-in slide-in-from-top-2 duration-300 ${
                    message.includes("email")
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <AlertCircle className='h-4 w-4' />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <Button
                type='submit'
                disabled={loading}
                className='w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                {loading ? (
                  <div className='flex items-center'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className='flex flex-col space-y-4'>
            <div className='text-center text-sm text-gray-600'>
              Already have an account?{" "}
              <Link to='/sign-in'>
                <button className='text-purple-600 hover:underline font-medium transition-all duration-300'>
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
