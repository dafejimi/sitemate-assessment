# Issue Tracker API and Client

Welcome to the Issue Tracker API and Client project! This repository contains a simple REST API server and a client application for managing issues, similar to GitHub or Jira. The API server is built with Node.js and MySQL, while the client is a React application using Semantic UI for styling.

## Project Overview

### API Server

The API server is designed to handle CRUD operations for issues. It provides endpoints to create, read, update, and delete issues, and stores data in a MySQL database.

### Client Application

The client application is a React-based web app that interacts with the API server. It allows users to perform CRUD operations through a form interface and displays responses from the server.

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MySQL** database setup and accessible.

### Setup Instructions

#### 1. API Server

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-repo/issue-tracker-api-client.git
    cd issue-tracker-api-client
    ```

2. **Navigate to the API Server Directory**:

    ```bash
    cd server
    ```

3. **Install Dependencies**:

    ```bash
    npm install
    ```

4. **Configure Environment Variables**:

    Create a `.env` file in the `server` directory and add the following variables:

    ```env
    MY_SQL_HOST=127.0.0.1
    MY_SQL_USER=root
    MY_SQL_PASSWORD=yourpassword
    MY_SQL_DATABASE=issue_tracker
    ```

5. **Set Up the Database**:

    Run the following commands to set up the MySQL database and create the `issues` table:

    ```sql
    CREATE DATABASE issue_tracker;

    USE issue_tracker;

    CREATE TABLE issues (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
    );
    ```

    Optionally, you can populate the table with some mock data using the provided SQL scripts.

6. **Start the Server**:

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:8000`.

#### 2. Client Application

1. **Navigate to the Client Directory**:

    ```bash
    cd ../client
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Start the Client**:

    ```bash
    npm start
    ```

    The client application will be running on `http://localhost:3000`.

## API Endpoints

### Base URL

`http://localhost:8000`

### Endpoints

- **GET /issues**: Fetch all issues.
- **GET /issues/:id**: Fetch a single issue by ID.
- **POST /issues**: Create a new issue.
- **PUT /issues/:id**: Update an existing issue by ID.
- **DELETE /issues/:id**: Delete an issue by ID.

## Client Features

- **Create**: Add a new issue using a form.
- **Read**: Fetch and display a single issue or all issues.
- **Update**: Modify an existing issue.
- **Delete**: Remove an issue from the database.
- **Latest ID Display**: Shows the latest ID to help users keep track of their progress.

## Development Notes

- **Error Handling**: Both the API server and client have error handling to manage and display errors effectively.
- **Styling**: The client uses Semantic UI for a modern and responsive design.
- **Asynchronous Operations**: Asynchronous functions are used in `useEffect` for data fetching in the client application.

## Contributing

Feel free to open issues or submit pull requests to improve the project. Contributions are welcome!

## License

This project is licensed under the MIT License.
