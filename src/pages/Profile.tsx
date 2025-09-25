import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, LogOut, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

// Profile Component
export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    website: "",
    bio: "",
  });

  const { user, handleSignOut } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");

      const { error } = await supabase.from("profiles").upsert({
        id: user!.id,
        ...profile,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      setMessage("Profile updated successfully!");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-blue-50'>
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
              <Link to='settings'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='hover:bg-teal-100 transition-colors'
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

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='animate-in fade-in-0 slide-in-from-bottom-4 duration-1000'>
          <Card className='border-0 shadow-xl bg-white/90 backdrop-blur'>
            <CardHeader className='pb-6'>
              <div className='flex items-center space-x-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`}
                  />
                  <AvatarFallback className='text-xl'>
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className='text-2xl'>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your personal information and preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={updateProfile} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email Address</Label>
                    <Input
                      id='email'
                      type='email'
                      value={user?.email || ""}
                      disabled
                      className='bg-gray-50'
                    />
                    <p className='text-xs text-gray-500'>
                      Email cannot be changed
                    </p>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='username'>Username</Label>
                    <Input
                      id='username'
                      type='text'
                      placeholder='Choose a username'
                      value={profile.username}
                      onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })
                      }
                      className='transition-all duration-300 focus:ring-2 focus:ring-teal-500'
                    />
                  </div>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='full_name'>Full Name</Label>
                    <Input
                      id='full_name'
                      type='text'
                      placeholder='Your full name'
                      value={profile.full_name}
                      onChange={(e) =>
                        setProfile({ ...profile, full_name: e.target.value })
                      }
                      className='transition-all duration-300 focus:ring-2 focus:ring-teal-500'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='website'>Website</Label>
                    <Input
                      id='website'
                      type='url'
                      placeholder='https://yourwebsite.com'
                      value={profile.website}
                      onChange={(e) =>
                        setProfile({ ...profile, website: e.target.value })
                      }
                      className='transition-all duration-300 focus:ring-2 focus:ring-teal-500'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='bio'>Bio</Label>
                  <textarea
                    id='bio'
                    placeholder='Tell us about yourself'
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    rows={4}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300'
                  />
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

                <div className='flex space-x-4'>
                  <Button
                    type='submit'
                    disabled={loading}
                    className='bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl'
                  >
                    {loading ? (
                      <div className='flex items-center'>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                        Updating...
                      </div>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>

                  <Link to='/dashboard'>
                    <Button
                      type='button'
                      variant='outline'
                      className='hover:bg-gray-50 transition-all duration-300'
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
