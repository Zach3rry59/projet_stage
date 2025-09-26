# Establishment and Employee Management System

This application allows you to display, add, and edit a list of establishments and employees. Each establishment has a number of keys that are assigned to employees. The system also allows you to check which employee has the keys for a given establishment.

## Features

- Display a list of establishments and employees
- Add and edit establishments and employees
- Assign keys to employees
- Real-time updates using WebSockets

## Technology Stack

- **Frontend**: React with TypeScript
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Real-time Updates**: WebSockets

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- npm or yarn installed
- MySQL or MongoDB installed (depending on the database used)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Zach3rry59/projet_stage.git
   ```

2. Navigate to the project directory:
   ```sh
   cd projet_stage
   ```

3. Install the dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

4. Set up the database:
   - If using MySQL, make sure you have a MySQL server running and update the database configuration in the `.env` file.
   - If using MongoDB, make sure you have a MongoDB server running and update the database configuration in the `.env` file.

5. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

6. Start the backend server:
   ```sh
   cd server
   npm install
   npm start
   ```

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the application to manage establishments and employees.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
