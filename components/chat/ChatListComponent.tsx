import React, { useState } from "react";
import ConversationComponent from "./ConversationComponent";

const Chat = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeUser, setAciveuser] = useState(0);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-full">
      {/* Left sidebar */}
      
      {/* Main content */}
      {activeUser === 0 ? (
        <div className="text-bold w-full mt-40 flex justify-center">
          No Chat Selected Yet
        </div>
      ) : (
        <div className="flex-1 h-full">
          <ConversationComponent />
        </div>
      )}
    </div>
  );
};

export default function ChatListComponent() {
  return (
    <>
      <div className="container mx-auto p-4">
        <Chat />
      </div>
    </>
  );
}
