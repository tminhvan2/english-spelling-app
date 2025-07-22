import React, { useState, useRef, useEffect } from 'react';
import './MediaCenter.css';

const MediaCenter = ({ sentence, learningMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(0.8);
  
  const speechSynthRef = useRef(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
    }
    
    // Cleanup on unmount
    return () => {
      if (speechSynthRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayAudio = () => {
    if (!speechSupported) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const textToSpeak = learningMode === 'fillBlank' 
      ? sentence.fillInBlank.replace(/___+/g, 'blank')
      : sentence.text;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Configure speech settings
    utterance.rate = playbackRate;
    utterance.volume = volume;
    utterance.pitch = 1;
    utterance.lang = 'en-US';

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      console.error('Speech synthesis error');
    };

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleStopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handlePauseResume = () => {
    if (window.speechSynthesis.speaking) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.pause();
      }
    }
  };

  const displayText = learningMode === 'fillBlank' 
    ? sentence.fillInBlank 
    : sentence.text;

  return (
    <div className="media-center">
      <div className="media-header">
        <h3 className="media-title">Audio & Practice</h3>
        <div className="difficulty-indicator">
          <span className={`difficulty-level ${sentence.difficulty.toLowerCase()}`}>
            {sentence.difficulty}
          </span>
        </div>
      </div>

      {/* Video Placeholder */}
      <div className="video-placeholder">
        <div className="placeholder-content">
          <div className="placeholder-icon">🎥</div>
          <p className="placeholder-text">Video placeholder</p>
          <small className="placeholder-subtitle">
            Future feature: Visual learning content
          </small>
        </div>
      </div>

      {/* Sentence Display */}
      <div className="sentence-display">
        <div className="sentence-text">
          {displayText.split(' ').map((word, index) => (
            <span 
              key={index} 
              className={`word ${word.includes('_') ? 'blank-word' : ''}`}
            >
              {word}
            </span>
          ))}
        </div>
        <div className="sentence-info">
          <span className="word-count">
            {sentence.text.split(' ').length} words
          </span>
          <span className="category">
            {sentence.category}
          </span>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="audio-controls">
        <div className="main-controls">
          <button
            className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={isPlaying ? handleStopAudio : handlePlayAudio}
            disabled={!speechSupported}
            aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
          >
            {isPlaying ? '⏹️' : '▶️'}
          </button>
          
          <button
            className="control-btn"
            onClick={handlePauseResume}
            disabled={!isPlaying || !speechSupported}
            aria-label="Pause/Resume audio"
          >
            ⏸️
          </button>
          
          <button
            className="control-btn"
            onClick={handlePlayAudio}
            disabled={!speechSupported}
            aria-label="Repeat audio"
          >
            🔄
          </button>
        </div>

        {/* Audio Settings */}
        <div className="audio-settings">
          <div className="setting-group">
            <label htmlFor="playback-rate" className="setting-label">
              Speed: {playbackRate}x
            </label>
            <input
              id="playback-rate"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              className="setting-slider"
            />
          </div>
          
          <div className="setting-group">
            <label htmlFor="volume" className="setting-label">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="setting-slider"
            />
          </div>
        </div>

        {!speechSupported && (
          <div className="audio-error">
            <p>⚠️ Speech synthesis not supported in this browser</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaCenter;