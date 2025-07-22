import React from 'react';
import './SentenceList.css';

const SentenceList = ({ sentences, selectedSentence, onSentenceSelect }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'var(--secondary-color)';
      case 'Intermediate':
        return 'var(--warning-color)';
      case 'Advanced':
        return 'var(--error-color)';
      default:
        return 'var(--text-secondary-light)';
    }
  };

  return (
    <div className="sentence-list">
      <h3 className="sentence-list-title">Practice Sentences</h3>
      <div className="sentences-container">
        {sentences.map((sentence, index) => (
          <button
            key={sentence.id}
            className={`sentence-item ${selectedSentence.id === sentence.id ? 'active' : ''}`}
            onClick={() => onSentenceSelect(sentence)}
            aria-pressed={selectedSentence.id === sentence.id}
          >
            <div className="sentence-header">
              <span className="sentence-number">{index + 1}</span>
              <span 
                className="difficulty-badge"
                style={{ backgroundColor: getDifficultyColor(sentence.difficulty) }}
              >
                {sentence.difficulty}
              </span>
            </div>
            <p className="sentence-preview">
              {sentence.text.length > 60 
                ? `${sentence.text.substring(0, 60)}...` 
                : sentence.text
              }
            </p>
            <div className="sentence-meta">
              <span className="category-tag">{sentence.category}</span>
              <span className="word-count">
                {sentence.text.split(' ').length} words
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SentenceList;