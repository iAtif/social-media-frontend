# Simple Social Media Application - Frontend

This project is a simple social media application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with user authentication and authorization features. The application allows users to register, log in, create posts with images and descriptions, like posts, and manage their own posts. Authentication is handled using JWT for secure user verification.

## Features

### 1. User Authentication

- Implement user registration and login functionality.
- Use JWT or a third-party service for secure authentication.

### 2. Post Creation

- Allow authenticated users to create posts.
- Each post should include an image and a description.

### 3. Post Interaction

- Users should be able to like posts created by others.
- Display the number of likes for each post.

### 4. Post Management

- Only the user who created a post should have the ability to delete it.
- Implement authorization checks to enforce this rule.

## Requirements

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT for user authentication.

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/iAtif/social-media-frontend.git
   cd your-repo-name
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   REACT_APP_BACKEND_API_URL=your-backend-api-url
   ```

4. **Run the application:**

   ```sh
   npm start
   ```

5. **Backend Code:**

   The backend code is available in a separate repository. You can find it [here](https://github.com/iAtif/social-media-backend.git).
