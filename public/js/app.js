let currentExercise = null;
let currentAudio = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadExercises();
    loadFiles();
    setupEventListeners();
});

function setupEventListeners() {
    // Upload form
    document.getElementById('uploadForm').addEventListener('submit', handleFileUpload);
    
    // Exercise form
    document.getElementById('exerciseForm').addEventListener('submit', handleExerciseCreation);
    
    // Audio player events
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.addEventListener('loadedmetadata', function() {
        console.log('Audio loaded successfully');
    });
    
    // Input events
    document.getElementById('userInput').addEventListener('input', function() {
        // Clear previous results when user starts typing
        document.getElementById('result').innerHTML = '';
    });
}

// Section navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Update nav buttons
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Reload data for admin section
    if (sectionName === 'admin') {
        loadFiles();
        loadExercises();
    }
}

// Load exercises for selection
async function loadExercises() {
    try {
        const response = await fetch('/api/exercises');
        const exercises = await response.json();
        
        const exerciseSelect = document.getElementById('exerciseSelect');
        const exerciseFileSelect = document.getElementById('exerciseFile');
        
        // Clear existing options
        exerciseSelect.innerHTML = '<option value="">Select an exercise</option>';
        
        exercises.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise.id;
            option.textContent = exercise.title;
            exerciseSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error('Error loading exercises:', error);
        showMessage('Error loading exercises', 'error');
    }
}

// Load files for admin
async function loadFiles() {
    try {
        const response = await fetch('/api/files');
        const files = await response.json();
        
        const filesList = document.getElementById('filesList');
        const exerciseFileSelect = document.getElementById('exerciseFile');
        
        // Clear existing content
        filesList.innerHTML = '';
        exerciseFileSelect.innerHTML = '<option value="">Choose a file</option>';
        
        if (files.length === 0) {
            filesList.innerHTML = '<p class="loading">No files uploaded yet.</p>';
            return;
        }
        
        files.forEach(file => {
            // Add to files list
            const fileDiv = document.createElement('div');
            fileDiv.className = 'file-item';
            fileDiv.innerHTML = `
                <div class="file-info">
                    <h4>${file.title}</h4>
                    <p>File: ${file.originalName} | Size: ${formatFileSize(file.size)} | Type: ${file.mimetype}</p>
                    <p>Uploaded: ${new Date(file.uploadDate).toLocaleDateString()}</p>
                </div>
                <div class="file-actions">
                    <button onclick="previewFile('${file.id}')" class="secondary">Preview</button>
                    <button onclick="deleteFile('${file.id}')" class="danger">Delete</button>
                </div>
            `;
            filesList.appendChild(fileDiv);
            
            // Add to exercise file select (only audio/video files)
            if (file.mimetype.includes('audio') || file.mimetype.includes('video')) {
                const option = document.createElement('option');
                option.value = file.id;
                option.textContent = file.title;
                exerciseFileSelect.appendChild(option);
            }
        });
        
    } catch (error) {
        console.error('Error loading files:', error);
        showMessage('Error loading files', 'error');
    }
}

// Handle file upload
async function handleFileUpload(event) {
    event.preventDefault();
    
    const formData = new FormData();
    const fileInput = document.getElementById('file');
    const titleInput = document.getElementById('title');
    const textInput = document.getElementById('text');
    
    if (!fileInput.files[0]) {
        showMessage('Please select a file', 'error');
        return;
    }
    
    formData.append('file', fileInput.files[0]);
    formData.append('title', titleInput.value);
    formData.append('text', textInput.value);
    
    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('File uploaded successfully!', 'success');
            document.getElementById('uploadForm').reset();
            loadFiles();
        } else {
            showMessage(result.error || 'Upload failed', 'error');
        }
        
    } catch (error) {
        console.error('Upload error:', error);
        showMessage('Upload failed: ' + error.message, 'error');
    }
}

// Handle exercise creation
async function handleExerciseCreation(event) {
    event.preventDefault();
    
    const title = document.getElementById('exerciseTitle').value;
    const fileId = document.getElementById('exerciseFile').value;
    const text = document.getElementById('exerciseText').value;
    
    if (!title || !fileId || !text) {
        showMessage('All fields are required', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/exercises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, fileId, text })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('Exercise created successfully!', 'success');
            document.getElementById('exerciseForm').reset();
            loadExercises();
        } else {
            showMessage(result.error || 'Failed to create exercise', 'error');
        }
        
    } catch (error) {
        console.error('Exercise creation error:', error);
        showMessage('Failed to create exercise: ' + error.message, 'error');
    }
}

