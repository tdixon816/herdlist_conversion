# Herdlist Viewer & API

This project provides a web-based interface to view and edit livestock herd records, powered by a MySQL backend and displayed using Tabulator.js.

## Features

- View, filter, and group livestock records (animals)
- Inline editing with save to MySQL
- Auth modal (local-only)
- Display associated field and location data via SQL joins
- REST API endpoints for all major tables

## Requirements

- Node.js (v14+)
- MySQL 5.7+ or MariaDB 10+
- `.env` file with database credentials

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/herdlist-viewer.git
cd herdlist-viewer
```
2. Install Dependencies
```bash
npm install
```
3. Create .env
Create a .env file in the root:

```
DFF_DB_HOST=your_host
DFF_DB_USER=your_user
DFF_DB_PASSWORD=your_password
DFF_DB_DATABASE=your_database
DFF_DB_PORT=your_port
```
4. Run the Server
```bash
node server.js
```
Visit http://localhost:3300


