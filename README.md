# English Spelling Learning App

A comprehensive React application for learning English spelling with interactive audio features and real-time feedback.

## Features

### 🎯 Learning Modes
- **Full Sentence Mode**: Listen to audio and type the complete sentence
- **Fill-in-the-Blank Mode**: Fill missing words in sentences with guided practice

### 📚 Content Structure
- **Business English** (💼): Professional communication and business vocabulary
- **Travel & Tourism** (✈️): Travel vocabulary and tourism-related communication  
- **Daily Life** (🏠): Everyday vocabulary and common life situations

Each topic includes 6+ sentences with:
- Difficulty levels (Beginner/Intermediate/Advanced)
- Vocabulary explanations with pronunciation
- Grammar notes and sentence analysis
- Category-specific content

### 🎵 Audio Integration
- Web Speech API for text-to-speech functionality
- Adjustable playback speed (0.5x - 2x)
- Volume control
- Play, pause, and repeat functionality

### 📊 Progress Tracking
- Real-time typing validation with visual feedback
- History tracking with localStorage persistence
- Detailed statistics (accuracy, attempts, time taken)
- Performance breakdown by difficulty and mode

### 🎨 User Experience
- Dark/Light theme toggle
- Responsive design for mobile, tablet, and desktop
- Modern, clean interface with smooth animations
- Accessibility features with proper ARIA labels
- Color-coded feedback (green for correct, red for incorrect)

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tminhvan2/english-spelling-app.git
cd english-spelling-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── index.js              # React root
├── index.css            # Global styles
├── App.js               # Main component with state management
├── App.css              # Main layout and theming
├── components/
│   ├── TopicSelector.js + TopicSelector.css
│   ├── SentenceList.js + SentenceList.css  
│   ├── MediaCenter.js + MediaCenter.css
│   ├── TypingArea.js + TypingArea.css
│   └── HistoryPanel.js + HistoryPanel.css
└── data/
    └── sampleData.js    # Sample content with 18 sentences
```

## Technology Stack

- **React 18+** with modern hooks (useState, useEffect, useRef)
- **Web Speech API** for text-to-speech functionality
- **localStorage** for data persistence
- **CSS Grid and Flexbox** for responsive layout
- **CSS Custom Properties** for theming
- **Component-based architecture** for maintainability

## Browser Compatibility

- Modern browsers that support Web Speech API
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the package.json file for details.

## Acknowledgments

- Web Speech API for text-to-speech functionality
- React team for the excellent framework
- Create React App for the build setup