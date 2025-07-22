import React from 'react';
import './HistoryPanel.css';

const HistoryPanel = ({ activeTab, onTabChange, sentence, history, statistics }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const renderExplanationTab = () => (
    <div className="explanation-content">
      <div className="vocabulary-section">
        <h4 className="section-title">📚 Vocabulary</h4>
        <div className="vocabulary-list">
          {sentence.vocabulary.map((item, index) => (
            <div key={index} className="vocabulary-item">
              <div className="word-header">
                <span className="word-term">{item.word}</span>
                <button 
                  className="word-audio"
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(item.word);
                    utterance.rate = 0.8;
                    speechSynthesis.speak(utterance);
                  }}
                  aria-label={`Pronounce ${item.word}`}
                >
                  🔊
                </button>
              </div>
              <p className="word-definition">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grammar-section">
        <h4 className="section-title">📝 Grammar Notes</h4>
        <div className="grammar-content">
          <p className="grammar-explanation">{sentence.grammar}</p>
        </div>
      </div>

      <div className="sentence-info-section">
        <h4 className="section-title">ℹ️ Sentence Information</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Category:</span>
            <span className="info-value">{sentence.category}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Difficulty:</span>
            <span className={`info-value difficulty-${sentence.difficulty.toLowerCase()}`}>
              {sentence.difficulty}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Word Count:</span>
            <span className="info-value">{sentence.text.split(' ').length} words</span>
          </div>
          <div className="info-item">
            <span className="info-label">Character Count:</span>
            <span className="info-value">{sentence.text.length} characters</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="history-content">
      <div className="history-header">
        <h4 className="section-title">📜 Recent Attempts</h4>
        <span className="history-count">
          {history.length} attempt{history.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {history.length === 0 ? (
        <div className="empty-history">
          <p>No attempts yet. Start practicing to see your history!</p>
        </div>
      ) : (
        <div className="history-list">
          {history.slice(0, 20).map((attempt, index) => (
            <div key={attempt.id} className={`history-item ${attempt.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="attempt-header">
                <span className="attempt-result">
                  {attempt.isCorrect ? '✅' : '❌'}
                </span>
                <span className="attempt-time">
                  {formatDate(attempt.timestamp)}
                </span>
              </div>
              
              <div className="attempt-details">
                <div className="attempt-sentence">
                  <strong>Sentence:</strong> {attempt.sentenceText.substring(0, 50)}
                  {attempt.sentenceText.length > 50 ? '...' : ''}
                </div>
                <div className="attempt-input">
                  <strong>Your input:</strong> {attempt.userInput.substring(0, 50)}
                  {attempt.userInput.length > 50 ? '...' : ''}
                </div>
                <div className="attempt-meta">
                  <span className="meta-item">
                    ⏱️ {formatDuration(attempt.timeTaken)}
                  </span>
                  <span className="meta-item">
                    📊 {attempt.difficulty}
                  </span>
                  <span className="meta-item">
                    🎯 {attempt.mode === 'full' ? 'Full Sentence' : 'Fill Blanks'}
                  </span>
                  {attempt.errors > 0 && (
                    <span className="meta-item error">
                      ❌ {attempt.errors} error{attempt.errors !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderStatisticsTab = () => {
    const recentHistory = history.slice(0, 10);
    const avgTime = recentHistory.length > 0 
      ? Math.round(recentHistory.reduce((sum, attempt) => sum + attempt.timeTaken, 0) / recentHistory.length)
      : 0;
    
    const difficultyStats = ['Beginner', 'Intermediate', 'Advanced'].map(difficulty => {
      const attempts = history.filter(h => h.difficulty === difficulty);
      const correct = attempts.filter(h => h.isCorrect).length;
      return {
        difficulty,
        total: attempts.length,
        correct,
        accuracy: attempts.length > 0 ? Math.round((correct / attempts.length) * 100) : 0
      };
    });

    const modeStats = ['full', 'fillBlank'].map(mode => {
      const attempts = history.filter(h => h.mode === mode);
      const correct = attempts.filter(h => h.isCorrect).length;
      return {
        mode: mode === 'full' ? 'Full Sentence' : 'Fill Blanks',
        total: attempts.length,
        correct,
        accuracy: attempts.length > 0 ? Math.round((correct / attempts.length) * 100) : 0
      };
    });

    return (
      <div className="statistics-content">
        <div className="stats-overview">
          <h4 className="section-title">📊 Overall Statistics</h4>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{statistics.totalAttempts}</div>
              <div className="stat-label">Total Attempts</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{statistics.correctAttempts}</div>
              <div className="stat-label">Correct Answers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{statistics.accuracy}%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{formatDuration(avgTime)}</div>
              <div className="stat-label">Avg Time</div>
            </div>
          </div>
        </div>

        <div className="difficulty-stats">
          <h4 className="section-title">🎯 Performance by Difficulty</h4>
          <div className="difficulty-breakdown">
            {difficultyStats.map(stat => (
              <div key={stat.difficulty} className="difficulty-stat">
                <div className="difficulty-header">
                  <span className={`difficulty-name ${stat.difficulty.toLowerCase()}`}>
                    {stat.difficulty}
                  </span>
                  <span className="difficulty-accuracy">{stat.accuracy}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${stat.accuracy}%`,
                      backgroundColor: stat.difficulty === 'Beginner' ? 'var(--secondary-color)' :
                                     stat.difficulty === 'Intermediate' ? 'var(--warning-color)' :
                                     'var(--error-color)'
                    }}
                  ></div>
                </div>
                <div className="difficulty-details">
                  {stat.correct} / {stat.total} correct
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mode-stats">
          <h4 className="section-title">🎮 Performance by Mode</h4>
          <div className="mode-breakdown">
            {modeStats.map(stat => (
              <div key={stat.mode} className="mode-stat">
                <div className="mode-header">
                  <span className="mode-name">{stat.mode}</span>
                  <span className="mode-accuracy">{stat.accuracy}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${stat.accuracy}%`,
                      backgroundColor: 'var(--primary-color)'
                    }}
                  ></div>
                </div>
                <div className="mode-details">
                  {stat.correct} / {stat.total} correct
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="history-panel">
      <div className="panel-header">
        <h2 className="panel-title">Information Panel</h2>
      </div>
      
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'explanation' ? 'active' : ''}`}
          onClick={() => onTabChange('explanation')}
        >
          📚 Explanation
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => onTabChange('history')}
        >
          📜 History
        </button>
        <button
          className={`tab-btn ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => onTabChange('statistics')}
        >
          📊 Statistics
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'explanation' && renderExplanationTab()}
        {activeTab === 'history' && renderHistoryTab()}
        {activeTab === 'statistics' && renderStatisticsTab()}
      </div>
    </div>
  );
};

export default HistoryPanel;