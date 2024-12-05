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

3. **Configurable MongoDB Connection**: The application utilizes the MongoDB URI, Database, and Collection specified in the settings while running queries. This approach allows users to easily configure their connection details without needing to input connection strings each time they execute a query.

4. **Persisting Query History**: Users can have their previous queries saved in local storage, allowing them to easily access and rerun past queries without retyping.

5. **Settings and Theme Management**: The application includes a settings menu that allows users to switch themes and MongoDB URI/Database/Collection. Settings are persisted in local storage in order to facilitate users not to enter them each time after app has been restarted. Settings have defauld values, which are used when app starts for the first time, and lately can be replaced anytime.

6. **Execution History Overview**: Users can invoke an "Advanced View" feature to see a simplified history of their queries and replies.

# External System(s)
**MongoDB**: The primary database system used for managing and querying data. MongoDB facilitates the storage of JSON-like documents with dynamic schemas, which is integral to the query tool's operation. [MongoDB Documentation](https://mongodb.com/docs/)

**SQLite**: Local database for local storage

# System Architecture Style

The Simple Electron MongoDB Query Tool employs a **Monolithic Architecture Style**, combining both frontend and backend functionalities within a single application. This approach simplifies development and deployment, enabling users to execute MongoDB queries directly from the Electron interface without requiring a separate server. 

# Architecture Diagram

![Screenshot](https://github.com/vaisakhsasikumar/my-electron-app/blob/main/Diagram.png)

# Branching Strategy

We have mono repo for the whole project. We create PRs and merge them to master branch from our repos or our branches.

# Deployment Model

The Simple Electron MongoDB Query Tool can be deployed as a native desktop application across various operating systems, including Windows, macOS, and Linux. Leveraging ElectronJS capabilities, the app can package web technologies into standalone executables, allowing users to easily install and run the application on their local machines without needing an additional server setup. This ensures a seamless experience for users while maintaining consistent functionality across platforms.

# Proof-of-Concept Desktop Application using Electron

![Screenshot](https://github.com/vaisakhsasikumar/my-electron-app/blob/main/screenshot.png)

## Description
A desktop application built with Electron that allows users to run a given MongoDB find queries and view the results in JSON format.

## Technologies
- **Electron** for desktop application development
- **MongoDB** for the database backend
- **Webpack** for bundling JavaScript files
- **GitHub Actions** for continuous integration and deployment automation
- **Local Storage** Sqlite database 

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

2. **Build, Run and Deploy**:
     ```bash
   npx webpack
   npx electron .
   npm start

## Test Cases
[Click here to view the Test Cases](https://github.com/vaisakhsasikumar/my-electron-app/blob/main/TestCases.md)
