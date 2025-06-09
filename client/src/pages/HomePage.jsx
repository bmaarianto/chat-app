"use client";

import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-full h-screen p-2 sm:px-[5%] sm:py-[2%] lg:px-[10%] lg:py-[3%]">
      <div
        className={`bg-gray-900/60 backdrop-blur-md border border-gray-700/50 sm:border-2 rounded-2xl sm:rounded-3xl overflow-hidden h-full grid transition-all duration-300 relative shadow-2xl ${
          selectedUser
            ? "grid-cols-1 md:grid-cols-[280px_1fr_250px] lg:grid-cols-[320px_1fr_280px] xl:grid-cols-[350px_1fr_300px]"
            : "grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] xl:grid-cols-[350px_1fr]"
        }`}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
