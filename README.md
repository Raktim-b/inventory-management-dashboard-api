<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:F7DF1E,50:FACC15,100:F59E0B&height=220&section=header&text=%20Product%20Management%20Dashboard&fontSize=40&fontColor=ffffff&animation=fadeIn&fontAlignY=38"/>
</p>

> A modern **Product Management Dashboard** built with **Node.js, Express.js, MongoDB, Socket.IO, EJS, and Tailwind CSS** that enables businesses to efficiently manage products through a user-friendly web interface. The application features **real-time product notifications**, authentication, email verification, product management, soft delete, search, filtering, sorting, and an interactive admin dashboard.

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,javascript,tailwind,git,github,vscode,postman" />
</p>

<p align="center">
<b>⚡ Powered by Socket.IO for Real-Time Notifications</b>
</p>

---

# 📌 Project Overview

Managing hundreds of products manually can become time-consuming and error-prone.

This project provides a complete **Admin Dashboard** where administrators can securely manage inventory without interacting directly with the database.

The application combines a responsive frontend built with **EJS** and **Tailwind CSS** with a robust backend powered by **Node.js**, **Express.js**, and **MongoDB**.

It demonstrates real-world backend concepts such as authentication, file uploads, CRUD operations, search, filtering, sorting, soft delete, and server-side rendering.

---
# 🚀 What's New

### ⚡ Real-Time Product Notifications using Socket.IO

The dashboard now supports **real-time communication** using **Socket.IO**.

Whenever a new product is added by an administrator:

- 🔔 All connected users instantly receive a notification
- 📦 The notification contains the product name
- 🔴 The notification badge updates automatically
- 📜 Notification history appears without refreshing the page
- ⚡ No manual reload required

This demonstrates real-world event-driven communication similar to modern e-commerce and inventory management systems.

# 🎯 Business Problem

Imagine managing an online clothing store with hundreds of products.

Every day you need to:

- ➕ Add new products
- ✏️ Update product information
- 🗑️ Remove discontinued products
- 🔍 Search products instantly
- 📂 Filter products by category
- 📈 Sort products by price or name
- ♻️ Restore accidentally deleted products

This dashboard provides a simple and organized interface to handle all these operations efficiently.

---

# ✨ Key Features

## 🔐 Authentication

- User Registration
- Email Verification
- Secure Login
- Protected Routes
## ⚡ Real-Time Notifications (Socket.IO)

- Instant Product Notifications
- Live Notification Badge Updates
- Notification Dropdown
- Automatic UI Updates
- No Page Refresh Required
- Event-Driven Communication
---

## 👕 Product Management

- Create Product
- Update Product
- Delete Product
- Soft Delete Product
- Restore Deleted Product
- Prevent Duplicate Products

---

## 🔍 Smart Search

Quickly search products by name using case-insensitive search.

Example:

```text
Shirt
```

Returns all matching products instantly.

---

## 🎯 Product Filtering

Filter products by:

- Category
- Stock Availability

---

## 📊 Product Sorting

Sort products by:

- Price (Low → High)
- Price (High → Low)
- Name (A → Z)
- Name (Z → A)

---

## ♻️ Trash Management

Instead of permanently deleting products:

- Products move to Trash
- Deleted products can be restored
- Prevents accidental data loss

---

## 🎨 Responsive Dashboard

Built using:

- EJS
- Tailwind CSS

Dashboard includes:

- Product Table
- Search Bar
- Category Filter
- Sorting Dropdown
- Edit Product
- Delete Product
- Restore Product

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Frontend

- EJS
- Tailwind CSS

## Authentication

- JWT
- Email Verification
  
## Real-Time Communication

- Socket.IO
  
## File Upload

- Multer
- Cloudinary

## Development Tools

- Postman
- Git
- GitHub
- VS Code

---

# 📂 Project Structure

```text
app
│
├── config
│   ├── db.js
│   ├── cloudinary.js
│   └── emailVerify.js
│
├── controller
│   ├── auth.controller.js
│   ├── addProductPage.controller.js
│   ├── editProductPage.controller.js
│   ├── product.controller.js
│   ├── productPage.controller.js
│   ├── softDelete.controller.js
│   ├── trash.controller.js
│   └── userPage.controller.js
│
├── middleware
│   ├── authCheck.js
│   ├── roleCheck.js
│   └── fileUploades.js
│
├── model
│   ├── registration.db.js
│   ├── otpModel.js
│   └── product.db.js
│
├── routes
│   ├── auth.routes.js
│   ├── product.routes.js
│   ├── productPage.routes.js
│   ├── addProductPage.routes.js
│   ├── editProductPage.routes.js
│   ├── softDelete.routes.js
│   ├── trashPage.routes.js
│   ├── userPage.routes.js
│   └── index.js
│
├── util
│   ├── sendEmail.js
│   └── httpStatusCode.js
│
public
│
├── css
├── script
│
upload
│
views
│
app.js
```

