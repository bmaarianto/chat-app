"use client";

import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { User, LogOut, ImageIcon } from "lucide-react";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  // Get all the images from the messages and set them to state
  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-xl text-white w-full relative overflow-y-scroll border-l border-slate-700/50 transition-all duration-300 ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        <div className="pt-6 sm:pt-8 flex flex-col items-center gap-3 sm:gap-4 text-sm font-light mx-auto px-4 sm:px-6">
          <div className="relative group">
            {selectedUser?.profilePic ? (
              <img
                src={selectedUser.profilePic || "/placeholder.svg"}
                alt=""
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-violet-500/30 transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center border-4 border-violet-500/30 transition-transform duration-300 group-hover:scale-110">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            )}
            {onlineUsers.includes(selectedUser._id) && (
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
            )}
          </div>
          <div className="text-center">
            <h1 className="px-4 sm:px-10 text-lg sm:text-xl font-medium mx-auto flex items-center justify-center gap-2 transition-colors duration-300 hover:text-violet-400">
              {selectedUser.fullName}
            </h1>
            <p className="px-4 sm:px-10 mx-auto text-xs sm:text-sm text-gray-300 mt-2">
              {selectedUser.bio}
            </p>
          </div>
        </div>

        <hr className="border-[#FFFFFF50] my-4 sm:my-6 mx-4 sm:mx-6" />

        <div className="px-4 sm:px-5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="w-4 h-4 text-violet-400" />
            <p className="font-medium">Media</p>
            <span className="text-xs text-gray-400">({msgImages.length})</span>
          </div>

          {msgImages.length > 0 ? (
            <div className="max-h-[200px] sm:max-h-[250px] overflow-y-scroll grid grid-cols-2 gap-2 sm:gap-4 opacity-80">
              {msgImages.map((url, index) => (
                <div
                  key={index}
                  onClick={() => window.open(url)}
                  className="cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:opacity-100 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={url || "/placeholder.svg"}
                    alt=""
                    className="w-full h-16 sm:h-20 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">No media shared yet</p>
            </div>
          )}
        </div>

        <button
          onClick={() => logout()}
          className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-none text-xs sm:text-sm font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;
