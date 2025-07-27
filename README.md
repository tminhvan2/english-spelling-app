# English Spelling Dictation App

A web-based English spelling dictation application that allows users to practice spelling by listening to audio files and typing what they hear.

## Features

- 🎧 **Audio Dictation**: Listen to audio files (MP3, MP4) and practice spelling
- 📁 **File Management**: Upload and manage audio files, videos, and subtitle files (SRT)
- 📝 **Exercise Creation**: Create custom spelling exercises with audio and text
- ✅ **Answer Checking**: Automatic spelling verification with feedback
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔧 **Admin Panel**: Easy file and exercise management

## Supported File Types

- **Audio Files**: MP3
- **Video Files**: MP4  
- **Subtitle Files**: SRT

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tminhvan2/english-spelling-app.git
   cd english-spelling-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### For Students (Practice Mode)

1. Select an available exercise from the dropdown
2. Click "Load Exercise" to start
3. Use the audio controls to play, pause, or replay the audio
4. Type what you hear in the text area
5. Click "Check Answer" to verify your spelling
6. Use "Show Answer" if you need help

### For Teachers/Administrators (Admin Mode)

1. Click "Admin" to access the admin panel
2. **Upload Files**: Add MP3, MP4, or SRT files with titles and transcripts
3. **Create Exercises**: Combine uploaded audio files with text to create spelling exercises
4. **Manage Files**: Preview or delete uploaded files

## File Structure

```
english-spelling-app/
├── server.js              # Express server
├── package.json           # Node.js dependencies
├── views/
│   └── index.html         # Main HTML interface
├── public/
│   ├── css/
│   │   └── style.css      # Application styling
│   ├── js/
│   │   └── app.js         # Frontend JavaScript
│   └── uploads/           # Uploaded media files (auto-created)
├── data/
│   └── database.json      # JSON database (auto-created)
└── README.md
```

## API Endpoints

- `GET /` - Main application interface
- `GET /api/files` - Get all uploaded files
- `POST /api/upload` - Upload new files
- `DELETE /api/files/:id` - Delete a file
- `GET /api/exercises` - Get all exercises
- `POST /api/exercises` - Create new exercise

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **File Handling**: Multer
- **Database**: JSON file storage (easily upgradeable to MongoDB/PostgreSQL)
- **Audio/Video**: HTML5 Media APIs

## Development

To run in development mode:

```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License - see package.json for details