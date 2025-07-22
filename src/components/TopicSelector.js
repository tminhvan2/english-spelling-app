import React from 'react';
import './TopicSelector.css';

const TopicSelector = ({ topics, selectedTopic, onTopicSelect }) => {
  return (
    <div className="topic-selector">
      <h2 className="topic-selector-title">Learning Topics</h2>
      <div className="topics-list">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={`topic-item ${selectedTopic.id === topic.id ? 'active' : ''}`}
            onClick={() => onTopicSelect(topic)}
            aria-pressed={selectedTopic.id === topic.id}
          >
            <div className="topic-icon">{topic.icon}</div>
            <div className="topic-content">
              <h3 className="topic-name">{topic.name}</h3>
              <p className="topic-description">{topic.description}</p>
              <span className="topic-count">
                {topic.sentences.length} sentences
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;