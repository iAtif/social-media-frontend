# Simple Social Media Application - Frontend

This is the frontend of a social media app built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can sign up, log in, create posts with images and descriptions, like posts, and manage their own posts. We use JWT for secure user authentication.

## Features

1. **User Authentication**

   - Sign up and log in.
   - Secure authentication with JWT.

2. **Post Creation**

   - Create posts with images and descriptions.

3. **Post Interaction**

   - Like posts created by others.
   - See the number of likes for each post.

4. **Post Management**
   - Only the creator can edit or delete their post.

## Requirements

- **Frontend**: React.js

## Setup Instructions

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/iAtif/social-media-frontend.git
   cd social-media-frontend
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
