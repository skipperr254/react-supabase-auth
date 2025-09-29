import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Home,
  User,
  Settings,
  LogOut,
  Mail,
  Shield,
  CheckCircle,
  Sparkles,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { Link } from "react-router-dom";

// Dashboard Component
export default function Dashboard() {
  const { user, handleSignOut } = useAuth();

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
      <nav className='bg-white/80 backdrop-blur border-b shadow-sm sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg'>
                <Shield className='h-5 w-5 text-white' />
              </div>
              <span className='font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                SecureAuth
              </span>
            </div>

            <div className='flex items-center space-x-4'>
              <Link to='/profile'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='hover:bg-indigo-100 transition-colors'
                >
                  <User className='h-4 w-4 mr-2' />
                  Profile
                </Button>
              </Link>
              <Link to='/settings'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='hover:bg-indigo-100 transition-colors'
                >
                  <Settings className='h-4 w-4 mr-2' />
                  Settings
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

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='animate-in fade-in-0 slide-in-from-bottom-4 duration-1000'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Welcome back, {user?.email?.split("@")[0]}!
            </h1>
            <p className='text-gray-600'>
              Here's what's happening with your account today.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
            <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Account Status
                    </p>
                    <div className='flex items-center mt-2'>
                      <CheckCircle className='h-5 w-5 text-green-500 mr-2' />
                      <span className='text-lg font-semibold text-gray-900'>
                        Active
                      </span>
                    </div>
                  </div>
                  <div className='p-3 bg-green-100 rounded-full'>
                    <Shield className='h-6 w-6 text-green-600' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Last Sign In
                    </p>
                    <p className='text-lg font-semibold text-gray-900 mt-2'>
                      {user?.last_sign_in_at
                        ? new Date(user.last_sign_in_at).toLocaleDateString()
                        : "Today"}
                    </p>
                  </div>
                  <div className='p-3 bg-blue-100 rounded-full'>
                    <LogIn className='h-6 w-6 text-blue-600' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur md:col-span-2 lg:col-span-1'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-gray-600'>
                      Email Verified
                    </p>
                    <div className='flex items-center mt-2'>
                      <CheckCircle className='h-5 w-5 text-green-500 mr-2' />
                      <span className='text-lg font-semibold text-gray-900'>
                        Verified
                      </span>
                    </div>
                  </div>
                  <div className='p-3 bg-purple-100 rounded-full'>
                    <Mail className='h-6 w-6 text-purple-600' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='grid lg:grid-cols-2 gap-6'>
            <Card className='border-0 shadow-lg bg-white/80 backdrop-blur'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Sparkles className='h-5 w-5 mr-2 text-purple-600' />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common tasks and settings</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Link to='/profile'>
                  <Button
                    variant='outline'
                    className='w-full justify-start hover:bg-gray-50 transition-all duration-300'
                  >
                    <User className='h-4 w-4 mr-2' />
                    Update Profile
                  </Button>
                </Link>
                <Link to='/settings'>
                  <Button
                    variant='outline'
                    className='w-full justify-start hover:bg-gray-50 transition-all duration-300'
                  >
                    <Settings className='h-4 w-4 mr-2' />
                    Account Settings
                  </Button>
                </Link>
                <Button
                  variant='outline'
                  className='w-full justify-start hover:bg-gray-50 transition-all duration-300'
                >
                  <Shield className='h-4 w-4 mr-2' />
                  Security Settings
                </Button>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg bg-white/80 backdrop-blur'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Home className='h-5 w-5 mr-2 text-indigo-600' />
                  Account Overview
                </CardTitle>
                <CardDescription>Your account information</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`}
                    />
                    <AvatarFallback>
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium'>{user?.email}</p>
                    <Badge variant='secondary' className='text-xs'>
                      {user?.email_confirmed_at ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div className='text-sm text-gray-600'>
                  <p>
                    Account created:{" "}
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "Recently"}
                  </p>
                  <p>User ID: {user?.id?.substring(0, 8)}...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
