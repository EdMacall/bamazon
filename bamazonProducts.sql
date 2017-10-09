-- yes,  I know.   I have more products than I am
-- supposed to.   I couldn't help myself.   I was 
-- having fun getting some items off a list from an
-- old RPG book (from the Traveller RPG)

DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INTEGER auto_increment NOT NULL,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price DECIMAL(8,2),
  stock_quantity INTEGER(9),
  primary key (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
                      VALUES ("Magnetic Compass", "gadgets",10, 20),
                             ("Wrist Watch", "jewelry", 100, 50),
                             ("Radiation Counter", "gadgets", 250, 2),
                             ("Metal Detector", "gadgets", 300, 3),
                             ("Hand Calculator", "schoolsupplies", 10, 6),
                             ("Combat Armor", "fashion", 20000, 2),
                             ("Laser Rifle", "sportinggoods", 3500, 2),
                             ("Hand Computer", "electronics", 1000, 4),
                             ("Holographic Projector", "electronics", 1000, 2),
                             ("Densitometer", "gadgets", 20000, 1),
                             ("Vacc Suit", "fashion", 9000, 12),
                             ("Neural Activity Sensor", "gadgets", 35000, 1),
                             ("Laser Pistol", "sportinggoods", 1000, 5),
                             ("Hostile Env Vacc Suit", "fashion", 18000, 1);

SELECT * FROM products;