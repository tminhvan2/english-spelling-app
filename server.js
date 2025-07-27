const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure required directories exist
fs.ensureDirSync('public/uploads');
fs.ensureDirSync('data');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp3|mp4|srt/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'application/x-subrip';
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only mp3, mp4, and srt files are allowed!'));
    }
  }
});

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database helper functions
const DB_FILE = 'data/database.json';

function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
  return { files: [], exercises: [] };
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving database:', error);
    return false;
  }
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// API Routes
app.get('/api/files', (req, res) => {
  const db = loadDatabase();
  res.json(db.files);
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const db = loadDatabase();
  const fileData = {
    id: Date.now().toString(),
    originalName: req.file.originalname,
    filename: req.file.filename,
    path: req.file.path,
    mimetype: req.file.mimetype,
    size: req.file.size,
    uploadDate: new Date().toISOString(),
    text: req.body.text || '',
    title: req.body.title || req.file.originalname
  };

  db.files.push(fileData);
  
  if (saveDatabase(db)) {
    res.json({ success: true, file: fileData });
  } else {
    res.status(500).json({ error: 'Failed to save file information' });
  }
});

app.delete('/api/files/:id', (req, res) => {
  const db = loadDatabase();
  const fileIndex = db.files.findIndex(f => f.id === req.params.id);
  
  if (fileIndex === -1) {
    return res.status(404).json({ error: 'File not found' });
  }

  const file = db.files[fileIndex];
  
  // Delete physical file
  try {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }

  // Remove from database
  db.files.splice(fileIndex, 1);
  
  if (saveDatabase(db)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to update database' });
  }
});

app.get('/api/exercises', (req, res) => {
  const db = loadDatabase();
  res.json(db.exercises);
});

app.post('/api/exercises', (req, res) => {
  const { fileId, text, title } = req.body;
  
  if (!fileId || !text) {
    return res.status(400).json({ error: 'File ID and text are required' });
  }

  const db = loadDatabase();
  const exercise = {
    id: Date.now().toString(),
    fileId: fileId,
    text: text,
    title: title || 'Untitled Exercise',
    createdDate: new Date().toISOString()
  };

  db.exercises.push(exercise);
  
  if (saveDatabase(db)) {
    res.json({ success: true, exercise: exercise });
  } else {
    res.status(500).json({ error: 'Failed to save exercise' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`English Spelling App server running on http://localhost:${PORT}`);
});