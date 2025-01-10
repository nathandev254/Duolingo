import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import multer from 'multer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// Custom middleware to authenticate requests
app.use((req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }
    if (token !== process.env.SECRET_TOKEN) {
        return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    next();
});

// Basic routes
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the advanced backend server!');
});

// API routes
app.post('/api/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === process.env.ADMIN_PASSWORD) {
        return res.json({ message: 'Login successful', token: process.env.SECRET_TOKEN });
    }
    res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/upload', upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'File is required' });
    }
    res.json({ message: 'File uploaded successfully', file: req.file });
});

app.get('/api/data', async (req: Request, res: Response) => {
    try {
        // Replace with actual MongoDB query logic
        const data = await mongoose.connection.db.collection('example').find({}).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
