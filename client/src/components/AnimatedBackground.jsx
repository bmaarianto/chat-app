"use client";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-900">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-slate-700 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
      <div className="absolute -bottom-8 right-20 w-72 h-72 bg-slate-800 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-6000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>

      {/* Additional dark elements for more depth */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-slate-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-3000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gray-800 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-5000"></div>
    </div>
  );
};

export default AnimatedBackground;
