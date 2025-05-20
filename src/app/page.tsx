"use client";

import React, { useState, useEffect } from "react";
import RadioPlayer from "@/components/RadioPlayer"; // Using path alias
import PrivacyPopup from "@/components/PrivacyPopup";

interface BrowserInfo {
  vendor?: string;
  userAgent: string;
  platform: string;
}

// GeolocationCoordinates is a built-in type
// interface GeolocationCoordinates {
//   latitude: number;
//   longitude: number;
//   altitude: number | null;
//   accuracy: number;
//   altitudeAccuracy: number | null;
//   heading: number | null;
//   speed: number | null;
// }

export default function HomePage() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure code runs only in browser
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setLocation(pos.coords),
          (err) => console.warn("Geolokalizacja odrzucona.", err.message)
        );
      }

      setBrowserInfo({
        vendor: navigator.appName, // Deprecated, but for consistency with instructions
        userAgent: navigator.userAgent,
        platform: navigator.platform,
      });
    }
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Radio Internetowe</h1>
      </header>
      <main className="main-content">
        <RadioPlayer />
        {location && (
          <div className="location-info">
            <h3>Twoja lokalizacja (przybliżona):</h3>
            <p>Szerokość: {location.latitude.toFixed(4)}</p>
            <p>Długość: {location.longitude.toFixed(4)}</p>
          </div>
        )}
        {browserInfo && (
          <div className="browser-info">
            <h3>Informacje o przeglądarce:</h3>
            {browserInfo.vendor && (
              <p>AppName (deprecated): {browserInfo.vendor}</p>
            )}
            <p>User Agent: {browserInfo.userAgent}</p>
            <p>System: {browserInfo.platform}</p>
          </div>
        )}
      </main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Radio Internetowe. Wszelkie prawa
          zastrzeżone.
        </p>
      </footer>
      <PrivacyPopup />
    </div>
  );
}
