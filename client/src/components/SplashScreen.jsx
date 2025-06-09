"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onFinish();
      }, 500); // Wait for fade out animation
    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-violet-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <MessageCircle className="relative w-20 h-20 text-violet-500 animate-bounce" />
        </div>

        {/* App Name */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
            Blabber
          </h1>
          <p className="text-gray-400 text-lg animate-fade-in-delay">
            Connect and chat with anyone, anywhere
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex space-x-2 mt-4">
          <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
