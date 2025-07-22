import React, { useState, useEffect, useRef } from 'react';
import './TypingArea.css';

const TypingArea = ({ sentence, learningMode, onAttemptComplete }) => {
  const [userInput, setUserInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [fillInAnswers, setFillInAnswers] = useState([]);
  
  const textareaRef = useRef(null);

  // Reset state when sentence or mode changes
  useEffect(() => {
    setUserInput('');
    setIsComplete(false);
    setErrors([]);
    setStartTime(null);
    setShowHint(false);
    setFillInAnswers(learningMode === 'fillBlank' ? new Array(sentence.blanks?.length || 0).fill('') : []);
  }, [sentence, learningMode]);

  // Focus textarea on component mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const validateFullSentence = (input) => {
    const targetText = sentence.text.toLowerCase().trim();
    const userText = input.toLowerCase().trim();
    
    if (userText === targetText) {
      return { isCorrect: true, errors: [] };
    }

    const targetWords = targetText.split(' ');
    const userWords = userText.split(' ');
    const errorPositions = [];

    for (let i = 0; i < Math.max(targetWords.length, userWords.length); i++) {
      if (targetWords[i] !== userWords[i]) {
        errorPositions.push(i);
      }
    }

    return { isCorrect: false, errors: errorPositions };
  };

  const validateFillInBlanks = (answers) => {
    const isCorrect = answers.every((answer, index) => 
      answer.toLowerCase().trim() === sentence.blanks[index].toLowerCase()
    );
    
    const errorPositions = answers.map((answer, index) => 
      answer.toLowerCase().trim() !== sentence.blanks[index].toLowerCase() ? index : -1
    ).filter(index => index !== -1);

    return { isCorrect, errors: errorPositions };
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (learningMode === 'full') {
      const validation = validateFullSentence(value);
      setErrors(validation.errors);
      
      if (validation.isCorrect && !isComplete) {
        handleComplete(true, value);
      }
    }
  };

  const handleFillInChange = (index, value) => {
    const newAnswers = [...fillInAnswers];
    newAnswers[index] = value;
    setFillInAnswers(newAnswers);

    if (!startTime) {
      setStartTime(Date.now());
    }

    const validation = validateFillInBlanks(newAnswers);
    setErrors(validation.errors);

    if (validation.isCorrect && newAnswers.every(answer => answer.trim() !== '') && !isComplete) {
      handleComplete(true, newAnswers.join(', '));
    }
  };

  const handleComplete = (isCorrect, finalInput) => {
    setIsComplete(true);
    const endTime = Date.now();
    const timeTaken = startTime ? Math.round((endTime - startTime) / 1000) : 0;

    const attemptData = {
      sentenceId: sentence.id,
      sentenceText: sentence.text,
      userInput: finalInput,
      isCorrect,
      timeTaken,
      mode: learningMode,
      errors: errors.length,
      difficulty: sentence.difficulty,
      category: sentence.category
    };

    onAttemptComplete(attemptData);
  };

  const handleSubmit = () => {
    if (learningMode === 'full') {
      const validation = validateFullSentence(userInput);
      handleComplete(validation.isCorrect, userInput);
    } else {
      const validation = validateFillInBlanks(fillInAnswers);
      handleComplete(validation.isCorrect, fillInAnswers.join(', '));
    }
  };

  const handleReset = () => {
    setUserInput('');
    setFillInAnswers(learningMode === 'fillBlank' ? new Array(sentence.blanks?.length || 0).fill('') : []);
    setIsComplete(false);
    setErrors([]);
    setStartTime(null);
    setShowHint(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const renderFullSentenceMode = () => (
    <div className="typing-full-mode">
      <label htmlFor="sentence-input" className="input-label">
        Type the complete sentence:
      </label>
      <textarea
        ref={textareaRef}
        id="sentence-input"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Start typing the sentence you heard..."
        className={`sentence-input ${isComplete ? (errors.length === 0 ? 'correct' : 'incorrect') : ''}`}
        disabled={isComplete}
        rows={4}
      />
      <div className="input-info">
        <span className="progress">
          {userInput.length} / {sentence.text.length} characters
        </span>
        {errors.length > 0 && !isComplete && (
          <span className="error-count">
            {errors.length} word{errors.length !== 1 ? 's' : ''} to correct
          </span>
        )}
      </div>
    </div>
  );

  const renderFillBlankMode = () => {
    const parts = sentence.fillInBlank.split(/___+/);
    const result = [];
    
    parts.forEach((part, index) => {
      result.push(
        <span key={`text-${index}`} className="sentence-part">
          {part}
        </span>
      );
      
      if (index < parts.length - 1) {
        result.push(
          <input
            key={`blank-${index}`}
            type="text"
            value={fillInAnswers[index] || ''}
            onChange={(e) => handleFillInChange(index, e.target.value)}
            className={`blank-input ${isComplete ? (errors.includes(index) ? 'incorrect' : 'correct') : ''}`}
            placeholder="?"
            disabled={isComplete}
          />
        );
      }
    });

    return (
      <div className="typing-fill-mode">
        <label className="input-label">
          Fill in the missing words:
        </label>
        <div className="sentence-with-blanks">
          {result}
        </div>
        <div className="blanks-info">
          <span className="blanks-count">
            {fillInAnswers.filter(answer => answer.trim() !== '').length} / {sentence.blanks.length} blanks filled
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="typing-area">
      <div className="typing-header">
        <h3 className="typing-title">Practice Typing</h3>
        <div className="typing-controls">
          <button
            className="hint-btn"
            onClick={toggleHint}
            disabled={isComplete}
          >
            💡 {showHint ? 'Hide' : 'Show'} Hint
          </button>
          <button
            className="reset-btn"
            onClick={handleReset}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {learningMode === 'full' ? renderFullSentenceMode() : renderFillBlankMode()}

      {showHint && (
        <div className="hint-section">
          <h4>Hint:</h4>
          {learningMode === 'fillBlank' ? (
            <div className="fill-hints">
              {sentence.blanks.map((blank, index) => (
                <div key={index} className="blank-hint">
                  Blank {index + 1}: <strong>{blank}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="sentence-hint">
              First few words: "{sentence.text.split(' ').slice(0, 3).join(' ')}..."
            </p>
          )}
        </div>
      )}

      <div className="typing-actions">
        {!isComplete && (
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={
              learningMode === 'full' 
                ? !userInput.trim() 
                : fillInAnswers.some(answer => !answer.trim())
            }
          >
            ✓ Check Answer
          </button>
        )}
        
        {isComplete && (
          <div className={`result-message ${errors.length === 0 ? 'success' : 'error'}`}>
            {errors.length === 0 ? (
              <div className="success-result">
                <span className="result-icon">🎉</span>
                <span className="result-text">Perfect! Well done!</span>
                {startTime && (
                  <span className="time-taken">
                    Completed in {Math.round((Date.now() - startTime) / 1000)}s
                  </span>
                )}
              </div>
            ) : (
              <div className="error-result">
                <span className="result-icon">❌</span>
                <span className="result-text">
                  Not quite right. {errors.length} error{errors.length !== 1 ? 's' : ''} found.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingArea;