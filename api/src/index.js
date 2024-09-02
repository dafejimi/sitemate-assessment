const express = require("express");
const cors = require("cors");
const app = express();
const dbFn = require('./database');

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Routes

// Get all issues
app.get('/issues', async (req, res) => {
    dbFn.getIssues()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(error => {
            res.status(400).json({ error: error.message || "An unexpected error occurred." });
        });
});

// Get a single issue by ID
app.get('/issues/:id', async (req, res) => {
    try {
        const issueId = parseInt(req.params.id, 10);
        const issue = await dbFn.getIssue(issueId);
        if (issue) {
            res.json(issue);
        } else {
            res.status(404).json({ error: 'Issue not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch issue' });
    }
});

// Create a new issue
app.post('/issues', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }
        const newIssueId = await dbFn.createIssue(title, description);
        res.status(201).json({ id: newIssueId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create issue' });
    }
});

// Create multiple new issues
app.post('/issues/multiple', async (req, res) => {
    try {
        const issues = req.body;
        if (!Array.isArray(issues) || issues.some(issue => !issue.title || !issue.description)) {
            return res.status(400).json({ error: 'Issues should be an array of objects with title and description' });
        }
        const createdCount = await dbFn.createMultipleIssues(issues);
        res.status(201).json({ count: createdCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create multiple issues' });
    }
});

// Update an existing issue
app.put('/issues/:id', async (req, res) => {
    try {
        const issueId = parseInt(req.params.id, 10);
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }
        const updatedCount = await dbFn.updateIssue(issueId, title, description);
        if (updatedCount > 0) {
            res.json({ message: 'Issue updated successfully' });
        } else {
            res.status(404).json({ error: 'Issue not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update issue' });
    }
});

// Delete an issue
app.delete('/issues/:id', async (req, res) => {
    try {
        const issueId = parseInt(req.params.id, 10);
        const deletedCount = await dbFn.deleteIssue(issueId);
        if (deletedCount > 0) {
            res.json({ message: 'Issue deleted successfully' });
        } else {
            res.status(404).json({ error: 'Issue not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete issue' });
    }
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
