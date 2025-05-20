// src/components/PrivacyPopup.tsx
"use client";
import React, { useState, useEffect } from "react";
// Optional: import Link from 'next/link'; for internal privacy policy page

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
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#333",
        color: "white",
        padding: "20px",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      <p>
        Ta strona używa plików cookies oraz zbiera dane geolokalizacyjne w celu
        poprawy działania. Więcej informacji znajdziesz w naszej{" "}
        {/* <Link href="/polityka-prywatnosci" style={{color: 'lightblue'}}>Polityce Prywatności</Link>. */}
        <a
          href="/polityka-prywatnosci.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "lightblue" }}
        >
          Polityce Prywatności
        </a>
        .
        {/* Create a static polityka-prywatnosci.html in public/ or a Next.js page */}
      </p>
      <button
        onClick={handleAccept}
        style={{
          padding: "10px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Akceptuję
      </button>
    </div>
  );
};
export default PrivacyPopup;
