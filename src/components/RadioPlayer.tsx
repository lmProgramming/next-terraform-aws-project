"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";

const stations: Record<string, string> = {
  Antyradio: "http://redir.atmcdn.pl/sc/o2/Eurozet/live/antyradio.livx",
  "Radio ZET": "https://n-4-6.dcs.redcdn.pl/sc/o2/Eurozet/live/audio.livx",
  "Polskie Radio": "http://stream4.nadaje.com:9212/radiokatowice",
  "Eska Wrocław": "https://waw.ic.smcdn.pl/2180-1.mp3",
};

const CLOCK_UPDATE_INTERVAL = 1000;

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [currentStation, setCurrentStation] = useState<string>(
    Object.keys(stations)[0]
  );
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [hasMounted, setHasMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHasMounted(true);
    audioRef.current = new Audio(stations[currentStation]);
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentStation, volume]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, CLOCK_UPDATE_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
  }, [currentStation, isPlaying, volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

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
      <h2>Radio Player 3000</h2>
      <select value={currentStation} onChange={handleStationChange}>
        {Object.keys(stations).map((station) => (
          <option key={station} value={station}>
            {station}
          </option>
        ))}
      </select>
      <button
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div>
        <label htmlFor="volume-control">Volume: </label>
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
        {hasMounted && (
          <>
            <p>Date: {currentDateTime.toLocaleDateString()}</p>
            <p>Time: {currentDateTime.toLocaleTimeString()}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default RadioPlayer;
