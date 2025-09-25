// Auth Divider Component
function AuthDivider({ text = "or" }) {
  return (
    <div className='relative my-6'>
      <div className='absolute inset-0 flex items-center'>
        <div className='w-full border-t border-gray-300' />
      </div>
      <div className='relative flex justify-center text-sm'>
        <span className='bg-white px-4 text-gray-500 font-medium'>{text}</span>
      </div>
    </div>
  );
}

export default AuthDivider;
