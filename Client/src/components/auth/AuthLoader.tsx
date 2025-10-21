'use client';

export const AuthLoader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};