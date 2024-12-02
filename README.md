[![Nightly Build](https://github.com/vaisakhsasikumar/my-electron-app/actions/workflows/nightlyBuild.yml/badge.svg)](https://github.com/vaisakhsasikumar/my-electron-app/actions/workflows/nightlyBuild.yml)

# System Name
Simple Electron MongoDB Query Tool

# Contributors
- Vaisakh Sasikumar
- Andrei Kim
- Vlad Lobanov
- Hazel Ozmel
- Ivan Martynov

# Use cases for the Simple Electron MongoDB Query Tool:

1. **Running MongoDB Queries**: Users can input and execute MongoDB `find` queries, enabling them to retrieve specific data from the MongoDB database.

2. **Viewing Results in JSON Format**: After executing a query, users can view the results in a structured JSON format, making it easy to read and understand the data returned.

3. **Fixed MongoDB Connection**: The application allows access to a predefined or stored in settings MongoDB connection, simplifying the setup process for the user since they don't need to input connection strings.

4. **Persisting Query History**: Users can have their previous queries saved in local storage, allowing them to easily access and rerun past queries without retyping.

5. **Settings and Theme Management**: The application includes a settings menu that allows users to switch themes and MongoDB URI/Database/Collection.

6. **Comparison of Query Results**: Users can invoke an "Advanced View" feature to see a simplified history of their queries and replies.

# External System(s)
**MongoDB**: The primary database system used for managing and querying data. MongoDB facilitates the storage of JSON-like documents with dynamic schemas, which is integral to the query tool's operation. [MongoDB Documentation](https://mongodb.com/docs/)

# System Architecture Style

The Simple Electron MongoDB Query Tool employs a **Monolithic Architecture Style**, combining both frontend and backend functionalities within a single application. This approach simplifies development and deployment, enabling users to execute MongoDB queries directly from the Electron interface without requiring a separate server. 

# Diagram


![Screenshot](https://github.com/vaisakhsasikumar/my-electron-app/blob/main/Diagram.png)

# Proof-of-Concept Desktop Application using Electron

![Screenshot](https://github.com/vaisakhsasikumar/my-electron-app/blob/main/screenshot.png)

## Description
A desktop application built with Electron that allows users to run a given MongoDB find queries and view the results in JSON format.

## Technologies
- **Electron** for desktop application development
- **MongoDB** for the database backend
- **Webpack** for bundling JavaScript files
- **GitHub Actions** for continuous integration and deployment automation

## Features
- Run MongoDB find queries
- Display results in JSON format
- Fixed MongoDB connection (no configurable connection strings)

## Purpose
To provide hands-on experience with:
- Electron desktop app development
- MongoDB integration
- CI/CD automation with GitHub Actions

## Repository
This project is hosted on GitHub, with source code managed and integrated with a CI/CD pipeline for automated build and testing.

---

## Steps to Run the Application

1. **Install dependencies**:
   ```bash
   npm install
2. **Run Node Server**:
     ```bash
   node backend/server.js
3. **Build and Deploy**:
     ```bash
   npx webpack
   npx electron .

