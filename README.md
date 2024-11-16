# Real Estate Listing Platform 🏠

A modern real estate platform built with the MERN stack, offering seamless property listing and searching capabilities. View the live site at [E-Estate](https://e-estate.onrender.com/)

## ✨ Features

- **Property Listings**: Browse through available properties with detailed information
- **Advanced Search**: Filter properties by location, price range, bedrooms, and more
- **Detailed Property Views**: Access comprehensive property information including images and amenities
- **User Authentication**: 
  - Traditional email/password registration and login
  - Google Sign-In integration for quick access
- **Image Management**: Upload and manage property images via Firebase Cloud Storage
- **Responsive Design**: Optimized for all devices using Tailwind CSS

## 🚀 Technologies Used

- **Frontend**: 
  - React.js
  - Redux for state management
  - Tailwind CSS for styling
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
- **Storage & Authentication**:
  - Firebase Cloud Storage for images
  - Google Sign-In integration
  
## ⚙️ Prerequisites

Before running this project locally, ensure you have:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB installed and running
- A Firebase account for storage
- Google OAuth credentials

## 🛠️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/MohdMusaiyab/real-estate
   ```

2. **Install Dependencies**
   ```bash
   # Install backend dependencies
   cd api
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in both frontend and backend directories with the following variables:
   ```
   # Backend .env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   
   # Frontend .env
   VITE_FIREBASE_API_KEY="your firebase key"
   ```

4. **Start the Application**
   ```bash
   # Start backend server (from backend directory)
   npm run dev
   
   # Start frontend development server (from frontend directory)
   npm run dev
   ```

## 📱 Usage

1. **User Registration/Login**
   - Create a new account using email/password
   - Or use Google Sign-In for quick access

2. **Browsing Properties**
   - View all listings on the home page
   - Use search filters to find specific properties
   - Click on properties for detailed information

3. **Property Management** (for registered users)
   - Add new property listings
   - Upload property images
   - Edit existing listings
   - Remove listings

## 🌐 Deployment

The application is currently deployed at [https://e-estate.onrender.com/](https://e-estate.onrender.com/)

---
