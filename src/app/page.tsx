"use client";

import React, { useState, useEffect } from "react";
import RadioPlayer from "@/components/RadioPlayer";
import PrivacyPopup from "@/components/PrivacyPopup";

interface BrowserInfo {
  vendor?: string;
  userAgent: string;
  platform: string;
}

export default function HomePage() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setLocation(pos.coords),
          (err) => console.warn("Geolokalizacja odrzucona.", err.message)
        );
      }

      setBrowserInfo({
        vendor: navigator.vendor, // Deprecated, but for consistency with instructions
        userAgent: navigator.userAgent,
        platform: navigator.platform,
      });
    }
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Internet Radio 4000</h1>
      </header>
      <main className="main-content">
        <RadioPlayer />
        {location && (
          <div className="location-info">
            <h3>Your approximate location:</h3>
            <p>Latitude: {location.latitude.toFixed(4)}</p>
            <p>Longitude: {location.longitude.toFixed(4)}</p>
          </div>
        )}
        {browserInfo && (
          <div className="browser-info">
            <h3>Browser info:</h3>
            {browserInfo.vendor && <p>AppName: {browserInfo.vendor}</p>}
            <p>User Agent: {browserInfo.userAgent}</p>
            <p>System: {browserInfo.platform}</p>
          </div>
        )}
      </main>
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Internet Radio 5000. All rights reserved.
        </p>
      </footer>
      <PrivacyPopup />
    </div>
  );
}
