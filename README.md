# ShopEasy E-commerce Website

This is my final Power Learn Project (PLP) assignment - an e-commerce website built with HTML, CSS, JavaScript and PHP.

## Project Overview

ShopEasy is a fully responsive e-commerce platform that allows users to browse products across different categories, add items to cart, and complete purchases. The website features a modern design with intuitive navigation and smooth user experience.

## Features

- Responsive design that works on desktop and mobile devices
- Product categorization (Electronics, Fashion, Home & Kitchen, Beauty)
- Shopping cart functionality with local storage
- Product filtering and sorting options
- Contact form with validation
- Newsletter subscription
- FAQ section
- Interactive product cards with hover effects
- Google Maps integration
- Privacy Policy and Terms & Conditions pages

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- PHP
- MySQL
- Font Awesome Icons
- Google Maps API

## Database Structure

The project uses a MySQL database with the following main tables:

- users
- categories
- products
- orders
- order_items

## Installation

1. Clone the repository to your local machine
2. Import the database schema from `database/shopeasy.sql`
3. Configure your database connection in `.env`
4. Make sure you have PHP and MySQL installed
5. Run the project through a local server (e.g., XAMPP, WAMP)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=shopeasy
```

## File Structure

```
ecom/
├── api/
│   └── products.php
├── config/
│   └── config.php
├── css/
│   └── style.css
├── database/
│   └── shopeasy.sql
├── images/
│   └── product_img/
├── includes/
│   └── Database.php
├── js/
│   └── script.js
├── .env
├── .gitignore
├── index.html
├── products.html
├── contact.html
├── privacy-policy.html
└── terms-conditions.html
```

## Contributing

This is a final project assignment for PLP. Contributions are not currently being accepted.

## License

This project is created for educational purposes as part of the Power Learn Project (PLP) program.

## Author

Almando Hafenaaje
Power Learn Project (PLP) Student
2025 Cohort
