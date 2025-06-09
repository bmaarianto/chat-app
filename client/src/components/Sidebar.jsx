"use client";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { Search, Menu, MessageCircle, User, X } from "lucide-react";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-xl h-full p-4 sm:p-6 overflow-y-scroll text-white border border-gray-300/20 transition-all duration-300 ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-4 sm:pb-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3 group">
            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-violet-500 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-lg sm:text-xl font-bold text-white transition-colors duration-300 group-hover:text-violet-400">
              Blabber
            </span>
          </div>
          <div className="relative">
            <Menu
              className="w-5 h-5 cursor-pointer text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && (
              <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 animate-fade-in-scale">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Menu</span>
                  <X
                    className="w-3 h-3 cursor-pointer text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  />
                </div>
                <p
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer text-sm hover:text-violet-400 transition-all duration-200 hover:translate-x-1"
                >
                  Edit Profile
                </p>
                <hr className="my-2 border-t border-gray-500" />
                <p
                  onClick={() => logout()}
                  className="cursor-pointer text-sm hover:text-red-400 transition-all duration-200 hover:translate-x-1"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl flex items-center gap-3 py-2 sm:py-3 px-3 sm:px-4 mt-4 sm:mt-6 border border-slate-700/30 focus-within:border-violet-500/50 transition-all duration-300 focus-within:scale-[1.02]">
          <Search className="w-4 h-4 text-gray-400 transition-colors duration-300" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs sm:text-sm placeholder:text-[#C8C8C8] flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user),
                setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            key={index}
            className={`relative flex items-center gap-3 p-2 sm:p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-slate-800/40 hover:scale-[1.02] hover:translate-x-1 active:scale-95 ${
              selectedUser?._id === user._id &&
              "bg-violet-600/20 border border-violet-500/30 scale-[1.02]"
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative">
              {user?.profilePic ? (
                <img
                  src={user.profilePic || "/placeholder.svg"}
                  alt=""
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              )}
              {onlineUsers.includes(user._id) && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
              )}
            </div>
            <div className="flex flex-col leading-4 sm:leading-5 flex-1 min-w-0">
              <p className="text-sm sm:text-base truncate">{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offline</span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-xs h-4 w-4 sm:h-5 sm:w-5 flex justify-center items-center rounded-full bg-violet-500/50 animate-bounce">
                {unseenMessages[user._id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
