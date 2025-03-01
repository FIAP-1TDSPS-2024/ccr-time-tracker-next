"use client";

import { useState } from "react";
import { LoginForm } from "@/components/home/LoginForm";
import { Popup } from "@/components/common/Popup";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");

  const handleShowPopup = (title: string, message: string) => {
    setPopupMessage(message);
    setPopupTitle(title);
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#d0d0d0]">
      <div className="flex-1 flex items-center justify-center">
        <LoginForm onShowPopup={handleShowPopup} />
      </div>

      {showPopup && (
        <Popup
          message={popupMessage}
          title={popupTitle}
          onClose={() => setShowPopup(false)}
        />
      )}

      <Footer />
    </div>
  );
}
