-- Create database
CREATE DATABASE IF NOT EXISTS shopeasy;
USE shopeasy;

-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- Create products table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2),
    image VARCHAR(255),
    stock INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_sale BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Create orders table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create order_items table
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES
('Electronics', 'electronics'),
('Fashion', 'fashion'),
('Home & Kitchen', 'home-kitchen'),
('Beauty', 'beauty');

-- Insert sample products
INSERT INTO products (category_id, name, description, price, old_price, image, stock, is_featured, is_sale) VALUES
(1, 'Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 199.99, NULL, 'Wireless Headphones.jpg', 50, TRUE, FALSE),
(1, 'Smart Watch', 'Feature-rich smartwatch with health monitoring', 149.99, 199.99, 'Smart Watch.jpg', 30, TRUE, TRUE),
(1, 'Bluetooth Speaker', 'Portable Bluetooth speaker with great sound', 79.99, NULL, 'Bluetooth Speaker.jpg', 40, TRUE, FALSE),
(1, 'Wireless Charger', 'Fast wireless charger for smartphones', 49.99, NULL, 'Wireless Charger.jpg', 60, FALSE, FALSE),
(2, 'Men''s Casual Shirt', 'Comfortable casual shirt for men', 59.99, NULL, 'Men''s Casual Shirt.jpg', 100, FALSE, FALSE),
(2, 'Women''s Dress', 'Elegant dress for women', 89.99, NULL, 'Women''s Dress.jpg', 80, TRUE, FALSE),
(2, 'Leather Jacket', 'Stylish leather jacket', 129.99, NULL, 'Leather Jacket.jpg', 25, FALSE, FALSE),
(2, 'Casual Sneakers', 'Comfortable casual sneakers', 39.99, 59.99, 'Casual Sneakers.jpg', 70, FALSE, TRUE),
(3, 'Coffee Maker', 'Automatic coffee maker with timer', 199.99, NULL, 'Coffee Maker.jpg', 20, TRUE, FALSE),
(3, 'Blender', 'High-performance blender', 299.99, NULL, 'Blender.jpg', 15, TRUE, FALSE),
(3, 'Toaster', '2-slice toaster with multiple settings', 249.99, NULL, 'Toaster.jpg', 30, FALSE, FALSE),
(3, 'Cookware Set', 'Complete cookware set', 79.99, 129.99, 'Cookware Set.jpg', 25, FALSE, TRUE),
(4, 'Face Cream', 'Hydrating face cream', 29.99, NULL, 'Face Cream.jpg', 100, FALSE, FALSE),
(4, 'Lipstick', 'Long-lasting lipstick', 19.99, NULL, 'Lipstick.jpg', 150, TRUE, FALSE),
(4, 'Perfume', 'Luxurious perfume', 39.99, NULL, 'Perfume.jpg', 40, FALSE, FALSE),
(4, 'Makeup Kit', 'Complete makeup kit', 24.99, 34.99, 'Makeup Kit.jpg', 35, FALSE, TRUE);
