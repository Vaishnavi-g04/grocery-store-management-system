# Grocery Store Management System

A full-stack web application developed to manage grocery store operations, including products, units of measurement, customer orders, and order details.

## Project Overview

The Grocery Store Management System simplifies grocery store management through a web-based interface. It allows users to manage products, create customer orders, calculate totals, apply discounts, and view order history.

## Features

### Product Management
- Add new products.
- View all available products.
- Edit product details.
- Delete products.

### Unit of Measurement Management
- View available units.
- Add new units of measurement.
- Assign units to products.

### Order Management
- Create customer orders.
- Add multiple products to an order.
- Enter product quantities.
- Calculate item totals and grand totals.
- Apply percentage-based and fixed-amount discounts.
- Validate order details before saving.

### Order History
- View all previous orders.
- View customer and order information.
- View individual products, quantities, and prices in an order.

## Technologies Used

- **Python** – Backend programming
- **Flask** – Backend framework and API development
- **MySQL** – Database management
- **HTML** – Web page structure
- **CSS** – Styling
- **JavaScript** – Frontend functionality
- **jQuery** – AJAX requests and DOM manipulation
- **Bootstrap** – UI components
- **MySQL Workbench** – Database management
- **VS Code** – Development environment

## Project Structure

```text
project-grocery-management/
│
├── grocery_app/
│   └── backend/
│       ├── server.py
│       ├── products_dao.py
│       ├── uom_dao.py
│       ├── orders_dao.py
│       └── sql_connection.py
│
├── ui/
│   ├── index.html
│   ├── manage-product.html
│   ├── order.html
│   ├── css/
│   ├── images/
│   └── js/
│
├── .gitignore
├── .gitattributes
└── README.md
```

## Installation and Setup

### Prerequisites
- Python 3
- MySQL Server
- MySQL Workbench
- Visual Studio Code

### 1. Clone the Repository

```bash
git clone https://github.com/Vaishnavi-g04/grocery-store-management-system.git
```

### 2. Navigate to the Project

```bash
cd grocery-store-management-system
```

### 3. Install Dependencies

```bash
pip install flask flask-cors mysql-connector-python
```

### 4. Configure MySQL

- Create a database named `grocerystore`.
- Create the required tables: `products`, `uom`, `orders`, and `order_details`.
- Configure your local MySQL username and password in the database connection file.

**Note:** Do not upload your actual database password to GitHub.

### 5. Run the Backend

Open the backend folder in the terminal:

```bash
cd grocery_app/backend
```

Start the Flask server:

```bash
python server.py
```

The backend runs at:

`http://127.0.0.1:5000`

### 6. Run the Frontend

- Open the `ui` folder in VS Code.
- Open `index.html` using the Live Server extension.
- Use the application in your browser.

## Learning Outcomes

- Developed REST API endpoints using Flask.
- Connected Python applications with MySQL.
- Practised SQL queries, joins, and CRUD operations.
- Integrated frontend and backend using AJAX.
- Implemented form validation and dynamic calculations.
- Used Git and GitHub for version control.

## Developer

**Vaishnavi G**

GitHub: https://github.com/Vaishnavi-g04

Project Repository: https://github.com/Vaishnavi-g04/grocery-store-management-system