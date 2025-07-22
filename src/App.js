import React, { useState, useEffect } from 'react';
import './App.css';
import TopicSelector from './components/TopicSelector';
import SentenceList from './components/SentenceList';
import MediaCenter from './components/MediaCenter';
import TypingArea from './components/TypingArea';
import HistoryPanel from './components/HistoryPanel';
import { sampleData } from './data/sampleData';

function App() {
  // State management
  const [selectedTopic, setSelectedTopic] = useState(sampleData.topics[0]);
  const [selectedSentence, setSelectedSentence] = useState(sampleData.topics[0].sentences[0]);
  const [learningMode, setLearningMode] = useState('full'); // 'full' or 'fillBlank'
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('explanation');
  const [history, setHistory] = useState([]);
  const [statistics, setStatistics] = useState({
    totalAttempts: 0,
    correctAttempts: 0,
    accuracy: 0
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('spellingAppHistory');
    const savedStats = localStorage.getItem('spellingAppStats');
    const savedTheme = localStorage.getItem('spellingAppTheme');
    
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    
    if (savedStats) {
      setStatistics(JSON.parse(savedStats));
    }
    
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('spellingAppTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('spellingAppHistory', JSON.stringify(history));
  }, [history]);

  // Save statistics to localStorage
  useEffect(() => {
    localStorage.setItem('spellingAppStats', JSON.stringify(statistics));
  }, [statistics]);

  // Handler functions
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setSelectedSentence(topic.sentences[0]);
  };

  const handleSentenceSelect = (sentence) => {
    setSelectedSentence(sentence);
  };

  const handleModeChange = (mode) => {
    setLearningMode(mode);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const addToHistory = (attempt) => {
    const newAttempt = {
      ...attempt,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    
    setHistory(prev => [newAttempt, ...prev.slice(0, 49)]); // Keep last 50 attempts
    
    // Update statistics
    setStatistics(prev => {
      const newTotal = prev.totalAttempts + 1;
      const newCorrect = prev.correctAttempts + (attempt.isCorrect ? 1 : 0);
      return {
        totalAttempts: newTotal,
        correctAttempts: newCorrect,
        accuracy: Math.round((newCorrect / newTotal) * 100)
      };
    });
  };

  return (
    <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">📚</span>
            English Spelling Learning App
          </h1>
          <div className="header-controls">
            <button
              className={`mode-toggle ${learningMode === 'full' ? 'active' : ''}`}
              onClick={() => handleModeChange('full')}
              aria-label="Full sentence mode"
            >
              Full Sentence
            </button>
            <button
              className={`mode-toggle ${learningMode === 'fillBlank' ? 'active' : ''}`}
              onClick={() => handleModeChange('fillBlank')}
              aria-label="Fill in the blank mode"
            >
              Fill Blanks
            </button>
            <button
              className="theme-toggle"
              onClick={handleThemeToggle}
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} theme`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="layout-container">
          {/* Left Panel - Topic Selector and Sentence List */}
          <aside className="left-panel">
            <TopicSelector
              topics={sampleData.topics}
              selectedTopic={selectedTopic}
              onTopicSelect={handleTopicSelect}
            />
            <SentenceList
              sentences={selectedTopic.sentences}
              selectedSentence={selectedSentence}
              onSentenceSelect={handleSentenceSelect}
            />
          </aside>

          {/* Center Panel - Media and Typing */}
          <section className="center-panel">
            <MediaCenter 
              sentence={selectedSentence}
              learningMode={learningMode}
            />
            <TypingArea
              sentence={selectedSentence}
              learningMode={learningMode}
              onAttemptComplete={addToHistory}
            />
          </section>

          {/* Right Panel - History and Information */}
          <aside className="right-panel">
            <HistoryPanel
              activeTab={activeTab}
              onTabChange={setActiveTab}
              sentence={selectedSentence}
              history={history}
              statistics={statistics}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;