---

# 🗄️ Database Collections

## 👤 Users

```javascript
{
    name,
    email,
    password,
    role,
    isVerified
}
```

---

## 📦 Products

```javascript
{
    productName,
    description,
    price,
    category,
    stock,
    image,
    isDeleted
}
```

---

## 📧 OTP

```javascript
{
    email,
    otp,
    expiresAt
}
```

---

# 🔄 Application Workflow

```text
User Registration
        │
        ▼
Email Verification
        │
        ▼
Secure Login
        │
        ▼
Admin Dashboard
        │
        ▼
Product Management
        │
        ▼
New Product Added
        │
        ▼
Socket.IO Server
        │
        ▼
Real-Time Notification
        │
        ▼
Live Notification Badge
```

---

# 🌐 Features Overview

## 👤 Authentication

- Register
- Login
- Email Verification

---

## 📦 Products

- Create Product
- View Products
- Update Product
- Delete Product
- Restore Product

---

## 🔍 Product Discovery

- Search Products
- Filter Products
- Sort Products

---

## 🗑️ Trash

- View Deleted Products
- Restore Products

---

# 🎯 Search, Filter & Sorting

### Search Product

```text
/products?search=shirt
```

---

### Filter by Category

```text
/products?category=Men
```

---

### Filter by Stock

```text
/products?stock=available
```

---

### Sort Products

```text
/products?sort=price_asc

/products?sort=price_desc

/products?sort=name_asc

/products?sort=name_desc
```

---

### Combined Query

```text
/products?search=shirt&category=Men&sort=price_asc
```

---

# 📊 Dashboard Features

✔️ Product Table

✔️ Search Bar

✔️ Category Filter

✔️ Sorting Menu

✔️ Add Product

✔️ Edit Product

✔️ Soft Delete

✔️ Trash Management

✔️ Restore Product

---
# ⚡ Real-Time Notification System

This project integrates **Socket.IO** to deliver live notifications across connected clients.

### Features

- 🔔 Instant notification when a product is added
- 📦 Displays newly added product information
- 🔴 Live notification counter
- 📜 Dynamic notification dropdown
- ⚡ Updates without refreshing the browser
- 👥 Broadcasts events to all connected users

### Event Flow

```text
Admin Adds Product
        │
        ▼
Database Updated
        │
        ▼
Socket.IO Emits Event
        │
        ▼
All Connected Clients
        │
        ▼
Notification Badge Updated
        │
        ▼
Dropdown Displays New Product
```
---

# 📈 Skills Demonstrated

- REST API Development
- Express.js
- MongoDB
- Mongoose ODM
- MVC Architecture
- Server Side Rendering (EJS)
- Tailwind CSS
- JWT Authentication
- Email Verification
- Socket.IO
- Real-Time Communication
- Event-Driven Architecture
- Live Notifications
- File Upload
- CRUD Operations
- Search & Filtering
- Sorting
- Soft Delete
- Responsive Dashboard Development

---

# 🎓 Learning Outcomes

This project helped me understand:

- Building full-stack web applications
- Server-Side Rendering using EJS
- Authentication & Authorization
- MongoDB Data Modeling
- Search Optimization
- Dynamic Filtering & Sorting
- Responsive UI Development
- Dashboard Design
- Clean MVC Architecture

---

# 🚀 Future Improvements

- Pagination
- Category Management
- Inventory Analytics
- Sales Dashboard
- Order Management
- User Management
- Product Reviews
- Charts & Reports
- Docker Deployment
- CI/CD Integration

---

# ▶️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/product-management-dashboard.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL=your_email

EMAIL_PASSWORD=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Start the development server

```bash
npm run dev
```

---

# 💼 Skills for Resume

This project demonstrates practical experience with:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- Email Verification
- Tailwind CSS
- EJS
- MVC Architecture
- CRUD Operations
- Search & Filtering
- Real-Time Notifications
- Event-Driven Programming

---

# 👨‍💻 Author

## Raktim Bhattacharya

**Backend Developer**

💻 **Node.js • Express.js • MongoDB • EJS • Tailwind CSS**

---

# ⭐ Why This Project?

# ⭐ Why This Project?

Unlike a basic CRUD application, this project combines a powerful backend with a responsive admin dashboard and **real-time communication using Socket.IO**.

Key highlights include:

- 🔐 Secure Authentication
- 📦 Complete Product Management
- ⚡ Live Product Notifications
- 🔔 Real-Time Notification Badge
- 🔍 Search, Filter & Sorting
- ♻️ Soft Delete & Restore
- 🎨 Responsive Dashboard

The project demonstrates concepts used in modern inventory management and e-commerce platforms where updates are instantly reflected across connected users without requiring a page refresh.
<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:F7DF1E,50:FACC15,100:F59E0B&height=120&section=footer"/>
</p>
