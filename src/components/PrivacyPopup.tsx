"use client";
import React, { useState, useEffect } from "react";

const PrivacyPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const accepted = localStorage.getItem("privacyAccepted");
    if (!accepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("privacyAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-5 text-center z-50">
      <p>
        Ta strona używa plików cookies oraz zbiera dane geolokalizacyjne w celu
        poprawy działania. Więcej informacji znajdziesz w naszej{" "}
        <a
          href="/polityka-prywatnosci.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline"
        >
          Polityce Prywatności
        </a>
        .
      </p>
      <button
        type="button"
        onClick={handleAccept}
        className="mt-4 px-5 py-2 bg-green-600 text-white border-none rounded cursor-pointer hover:bg-green-700"
      >
        Akceptuję
      </button>
    </div>
  );
};
export default PrivacyPopup;
