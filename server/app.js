const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Setup
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.static('uploads'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/portfolioDocuments', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Document Schema
const documentSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    mimetype: String,
    filesize: Number,
    upload_time: { type: Date, default: Date.now }
});

const Document = mongoose.model('Document', documentSchema);

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Upload Endpoint
app.post('/upload', upload.single('document'), async (req, res) => {
    try {
        const { filename, originalname, mimetype, size } = req.file;
        const newDocument = new Document({
            filename,
            originalname,
            mimetype,
            filesize: size
        });
        await newDocument.save();
        res.send({ message: 'File uploaded and saved to database' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Upload failed' });
    }
});

// Fetch Documents
app.get('/documents', async (req, res) => {
    try {
        const documents = await Document.find().sort({ upload_time: -1 });
        res.json(documents);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Fetching documents failed' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
