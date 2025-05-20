// src/components/RadioPlayer.tsx
"use client"; // For App Router

import React, { useState, useRef, useEffect, ChangeEvent } from "react";

const stations: Record<string, string> = {
  Antyradio: "http://redir.atmcdn.pl/sc/o2/Eurozet/live/antyradio.livx",
  RMF_FM: "https://www.rmfon.pl/n/rmf_fm.pls",
  Radio_ZET: "https://stream.radiozet.pl/zet.aac",
};

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [currentStation, setCurrentStation] = useState<string>(
    Object.keys(stations)[0]
  );
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(stations[currentStation]);
    audioRef.current.volume = volume;

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []); // Removed currentStation and volume from deps for initial setup only

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = stations[currentStation];
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.load();
        audioRef.current
          .play()
          .catch((error) => console.error("Error playing audio:", error));
      }
    }
  }, [currentStation]); // Only re-run when currentStation changes

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, volume]); // Re-run when isPlaying or volume changes

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleStationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentStation(e.target.value);
  };

  return (
    <div className="radio-player">
      <h2>Odtwarzacz Radiowy</h2>
      <select value={currentStation} onChange={handleStationChange}>
        {Object.keys(stations).map((station) => (
          <option key={station} value={station}>
            {station}
          </option>
        ))}
      </select>
      <button onClick={togglePlayPause}>
        {isPlaying ? "Pauza" : "Odtwórz"}
      </button>
      <div>
        <label htmlFor="volume-control">Głośność: </label>
        <input
          id="volume-control"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div className="date-time">
        <p>Data: {currentDateTime.toLocaleDateString()}</p>
        <p>Godzina: {currentDateTime.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default RadioPlayer;
