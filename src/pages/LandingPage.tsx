import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Settings,
  Shield,
  ArrowRight,
  Sparkles,
  UserPlus,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";

// Landing Page Component
export default function LandingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='max-w-4xl w-full'>
        <div className='text-center mb-12 animate-in fade-in-0 duration-1000'>
          <div className='flex items-center justify-center mb-6'>
            <div className='p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg animate-pulse'>
              <Shield className='h-8 w-8 text-white' />
            </div>
          </div>
          <h1 className='text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4'>
            SecureAuth
          </h1>
          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
            Experience seamless authentication with OTP verification, secure
            password management, and beautiful user experience.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-4 duration-1000 delay-300'>
            <Link to='/sign-up'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group'
              >
                <UserPlus className='mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300' />
                Get Started
                <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300' />
              </Button>
            </Link>

            <Link to='/sign-in'>
              <Button
                variant='outline'
                size='lg'
                className='border-2 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300'
              >
                <LogIn className='mr-2 h-5 w-5' />
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className='grid md:grid-cols-3 gap-6 mb-12 animate-in slide-in-from-bottom-8 duration-1000 delay-500'>
          {[
            {
              icon: Shield,
              title: "Secure OTP",
              description: "Email-based OTP verification for enhanced security",
            },
            {
              icon: Sparkles,
              title: "Beautiful UI",
              description:
                "Modern design with smooth animations and transitions",
            },
            {
              icon: Settings,
              title: "Full Featured",
              description: "Complete auth flow with profile management",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur'
            >
              <CardContent className='p-6 text-center'>
                <feature.icon className='h-12 w-12 mx-auto mb-4 text-purple-600' />
                <h3 className='font-semibold text-lg mb-2'>{feature.title}</h3>
                <p className='text-gray-600'>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
