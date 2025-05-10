# ShopEasy E-commerce Website

Final project for Web Development v2.0 course under the Power Learn Project (PLP).

## Project Overview

ShopEasy is a fully responsive e-commerce website that allows users to browse products, add items to cart, and complete purchases. The website features multiple product categories including Electronics, Fashion, Home & Kitchen, and Beauty products.

## Features

- Responsive design that works on desktop and mobile devices
- Product filtering and sorting functionality
- Shopping cart with local storage persistence
- User authentication and account management
- Newsletter subscription
- Contact form with validation
- Interactive FAQ section
- Privacy Policy and Terms & Conditions pages

## Technologies Used

- HTML5
- CSS3
- JavaScript
- PHP
- MySQL
- Font Awesome Icons

## Setup Instructions

1. Clone this repository to your local machine
2. Import the database schema from `database/shopeasy.sql`
3. Configure your database connection in `config/config.php`
4. Install dependencies:

```bash
composer require vlucas/phpdotenv
composer install
```

5. Create a `.env` file with your database credentials
6. Start your local server

## Database Structure

The application uses MySQL with the following main tables:

- users
- products
- categories
- orders
- order_items

## Contributing

This is an educational project created as part of the PLP Web Development v2.0 course. Feel free to fork and use as a learning resource.

## Author

Almando Hafenaaje

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Power Learn Project (PLP) for the web development course
- All mentors and fellow students who provided feedback and support
