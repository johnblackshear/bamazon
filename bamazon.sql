 DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon; 

USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (505, "air max", "shoes", 89.99, 10),
	   (321, "jerseys", "hockey", 99.99, 25),
	   (450, "fathead", "posters", 49.99, 5),
	   (437, "socks", "running", 19.99, 8),
	   (686, "headphones", "electronics", 109.99, 2),
	   (600, "desk chair", "furniture", 199.99, 9),
	   (230, "gloves", "apperal", 29.99, 31),
	   (703, "crayola markers", "arts and crafts", 12.99, 40),
	   (401, "pub g", "video games", 59.99, 19),
	   (1201, "pots and pans", "kitchen", 119.99, 7)