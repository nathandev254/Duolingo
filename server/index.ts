import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(morgan('dev')); // Log HTTP requests and errors

// Custom middleware to log request details
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Basic routes
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the backend server!');
});

// Example API route
app.get('/api/status', (req: Request, res: Response) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Example route for handling user data
app.post('/api/users', (req: Request, res: Response) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    res.status(201).json({ message: 'User created successfully', user: { name, email } });
});

// Example route with URL parameters
app.get('/api/items/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({ message: `Fetching item with ID: ${id}` });
});

// Example route with query parameters
app.get('/api/search', (req: Request, res: Response) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }
    res.json({ message: `Searching for: ${query}` });
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
