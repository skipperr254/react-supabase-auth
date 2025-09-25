import GoogleIcon from "./GoogleIcon";
import { Button } from "./ui/button";

type GoogleAuthButtonProps = {
  onGoogleAuth: () => void;
  loading: boolean;
  mode?: "signin" | "signup";
  disabled?: boolean;
};

// Google Auth Button Component
function GoogleAuthButton({
  onGoogleAuth,
  loading,
  mode = "signin",
  disabled = false,
}: GoogleAuthButtonProps) {
  return (
    <Button
      type='button'
      variant='outline'
      onClick={onGoogleAuth}
      disabled={loading || disabled}
      className='w-full border-2 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group'
    >
      <div className='flex items-center justify-center'>
        {loading ? (
          <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400 mr-3'></div>
        ) : (
          <GoogleIcon />
        )}
        <span className='ml-3 font-medium'>
          {loading
            ? `${mode === "signin" ? "Signing in" : "Signing up"}...`
            : `${mode === "signin" ? "Sign in" : "Sign up"} with Google`}
        </span>
      </div>
      <div className='absolute inset-0 bg-gradient-to-r from-blue-50 to-red-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
    </Button>
  );
}

export default GoogleAuthButton;
