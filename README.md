# ECOMMERCE APPLICATION
# E-commerce Application (MERN Stack)

## Overview
This is a full-fledged E-commerce application built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It provides a seamless shopping experience with features like product listing, shopping cart, authentication, and an admin dashboard for managing products and orders.

## Features
- Product Listing: Browse available products with filtering options.
- Shopping Cart: Add, remove, and update products in the cart.
- Authentication: User registration, login, and secure authentication.
- Admin Dashboard: Manage products, orders, and user roles.

## Tech Stack
- Frontend: React.js, Redux (for state management), Tailwind CSS/Bootstrap
- Backend: Node.js, Express.js
  Database: MongoDB (Mongoose for schema management)
- Authentication JWT (JSON Web Token)
- Payment Integration: (Optional) Stripe/PayPal

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (LTS version recommended)
- MongoDB (Locally installed or use MongoDB Atlas)
- Git

### Steps to Run the Project
#### 1. Clone the Repository
```bash
git clone https://github.com/manthan3678/Ecommerce.git
cd Ecommerce
```

#### 2. Setup Environment Variables
Create a `.env` file in the **root directory** and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### 3. Install Dependencies
Run the following command to install both backend and frontend dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 4. Start the Application
```bash
# Start the backend server
cd backend
npm run dev

# Start the frontend
cd ../frontend
npm run dev
```

#### 5. Access the Application
- Frontend: `http://localhost:5137`
- Backend API: `http://localhost:8080`

## Folder Structure
```
Ecommerce/
│── backend/       # Node.js & Express server
│   ├── models/    # Mongoose schemas
│   ├── routes/    # API endpoints
│   ├── controllers/ # Business logic
│   ├── config/    # Database & environment configuration
│── frontend/      # React.js client
│   ├── components/ # Reusable UI components
│   ├── pages/     # Application pages
│── .gitignore     # Ignore environment files
│── README.md      # Documentation
```
---
Developed by [Manthan Gedam](https://github.com/manthan3678). 🚀

