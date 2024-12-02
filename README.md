[![Nightly Build](https://github.com/vaisakhsasikumar/my-electron-app/actions/workflows/nightlyBuild.yml/badge.svg)](https://github.com/vaisakhsasikumar/my-electron-app/actions/workflows/nightlyBuild.yml)

# System Name
Simple Electron MongoDB Query Tool

# Contributors
- Vaisakh Sasikumar
- Andrei Kim
- Vlad Lobanov
- Hazel Ozmel
- Ivan Martynov

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

