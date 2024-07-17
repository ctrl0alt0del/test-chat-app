# Chat Application

## Project Overview

This project is a simple chat application built with Next.js, Redux, and Tailwind CSS. It allows users to sign up, log in, create chats with other users, and send messages in real-time. The application also includes Docker Compose configuration for easy setup and deployment.

## Detailed Setup Instructions

### Prerequisites

- Node.js (>= 18.17.0)
- Docker (>= 20.10.0)
- Docker Compose (>= 1.29.0)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```

2. **Install dependencies:**
   ```bash
     npm install
   ```

### Running the Application

**Locally**

1. **Start the development server:**
   ```bash
     npm run dev
   ```
2. **Open your browser and navigate to**
   ```
     localhost:3000
   ```

**Using Docker Compose**

1. **Build and start the application:**
   ```bash
     docker-compose up --build
   ```
2. **Open your browser and navigate to**
   ```
     localhost:3000
   ```

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Redux**: A state management library for JavaScript applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Docker**: A platform for developing, shipping, and running applications in containers.
- **Docker Compose**: A tool for defining and running multi-container Docker applications.

## Assumptions and Considerations

- The application is designed for demonstration purposes and may not be production-ready.
- User authentication is handled using simple username-based validation. No passwords or advanced authentication mechanisms are implemented.
- Data is stored in-memory and will be lost when the server is restarted. Persistent storage mechanisms should be added for a production application.
- Initially presented only 6 users: Alex, Alice, Bob, Charlie, David and Eve
