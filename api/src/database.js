const mysql = require('mysql2');

const dotenv = require("dotenv")
dotenv.config()

const db = mysql.createPool({
    host: process.env.MY_SQL_HOST || '127.0.0.1',
    user: process.env.MY_SQL_USER || 'root',
    password: process.env.MY_SQL_PASSWORD || 'ra1a11acK!@',
    database: process.env.MY_SQL_DATABASE || 'issue_tracker'
}).promise();

// Get all issues
async function getIssues() {
    const [rows] = await db.query('SELECT * FROM issues');
    return rows;
}

// Get a single issue by ID
async function getIssue(issue_id) {
    const [rows] = await db.query('SELECT * FROM issues WHERE id = ?', [issue_id]);
    return rows[0]; // Return the first row (single issue)
}

// Create a new issue
async function createIssue(title, description) {
    const [result] = await db.query('INSERT INTO issues (title, description) VALUES (?, ?)', [title, description]);
    return result.insertId; // Return the ID of the newly created issue
}

// Update an existing issue
async function updateIssue(issue_id, title, description) {
    const [result] = await db.query(
        'UPDATE issues SET title = ?, description = ? WHERE id = ?',
        [title, description, issue_id]
    );
    return result.affectedRows; // Return the number of affected rows
}

// Delete an issue
async function deleteIssue(issue_id) {
    const [result] = await db.query('DELETE FROM issues WHERE id = ?', [issue_id]);
    return result.affectedRows; // Return the number of affected rows
}

// Create multiple issues
async function createMultipleIssues(issues) {
    const query = 'INSERT INTO issues (title, description) VALUES ?';
    const values = issues.map(issue => [issue.title, issue.description]);
    const [result] = await db.query(query, [values]);
    return result.affectedRows; // Return the number of affected rows
}


module.exports = {
    getIssue,
    getIssues,
    updateIssue,
    deleteIssue,
    createIssue,
    createMultipleIssues,
}