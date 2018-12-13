use bamazon;

create table products (
id int not null auto_increment primary key,
product_name varchar(60),
department_name varchar(60),
price decimal(10,2),
stock_quantity integer(10)
);

insert into products (product_name,department_name,price,stock_quantity)
value('Galaxy S8+','Electronics',600.00,12), ('Goldfish','Pets',0.99,100),
('Rad T-Shirt','Apparel',5.80,20),('Halo 5','Gaming',60.00,10),('Xbox One X','Gaming',399.00,3),
('Jurassic Park','Movie',14.49,23),('Carpet','Furniture',43.95,14),('Sink','Bath',120.00,41),
('Avengers: Infinty War','Movie',25.00,53),('Buzz Lightyear','Toys',12.05,30);

SELECT * FROM bamazon.products;