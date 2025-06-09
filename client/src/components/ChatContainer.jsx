"use client";

import { useContext, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  HelpCircle,
  ImageIcon,
  Send,
  User,
  MessageCircle,
} from "lucide-react";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;

    setIsTyping(true);
    await sendMessage({ text: input.trim() });
    setInput("");
    setIsTyping(false);
  };

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full relative backdrop-blur-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4 px-4 sm:px-6 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <ArrowLeft
          onClick={() => setSelectedUser(null)}
          className="md:hidden w-5 h-5 sm:w-6 sm:h-6 cursor-pointer text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
        />
        <div className="relative">
          {selectedUser.profilePic ? (
            <img
              src={selectedUser.profilePic || "/placeholder.svg"}
              alt=""
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          )}
          {onlineUsers.includes(selectedUser._id) && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base sm:text-lg text-white font-medium truncate">
            {selectedUser.fullName}
          </p>
          {onlineUsers.includes(selectedUser._id) ? (
            <p className="text-xs text-green-400">Online</p>
          ) : (
            <p className="text-xs text-gray-400">Offline</p>
          )}
        </div>
        <HelpCircle className="max-md:hidden w-5 h-5 text-gray-400 hover:text-gray-300 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95" />
      </div>

      {/* Chat Area */}
      <div className="flex flex-col h-[calc(100%-120px)] sm:h-[calc(100%-140px)] p-2 sm:p-3 pb-4 sm:pb-6 overflow-y-auto scrollbar-hide">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 mb-4 sm:mb-6 animate-slide-in ${
              msg.senderId !== authUser._id ? "justify-start" : "justify-end"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {msg.senderId !== authUser._id && (
              <div className="flex-shrink-0">
                {selectedUser?.profilePic ? (
                  <img
                    src={selectedUser.profilePic || "/placeholder.svg"}
                    alt=""
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
              </div>
            )}

            <div
              className={`flex flex-col ${
                msg.senderId === authUser._id ? "items-end" : "items-start"
              } max-w-[70%] sm:max-w-[60%]`}
            >
              {msg.image ? (
                <img
                  src={msg.image || "/placeholder.svg"}
                  alt=""
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover border border-gray-700 rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => window.open(msg.image)}
                />
              ) : (
                <div
                  className={`p-2 sm:p-3 text-xs sm:text-sm font-light rounded-2xl break-words transition-all duration-300 hover:scale-[1.02] ${
                    msg.senderId === authUser._id
                      ? "bg-violet-500/30 text-white rounded-br-md"
                      : "bg-slate-700/50 text-white rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1 px-1">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>

            {msg.senderId === authUser._id && (
              <div className="flex-shrink-0">
                {authUser?.profilePic ? (
                  <img
                    src={authUser.profilePic || "/placeholder.svg"}
                    alt=""
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 mb-4 animate-fade-in">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
            </div>
            <span className="text-xs text-gray-400">Sending...</span>
          </div>
        )}
        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom Area */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50">
        <div className="flex-1 flex items-center bg-slate-800/60 backdrop-blur-sm px-3 sm:px-4 rounded-xl border border-slate-700/30 focus-within:border-violet-500/50 transition-all duration-300 focus-within:scale-[1.02]">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Send a message"
            className="flex-1 text-xs sm:text-sm p-2 sm:p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label
            htmlFor="image"
            className="cursor-pointer p-1.5 sm:p-2 hover:bg-slate-700/30 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-violet-400 transition-colors duration-300" />
          </label>
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!input.trim()}
          className="p-2 sm:p-2.5 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 text-gray-400 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl max-md:hidden p-8">
      <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-violet-500 animate-pulse" />
      <p className="text-lg sm:text-xl font-medium text-white text-center">
        Chat anytime, anywhere
      </p>
      <p className="text-sm text-gray-400 text-center">
        Select a conversation to start messaging
      </p>
    </div>
  );
};

export default ChatContainer;