// Load selected exercise
async function loadExercise() {
    const exerciseId = document.getElementById('exerciseSelect').value;
    
    if (!exerciseId) {
        showMessage('Please select an exercise', 'error');
        return;
    }
    
    try {
        const [exercisesResponse, filesResponse] = await Promise.all([
            fetch('/api/exercises'),
            fetch('/api/files')
        ]);
        
        const exercises = await exercisesResponse.json();
        const files = await filesResponse.json();
        
        const exercise = exercises.find(e => e.id === exerciseId);
        const file = files.find(f => f.id === exercise.fileId);
        
        if (!exercise || !file) {
            showMessage('Exercise or file not found', 'error');
            return;
        }
        
        currentExercise = exercise;
        
        // Set up audio player
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = '/uploads/' + file.filename;
        audioPlayer.load();
        
        // Show exercise area
        document.getElementById('exerciseArea').style.display = 'block';
        
        // Clear previous results
        document.getElementById('userInput').value = '';
        document.getElementById('result').innerHTML = '';
        document.getElementById('answer').style.display = 'none';
        
        showMessage('Exercise loaded successfully!', 'success');
        
    } catch (error) {
        console.error('Error loading exercise:', error);
        showMessage('Error loading exercise', 'error');
    }
}

// Audio control functions
function playAudio() {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.play();
}

function pauseAudio() {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.pause();
}

function replayAudio() {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.currentTime = 0;
    audioPlayer.play();
}

// Check spelling
function checkSpelling() {
    if (!currentExercise) {
        showMessage('No exercise loaded', 'error');
        return;
    }
    
    const userInput = document.getElementById('userInput').value.trim();
    const correctText = currentExercise.text.trim();
    
    if (!userInput) {
        showMessage('Please enter your answer', 'error');
        return;
    }
    
    const resultDiv = document.getElementById('result');
    
    // Simple comparison (case-insensitive)
    const isCorrect = userInput.toLowerCase() === correctText.toLowerCase();
    
    if (isCorrect) {
        resultDiv.innerHTML = '✓ Correct! Well done!';
        resultDiv.className = 'result correct';
    } else {
        resultDiv.innerHTML = '✗ Incorrect. Try again or show the answer.';
        resultDiv.className = 'result incorrect';
    }
}

// Show answer
function showAnswer() {
    if (!currentExercise) {
        showMessage('No exercise loaded', 'error');
        return;
    }
    
    const answerDiv = document.getElementById('answer');
    answerDiv.innerHTML = `<strong>Correct Answer:</strong>\n${currentExercise.text}`;
    answerDiv.style.display = 'block';
}

// Clear input
function clearInput() {
    document.getElementById('userInput').value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('answer').style.display = 'none';
}

// Preview file
async function previewFile(fileId) {
    try {
        const response = await fetch('/api/files');
        const files = await response.json();
        const file = files.find(f => f.id === fileId);
        
        if (!file) {
            showMessage('File not found', 'error');
            return;
        }
        
        if (file.mimetype.includes('audio') || file.mimetype.includes('video')) {
            // Create a modal or new window for preview
            const previewWindow = window.open('', '_blank', 'width=600,height=400');
            previewWindow.document.write(`
                <html>
                    <head><title>Preview: ${file.title}</title></head>
                    <body style="padding: 20px; font-family: Arial, sans-serif;">
                        <h2>${file.title}</h2>
                        <${file.mimetype.includes('video') ? 'video' : 'audio'} controls style="width: 100%;">
                            <source src="/uploads/${file.filename}" type="${file.mimetype}">
                            Your browser does not support this media format.
                        </${file.mimetype.includes('video') ? 'video' : 'audio'}>
                        <p><strong>Text:</strong></p>
                        <p style="white-space: pre-wrap;">${file.text || 'No text provided'}</p>
                    </body>
                </html>
            `);
        } else if (file.mimetype.includes('srt')) {
            // For SRT files, show text content
            showMessage('SRT preview: ' + (file.text || 'No text content'), 'success');
        }
        
    } catch (error) {
        console.error('Preview error:', error);
        showMessage('Error previewing file', 'error');
    }
}

// Delete file
async function deleteFile(fileId) {
    if (!confirm('Are you sure you want to delete this file?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/files/${fileId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('File deleted successfully', 'success');
            loadFiles();
        } else {
            showMessage(result.error || 'Failed to delete file', 'error');
        }
        
    } catch (error) {
        console.error('Delete error:', error);
        showMessage('Error deleting file', 'error');
    }
}

// Utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showMessage(message, type = 'info') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;
    
    // Insert at the top of the current section
    const activeSection = document.querySelector('.section.active');
    activeSection.insertBefore(messageDiv, activeSection.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}